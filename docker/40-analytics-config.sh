#!/bin/sh
# Regenerate the runtime analytics config from the container's environment.
# nginx:alpine runs every /docker-entrypoint.d/*.sh before starting nginx, so
# this writes /analytics-config.js on each container start. Change the numbers by
# editing .env on the host and running `docker compose up -d` (no rebuild).
set -eu

OUT=/usr/share/nginx/html/analytics-config.js

cat > "$OUT" <<EOF
/* generated at container start from env — do not edit in place */
window.__ANALYTICS__ = {
  FOLLOWERS_BASE: ${NEXT_PUBLIC_FOLLOWERS_BASE:-5000},
  VIEWS_BASE: ${NEXT_PUBLIC_VIEWS_BASE:-1000000},
  SUBS_BASE: ${NEXT_PUBLIC_SUBS_BASE:-20000},
  YT_VIEWS_BASE: ${NEXT_PUBLIC_YT_VIEWS_BASE:-36000000},
  VIEWS_TODAY_BASE: ${NEXT_PUBLIC_VIEWS_TODAY_BASE:-14382}
};
EOF

echo "analytics-config: wrote $OUT (followers=${NEXT_PUBLIC_FOLLOWERS_BASE:-5000})"
