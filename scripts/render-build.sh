#!/usr/bin/env bash
set -euo pipefail

# Generate runtime config consumed by js/api.js.
cat > emailjs-config.json <<EOF
{
  "publicKey": "${EMAILJS_PUBLIC_KEY:-}",
  "serviceId": "${EMAILJS_SERVICE_ID:-}",
  "templateId": "${EMAILJS_TEMPLATE_ID:-}",
  "templateIdClientReply": "${EMAILJS_TEMPLATE_ID_CLIENT_REPLY:-}"
}
EOF

echo "Generated emailjs-config.json for static deployment"
