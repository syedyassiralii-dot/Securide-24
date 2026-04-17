#!/usr/bin/env bash
set -euo pipefail

echo "Render static build: verifying site files"

if [ ! -f "index.html" ]; then
  echo "Error: index.html not found at repository root"
  exit 1
fi

for dir in assets css js about contact insights platform services; do
  if [ ! -e "$dir" ]; then
    echo "Error: required path '$dir' is missing"
    exit 1
  fi
done

echo "Static site verified. No build step required."