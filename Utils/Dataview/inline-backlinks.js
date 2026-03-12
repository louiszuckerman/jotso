const {MarkdownRenderer} = input.obsidian;

const currentPath = dv.current().file.path;
const component = dv.component;

const backlinkers = Object.entries(app.metadataCache.resolvedLinks)
    .filter(([src, targets]) => src !== currentPath && currentPath in targets)
    .map(([src]) => app.vault.getAbstractFileByPath(src))
    .filter(f => f?.extension === 'md')
    .filter(f => f?.basename.substring(0, 2) !== '_ ')
    .sort((a, b) => a.path.localeCompare(b.path));

const md = `---\n# Backlink Notes...\n---\n`;
await MarkdownRenderer.render(app, md, dv.container, null, component);

for (const file of backlinkers) {
    const transclude = await app.vault.cachedRead(file);
    const md = `\n\n\n\n\n---\n---\n\n> [!example] [[${file.basename}]]\n\n`+transclude+`\n---\n`;
    await MarkdownRenderer.render(app, md, dv.container, file.path, component);
}
