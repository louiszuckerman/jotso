<%*
const headerMarkdown = '\n\n---\n\n> [!info] Generated File\n'

// ── Job 1: Rebuild each topic index note ─────────────────────────────────────
const indexPattern = /^_ .+\.md$/;

const indexFiles = app.vault.getMarkdownFiles()
  .filter(f => indexPattern.test(f.name));

for (const indexFile of indexFiles) {
  try {
    const folder = indexFile.parent;
    const links = folder.children
      .filter(f => f.extension === 'md' && f.path !== indexFile.path)
      .sort((a, b) => a.basename.localeCompare(b.basename))
      .map(f => `[[${f.basename}]]`)
      .join('\n');

    await app.vault.modify(indexFile, [headerMarkdown, links].join('\n') + '\n');
  } catch (e) {
    console.error(`Regenerate Indexes: Failed to rebuild ${indexFile.path}:`, e);
  }
}

// ── Job 2: Rebuild vault root Index.md ───────────────────────────────────────
try {
  let rootIndex = app.vault.getAbstractFileByPath('Index.md');

  if (!rootIndex) {
    rootIndex = await app.vault.create('Index.md', '');
  }

  const topicLinks = indexFiles
    .sort((a, b) => a.basename.localeCompare(b.basename))
    .map(f => `[[${f.basename}]]`)
    .join('\n') + '\n';

  await app.vault.modify(rootIndex, [headerMarkdown, topicLinks].join('\n') + '\n');
} catch (e) {
  console.error('Regenerate Indexes: Failed to rebuild Index.md:', e);
}

// ── Job 3: Overwrite empty topic notes with static template ──────────────────
const templateFile = app.vault.getAbstractFileByPath('Utils/Templates/Topic Template.md');

if (templateFile) {
  const templateContent = await app.vault.read(templateFile);
  const indexedFolderPaths = new Set(indexFiles.map(f => f.parent.path));

  const topicNotes = app.vault.getMarkdownFiles()
    .filter(f => {
      const folderPath = f.parent?.path ?? '/';
      return indexedFolderPaths.has(folderPath)
        && !indexPattern.test(f.name)
        && f.path !== templateFile.path;
    });

  for (const note of topicNotes) {
    try {
      const content = await app.vault.read(note);
      if (content.trim() === '') {
        await app.vault.modify(note, templateContent);
      }
    } catch (e) {
      console.error(`Regenerate Indexes: Failed to stamp ${note.path}:`, e);
    }
  }
}

%>
