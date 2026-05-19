#!/bin/bash
# setup-skill-link.sh
#
# Replaces the installed .claude/skills/oma-design/ copy with a symlink
# to "Old Mother's Altar Design System/", so there is only one copy of
# every file. After running this, editing anything in the Design System
# folder is the same as editing the skill — no syncing required.
#
# Run once from Terminal:
#   bash "/Users/katytowell/Documents/Claude/Projects/Old Mother's Altar/setup-skill-link.sh"

set -e

PROJECT="/Users/katytowell/Documents/Claude/Projects/Old Mother's Altar"
SKILL="$PROJECT/.claude/skills/oma-design"
SOURCE="$PROJECT/Old Mother's Altar Design System"

echo "Removing installed skill copy..."
rm -rf "$SKILL"

echo "Creating symlink: .claude/skills/oma-design → Old Mother's Altar Design System/"
ln -s "$SOURCE" "$SKILL"

echo ""
echo "✓ Done. The skill now points directly to the Design System folder."
echo "  Edit files in 'Old Mother's Altar Design System/' — changes are"
echo "  immediately reflected in the skill with no copying needed."
