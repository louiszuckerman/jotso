# Jotso

> A system for retaining knowledge, developing ideas, and getting shit done.

Jotso is an Obsidian vault template that unifies notes and tasks into a single chronological log. You write once, link to topics, and the system handles the rest — no rewriting, no reorganizing, no process theater.

---

## How It Works

All new content — meeting notes, thoughts, plans, action items — goes into timestamped daily notes. Tasks are captured inline alongside the thinking that generated them, not in a separate system. **Daily notes should not be modified once written.**

Topic pages -- for example `People/`, `Projects/`, and `Ideas/` -- automatically aggregate every linked note via inline backlinks, creating live synthesis surfaces. Automation generates and maintains indexes, stamps new topic pages, and provides a unified task review dashboard. You never maintain the system — it maintains itself.

As notes accumulate over time, topic pages become natural surfaces for higher-level thinking. Concrete daily observations gradually compose into abstract understanding — not through manual distillation, but through temporal accumulation.

AI agents are also employed to maintain the system and perform routine tasks. See [[AGENTS]] for the technical explanation of how it works.

### The Daily Log

Notes are intended to be **written once in an append-only log**. All new content is added to the `Daily/` timeline as new timestamped notes created throughout the day. The result is a chronological log of thinking, not a wiki to be maintained.

Each note links to ongoing **topics** (people, projects, ideas) via `[[WikiLinks]]`. A note created during a 1-on-1 meeting links to the person's topic page; a design decision links to a topic page for the project; a stray insight links to a relevant idea topic page. Over time, each topic accumulates a body of concrete, dated evidence.

### Capture & Tasks

The key principle, borrowed from **GTD**: capture everything immediately, in context, without friction.

- Thoughts and notes are captured as new `Daily/` fragments the moment they arise.
- Tasks are captured inline alongside their surrounding context — not in a separate system.
- QuickAdd shortcuts make capture nearly effortless: open a new timestamped note, add a task at the cursor, or drop a random task into today's note.
- `All Tasks.md` provides a periodic review surface for all open action items across the vault.

### Topic Pages

Topic pages don't hold content directly — they surface it. Topic pages dynamically include the full content of all daily notes that link into them for a continuous chronological scroll of all writing on that topic.

This design encourages moving from **concrete notes** (specific meetings, observations, decisions) toward **abstract understanding** (patterns, generalizations, synthesis). As notes accumulate over time, the topic page becomes a natural synthesis surface — no manual distillation required.

When creating a new daily note you can add a link to a topic page. Obsidian will show existing pages for easy auto-complete. New topic pages can be created by typing in a new page name as a link and then clicking it. A blank page with that name will be created in the `_ Inbox` folder. Simply move it into one of the topic folders and then restart Obsidian to automatically fill it in with the topic page template.


---

## What's Included

- **Daily log structure** — Date-stamped (`YYYY-MM-DD.md`) and timestamped (`YYYY-MM-DD HH.mm.md`) note formats, both supporting tasks and free-form content.
- **Topic pages** — `People/`, `Projects/`, and `Ideas/` folders with auto-generated index notes and inline backlink rendering.
- **Inline backlinks script** — A Dataview JS script that renders the full content of every note linking to a topic page, sorted chronologically.
- **Auto-generated indexes** — A Templater startup script that rebuilds Map of Content (MOC) pages and stamps empty topic pages automatically.
- **Unified task view** — `All Tasks.md` aggregates every task across the vault, grouped by date.
- **QuickAdd capture shortcuts** — Hotkey actions for creating timestamped notes, inserting tasks at the cursor, and appending tasks to today's note — including a URI action for capture without Obsidian in the foreground.
- **AI agent instructions** — `AGENTS.md` provides full technical documentation and rules for AI coding agents working with the vault.

---

## Design Philosophy

### Unified notes and tasks

Notes and tasks belong together. When an action item is captured alongside the meeting note or thought that produced it, context is preserved and nothing falls through the cracks.

For a long time, my notes and tasks lived in separate systems (primarily OneNote and Todoist). That split required constant context-switching and manual upkeep. The core insight: **unify them**, so action items are captured in context alongside the thinking that generated them.

### Automation over manual processing

GTD and Zettelkasten both require significant processing overhead — clarifying, organizing, rewriting notes into permanent form. Jotso replaces that overhead with automation (index generation, inline backlinks, task aggregation) and the insight that abstraction can emerge from temporal accumulation rather than manual distillation. You write; the system organizes.

### Construal Level Theory

The system's design draws on **Construal Level Theory** (Trope & Liberman): psychological distance shapes the level of abstraction in thinking. The more distant something is — in time, space, or social remove — the more abstractly we represent it.

Daily notes are low-construal — immediate, concrete, contextual. Topic pages are high-construal — aggregated, abstract, strategic. The system fosters higher-level thinking not by forcing synthesis, but by letting temporal accumulation do the work naturally.

This vault leverages all three dimensions of psychological distance:
- **Temporal** — notes accumulate over time; reviewing a topic page creates temporal distance from when notes were written. This is the primary mechanism.
- **Social** — recording others' perspectives (meetings, 1-on-1s) is itself a form of distance. `People/` pages are aggregations of social distance.
- **Spatial** — designed for remote work, where physical distance from colleagues and workplaces is the default.

The CLT connection originated from Art Markman's HBR article ["How to Brainstorm — Remotely"](https://hbr.org/2020/07/how-to-brainstorm-remotely) (2020; [free via Instaread](https://instaread.co/insights/harvard-business-review/how-to-brainstormremotely-book/sjcgubvgdf)), which treats remote-work abstraction as a side effect to manage. This system inverts that prescription: abstraction is a design goal to cultivate.

---

## Required Plugins

Jotso uses only four widely-adopted Obsidian community plugins. All settings are pre-configured.

| Plugin | Role |
|---|---|
| **Dataview** | Powers inline backlinks via `dataviewjs` blocks. JavaScript queries must be enabled. |
| **Templater** | Runs the index regeneration script at vault startup. |
| **Tasks** | Parses and renders task items across the vault. |
| **QuickAdd** | Provides capture shortcuts for new notes and tasks. |

---

## Getting Started

1. **Clone or download** the vault template.
2. **Open in Obsidian** and enable community plugins when prompted.
3. **Install the four plugins** (Dataview, Templater, Tasks, QuickAdd) from the Community Plugins browser — settings are pre-configured.
4. **Enable JavaScript queries** in Dataview settings if not already set.
5. **Restart Obsidian** — the startup script will generate index notes and stamp topic pages.
6. **Start writing** — create notes in `Daily/`, link to topics with `[[WikiLinks]]`, and watch topic pages come alive.

---

## Vault Structure

```
├── Daily/               # Your chronological log
├── People/              # Topic pages for individuals
├── Projects/            # Topic pages for projects
├── Ideas/               # Topic pages for concepts and plans
├── _ Inbox/             # Landing folder for new topic pages
├── _ Views/             # All Tasks and other dashboards
├── Utils/               # Scripts, templates, and dataview queries
├── Attachments/         # Images and files
├── Excalidraw/          # Diagrams (not actively used)
├── AGENTS.md            # AI agent instructions and vault documentation
├── CONTRIBUTING.md      # Contribution guidelines
├── DISTRIBUTION.md      # Distribution plan
├── Index.md             # Auto-generated root index
├── LICENSE              # GPLv3 license
└── README.md            # This file
```

---

## Influences

Most knowledge management systems are an invitation to waste your life. Reorganizing folders, rewriting notes into "permanent" form, setting precise dates and priorities, maintaining elaborate tag taxonomies, processing inboxes — it never ends. Who has time for that? Life is too short for process theater. The influences below serve as inspiration, not prescription — take what works, leave the rest.

**Getting Things Done (GTD)** — the primary influence. Borrowed: Capture (frictionless inbox via QuickAdd) and Review (`All Tasks.md` as periodic review surface). Skipped: Clarify, Organize, Engage, Someday/Maybe lists, context tagging. The goal is the spirit of GTD without the overhead.

**Zettelkasten** — a similar system although not part of the Jotso origin story -- I only discovered it after formalizing this system. Divergence: daily notes here are contextual logs (not atomic), raw notes are never rewritten into permanent notes, and abstraction emerges from automated aggregation rather than manual distillation.

---

## License

Copyright © 2026 Louis Zuckerman

[GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html) — see [[LICENSE]]
