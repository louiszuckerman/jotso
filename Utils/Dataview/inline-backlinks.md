# inline-backlinks.js

Renders all notes that link to the current note as full inline content — a continuous scroll of backlinked notes separated by a horizontal rule and filename header.

## Purpose

Obsidian's default backlinks panel shows only a small excerpt around each mention. This script instead transclude the **entire content** of every backlinker directly into the current note, live, without modifying any files.

Inspired by the Influx plugin but simpler: no excerpt logic, no hierarchy parsing — just the full note, concatenated.

## Requirements

- [Dataview](obsidian://show-plugin?id=dataview) community plugin (with JavaScript Queries enabled in its settings)

## Usage

Paste this block anywhere in a note you want backlinks rendered:

~~~dataviewjs
await dv.view("Utils/Dataview/inline-backlinks", {obsidian})
~~~

Add it to a note template to get it automatically on every new note.

## File location
```
Utils/Dataview/inline-backlinks.js   ← this script
Utils/Dataview/inline-backlinks.md   ← this file
```

If you move the script, update the path in the `dv.view()` call accordingly.

## How it works

1. Reads `metadataCache.resolvedLinks` to find all notes linking to the current file
2. Sorts them by vault-relative filepath (alphabetical)
3. Prepends a horizontal rule and callout block with filename to each note's raw markdown
4. Renders everything in one pass using Obsidian's own `MarkdownRenderer` — preserving links, formatting, checkboxes, tags, embeds, etc.

## Limitations

- **Read-only** — backlinker content renders but is not editable in place
- **Static on disk** — the current note file is never modified
- **Re-renders on every open** — courtesy of Dataview's live query engine
- Unresolved links (notes that don't exist yet) won't appear, since they have no entry in `resolvedLinks`
