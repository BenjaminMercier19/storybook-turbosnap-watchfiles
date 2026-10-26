#!/usr/bin/env bash
# Usage: scripts/trace-all.sh [stats-file]   (default: storybook-static/preview-stats.json)
set -euo pipefail
STATS="${1:-storybook-static/preview-stats.json}"
for f in src/component/component.ts src/component/component.scss \
         src/component/component.html src/styles/_global.scss; do
  printf '%-34s ' "$f"
  npx chromatic trace -s "$STATS" "$f" 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -o 'to [0-9]* affected story files'
done
