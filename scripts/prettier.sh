#!/bin/sh
files=$(git diff --cached --name-only --diff-filter=d | grep -v '^\(lib/\)' | grep -v 'package.json' | grep -v 'package-lock.json' | grep -v '^\(docs/\)' | grep '\(\.js\|\.json\|\.ts\)$' | tr '\n' ' ')
[ -z "$files" ] && exit 0

# Prettify all staged .ts / .js files
echo "$files" | xargs ./node_modules/.bin/prettier --write

# Add back the modified/prettified files to staging
echo "$files" | xargs git add

exit 0
