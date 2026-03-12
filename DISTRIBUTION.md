# Distribution Plan

How to distribute this vault as a reusable template without sharing personal content.

---

## Strategy

Maintain a **separate skeleton repo** that contains only the vault's structural files — templates, scripts, plugin configs, documentation, and folder scaffolding. Personal content (`Daily/`, `People/`, `Projects/`, `Ideas/`) never enters the skeleton repo.

An `import.sh` script **in the skeleton repo** pulls structural improvements from the real vault on demand. The workflow: make improvements in the real vault → run `import.sh` in the skeleton repo → review the diff → commit and push.

---

## Skeleton Repo Structure

```
jotso/
├── .obsidian/                          # Plugin configs (shipped for out-of-box experience)
│   ├── app.json
│   ├── appearance.json
│   ├── community-plugins.json
│   ├── templates.json
│   ├── daily-notes.json
│   ├── plugins/
│   │   ├── dataview/data.json
│   │   ├── obsidian-tasks-plugin/data.json
│   │   ├── quickadd/data.json
│   │   └── templater-obsidian/data.json
│   └── ...
├── Daily/
│   └── .gitkeep
├── People/
│   └── .gitkeep
├── Projects/
│   └── .gitkeep
├── Ideas/
│   └── .gitkeep
├── Attachments/
│   └── .gitkeep
├── Excalidraw/
│   └── .gitkeep
├── _ Inbox/
│   └── .gitkeep
├── _ Views/
│   └── All Tasks.md
├── Utils/
│   ├── Dataview/
│   │   ├── inline-backlinks.js
│   │   └── inline-backlinks.md
│   ├── Templater/
│   │   └── Regenerate Indexes.md
│   └── Templates/
│       ├── Blank Template.md
│       ├── Daily Template.md
│       └── Topic Template.md
├── AGENTS.md
├── CONTRIBUTING.md
├── DISTRIBUTION.md                     # This doc about skeleton maintenance
├── LICENSE                             # GPLv3 license
├── README.md                           # User-facing getting started guide
├── Index.md
├── import.sh                           # Pulls structural files from real vault
├── .claude/
│   └── CLAUDE.md                      # Claude Code redirect to AGENTS.md
├── .gitignore
└── .gitkeep
```

---

## `import.sh`

Lives in the skeleton repo under `.bin` (git ignored). Takes one argument: the path to the real (working) vault. Copies structural files from the real vault into the skeleton repo, excluding personal content and ephemeral state.

```bash
#!/bin/bash
set -euo pipefail

# Usage: ./import.sh /path/to/real-vault
#
# Run from the root of the skeleton repo.
# Imports structural files from your working vault, excluding personal content.

if [ $# -ne 1 ]; then
    echo "Usage: $0 /path/to/real-vault"
    exit 1
fi

SRC="$1"
DEST="$(pwd)"

if [ ! -d "$SRC/Utils" ] || [ ! -f "$SRC/AGENTS.md" ]; then
    echo "Error: '$SRC' doesn't look like the vault (missing Utils/ or AGENTS.md)"
    exit 1
fi

echo "Importing from: $SRC"
echo "Into skeleton:  $DEST"
echo ""

# --- Empty content folders (with .gitkeep so git tracks them) ---
echo "• Empty content folders"
for dir in Daily People Projects Ideas Attachments Excalidraw "_ Inbox"; do
    mkdir -p "$DEST/$dir"
    touch "$DEST/$dir/.gitkeep"
done

# --- Utils (templates, scripts, dataview) ---
echo "• Utils/"
rsync -av --delete "$SRC/Utils/" "$DEST/Utils/"

# --- Documentation ---
echo "• Documentation (AGENTS, CONTRIBUTING, DISTRIBUTION, LICENSE, README)"
cp "$SRC/AGENTS.md" "$DEST/AGENTS.md"
cp "$SRC/CONTRIBUTING.md" "$DEST/CONTRIBUTING.md"
cp "$SRC/DISTRIBUTION.md" "$DEST/DISTRIBUTION.md"
cp "$SRC/LICENSE" "$DEST/LICENSE"
cp "$SRC/README.md" "$DEST/README.md"

# --- Views (task queries, dashboards) ---
echo "• _ Views/"
rsync -av --delete "$SRC/_ Views/" "$DEST/_ Views/"

# --- Index.md (will be regenerated, but seed the structure) ---
echo "• Index.md"
cp "$SRC/Index.md" "$DEST/Index.md"

# --- .claude/CLAUDE.md ---
echo "• .claude/CLAUDE.md"
mkdir -p "$DEST/.claude"
cp "$SRC/.claude/CLAUDE.md" "$DEST/.claude/CLAUDE.md"

# --- .obsidian configs (selective) ---
# Exclude workspace state, caches, and plugin binaries — keep only settings.
echo "• .obsidian/ (configs only)"
rsync -av --delete \
    --exclude='workspace.json' \
    --exclude='workspace-mobile.json' \
    --exclude='graph.json' \
    --exclude='*.cache' \
    --exclude='cache/' \
    --exclude='plugins/*/main.js' \
    --exclude='plugins/*/styles.css' \
    --exclude='plugins/*/manifest.json' \
    "$SRC/.obsidian/" "$DEST/.obsidian/"

cat > .gitignore <<ENDIGNORE
# Obsidian workspace state (personal, ephemeral)
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.obsidian/graph.json
.obsidian/*.cache
.obsidian/cache/

# Plugin binaries (users install plugins themselves via Community Plugins)
.obsidian/plugins/*/main.js
.obsidian/plugins/*/styles.css
.obsidian/plugins/*/manifest.json

# Agent & IDE artifacts  
.junie/  
.idea/

# macOS
.DS_Store

# import script itself
.bin/import.sh
ENDIGNORE

echo ""
echo "Import complete. Review changes:"
echo "  cd $DEST && git diff"
```

---

## Post-Import Review Checklist

After running `import.sh`, review the diff before committing:

1. **`AGENTS.md` Shared Memory section** — strip any personal context that has accumulated. The Shared Memory section at the bottom of AGENTS.md is populated by agents over time and may contain personal decisions or preferences.
2. **`.obsidian/plugins/quickadd/data.json`** — verify QuickAdd macros don't reference personal file paths or content.
3. **`_ Views/All Tasks.md`** — should contain only the query block, no rendered task results (it won't — the query is just a code block — but worth a glance).
4. **No personal content leaked** — confirm nothing from `Daily/`, `People/`, `Projects/`, or `Ideas/` was pulled in.

---

## Setup for New Users

When someone clones the skeleton repo and opens it in Obsidian:

1. **Install community plugins** — Obsidian will prompt to enable community plugins. The four required plugins (Dataview, Templater, Tasks, QuickAdd) are listed in `community-plugins.json`. Users install them from the Community Plugins browser; the shipped `data.json` files in `.obsidian/plugins/` configure each plugin's settings automatically.
2. **Enable JavaScript queries** — Dataview's `data.json` should have this set, but users may need to confirm "Enable JavaScript Queries" in Dataview settings.
3. **Restart Obsidian** — Templater's startup script (`Regenerate Indexes.md`) runs on launch, creating `_ *.md` index notes and stamping empty topic pages with the Topic Template.
4. **Start writing** — Create notes in `Daily/`, link to topics with `[[WikiLinks]]`, and topic pages will aggregate content automatically.

---

## Open Questions

- **Example/seed content:** Should the skeleton include a few example daily notes and topic pages (e.g., `Daily/2025-01-15.md` linking to `People/Example Person.md`) to demonstrate the system in action? This would live only in the skeleton repo, not the real vault.
