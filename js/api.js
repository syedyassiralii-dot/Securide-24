// api.js - static-site friendly helpers (no backend required)

const EMAILJS_CONFIG = {
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
  templateIdClientReply: 'YOUR_EMAILJS_TEMPLATE_ID_CLIENT_REPLY'
};

const EmailService = {
  scriptUrl: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js',
  initialized: false,
  loadingPromise: null,
  runtimeConfig: null,
  runtimeConfigPromise: null,

  async loadRuntimeConfigFile() {
    if (this.runtimeConfig) {
      return this.runtimeConfig;
    }

    if (this.runtimeConfigPromise) {
      return this.runtimeConfigPromise;
    }

    this.runtimeConfigPromise = (async () => {
      if (typeof window === 'undefined' || typeof window.fetch !== 'function') {
        return null;
      }

      try {
        const response = await window.fetch('/emailjs-config.json', { cache: 'no-store' });
        if (!response.ok) {
          return null;
        }

        const json = await response.json();
        this.runtimeConfig = {
          publicKey: json.publicKey || '',
          serviceId: json.serviceId || '',
          templateId: json.templateId || '',
          templateIdClientReply: json.templateIdClientReply || ''
        };

        return this.runtimeConfig;
      } catch (error) {
        return null;
      }
    })();

    return this.runtimeConfigPromise;
  },

  getConfig(runtimeFileConfig) {
    const runtimeConfig = (typeof window !== 'undefined' && window.SECURIDE_EMAILJS_CONFIG) || {};
    const fileConfig = runtimeFileConfig || this.runtimeConfig || {};

    return {
      publicKey: runtimeConfig.publicKey || fileConfig.publicKey || EMAILJS_CONFIG.publicKey,
      serviceId: runtimeConfig.serviceId || fileConfig.serviceId || EMAILJS_CONFIG.serviceId,
      templateId: runtimeConfig.templateId || fileConfig.templateId || EMAILJS_CONFIG.templateId,
      templateIdClientReply: runtimeConfig.templateIdClientReply || fileConfig.templateIdClientReply || EMAILJS_CONFIG.templateIdClientReply
    };
  },

  hasValidConfig(config) {
    return (
      config.publicKey &&
      config.serviceId &&
      config.templateId &&
      !config.publicKey.startsWith('YOUR_') &&
      !config.serviceId.startsWith('YOUR_') &&
      !config.templateId.startsWith('YOUR_')
    );
  },

  isSmtpTimeoutError(error) {
    const status = error && typeof error.status !== 'undefined' ? String(error.status) : '';
    const text = (error && (error.text || error.message) ? String(error.text || error.message) : '').toLowerCase();
    return status === '412' && text.includes('smtp') && text.includes('timeout');
  },

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  async sendWithRetry(serviceId, templateId, payload, retryCount = 1) {
    let lastError = null;

    for (let attempt = 0; attempt <= retryCount; attempt += 1) {
      try {
        return await window.emailjs.send(serviceId, templateId, payload);
      } catch (error) {
        lastError = error;

        const canRetry = this.isSmtpTimeoutError(error) && attempt < retryCount;
        if (!canRetry) {
          throw error;
        }

        await this.delay(1200);
      }
    }

    throw lastError || new Error('Email delivery failed.');
  },

  formatEmailJsError(error) {
    const messageParts = [];

    if (error && typeof error.status !== 'undefined') {
      messageParts.push(`status ${error.status}`);
    }

    if (error && error.text) {
      messageParts.push(error.text);
    } else if (error && error.message) {
      messageParts.push(error.message);
    }

    const rawMessage = messageParts.join(' - ').trim();
    const lowered = rawMessage.toLowerCase();

    if (lowered.includes('origin') && lowered.includes('not allowed')) {
      return 'Email service rejected this domain. Add https://www.securide24.com and https://securide24.com in EmailJS Account -> Security -> Allowed Origins.';
    }

    if (lowered.includes('non-browser environments is currently disabled')) {
      return 'EmailJS browser security is active. Submit from the website in a browser and ensure your domain is listed in EmailJS Allowed Origins.';
    }

    if (lowered.includes('smtp') && lowered.includes('connection timeout')) {
      return 'Mail server timeout at SMTP provider. Please retry in 1-2 minutes. If it repeats, SMTP credentials/host limits on the mail provider need checking.';
    }

    if (rawMessage) {
      return rawMessage;
    }

    return 'Unable to submit your request right now. Please try again.';
  },

  ensureScriptLoaded() {
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('EmailJS requires a browser environment.'));
    }

    if (window.emailjs) {
      return Promise.resolve(window.emailjs);
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${this.scriptUrl}"]`);
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(window.emailjs));
        existingScript.addEventListener('error', () => reject(new Error('Failed to load EmailJS script.')));
        return;
      }

      const script = document.createElement('script');
      script.src = this.scriptUrl;
      script.async = true;
      script.onload = () => resolve(window.emailjs);
      script.onerror = () => reject(new Error('Failed to load EmailJS script.'));
      document.head.appendChild(script);
    });

    return this.loadingPromise;
  },

  async init() {
    if (this.initialized) {
      return;
    }

    const runtimeFileConfig = await this.loadRuntimeConfigFile();
    const config = this.getConfig(runtimeFileConfig);
    if (!this.hasValidConfig(config)) {
      throw new Error('EmailJS is not configured. Set publicKey, serviceId, and templateId in Render environment variables.');
    }

    const emailjs = await this.ensureScriptLoaded();
    emailjs.init({ publicKey: config.publicKey });
    this.initialized = true;
  },

  async sendContact(formData) {
    const runtimeFileConfig = await this.loadRuntimeConfigFile();
    const config = this.getConfig(runtimeFileConfig);

    try {
      await this.init();

      const emailData = {
        ...formData,
        submittedAt: new Date().toISOString()
      };

      // Send admin notification first. This is the critical delivery path.
      await this.sendWithRetry(config.serviceId, config.templateId, emailData, 1);

      // Client auto-reply is optional and should not block successful submissions.
      if (config.templateIdClientReply && !config.templateIdClientReply.startsWith('YOUR_')) {
        try {
          await this.sendWithRetry(config.serviceId, config.templateIdClientReply, emailData, 1);
        } catch (replyError) {
          console.warn('Client auto-reply failed, but admin notification succeeded:', replyError);
        }
      }

      return {
        success: true,
        message: 'Message sent successfully.'
      };
    } catch (error) {
      console.error('EmailJS submission failed:', error);
      return {
        success: false,
        message: this.formatEmailJsError(error)
      };
    }
  }
};

const API = {
  async submitContact(formData) {
    return EmailService.sendContact(formData);
  },

  async getAdvisories() {
    return {
      success: true,
      data: []
    };
  }
};

// Export
if (typeof window !== 'undefined') {
  window.API = API;
  window.EmailService = EmailService;
}
