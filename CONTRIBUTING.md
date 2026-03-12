# Contributing

---
## Ideas for Future Enhancement

### Periodic Review Cadence

The task review process is currently ad hoc — reviews happen when there's a lull, not on a consistent schedule. Past attempts at forcing a cadence (calendar reminders, etc.) haven't stuck. A more sustainable and consistent review habit would improve the system's reliability. Open question: what mechanism would make periodic review feel natural rather than imposed?

### Synthesis Tagging

By design, synthesis and reflection go into new `Daily/` log entries just like everything else — the system intentionally constrains all content to the chronological log. `Ideas/` and `Projects/` topic pages then collect both concrete notes and reflective/synthesis notes via backlinks. However, there's currently no way to distinguish a synthesis note from a raw observation when viewing a topic page. A possible improvement: introduce a tag (e.g., `#synthesis`) to mark notes that represent higher-level thinking, or create a dedicated topic page that aggregates tagged synthesis notes. Under consideration.

### Even Better Capture

Obsidian serves as the database and the interface for processing — task review, idea synthesis, and deep writing — but it should not be needed for the ongoing accumulation of ideas and notes throughout the workday.

Ideally, capture would be supported by a native macOS app that appends text and action items to an active note without bringing Obsidian to the foreground. An iPhone/iPad counterpart is also worth exploring, though significantly more complicated.

### Calendar/Meeting Integration

Notes should automatically include what meeting was on the calendar during the time the note was created, or whether a Slack huddle was active. Knowing who was in the conversation when a note or action item was captured is important context, currently jotted down manually.

---
## AI-augmented Workflows

AI agents should support and enhance this workflow through integration with the vault structure. Creating this file as AGENTS.md is the first step. Obsidian plugins exist for some of this, but the preference is to solve these problems with simplicity — Obsidian is just markdown, and coding agents are well-suited to that.

### Daily Review

A daily review process would help summarize the day's events and provide an opportunity to resolve small action items. Keeping up with this has been a challenge, one of the open problems in this system.

An agent could be prompted to do an end of day review (using a prewritten skill) in a way that makes the daily review fun and engaging - gamifying it.

How I imagine this working:
- Write a summary bullet list of the day's events in the top Daily note (the one with only the date, no timestamp)
- Prompt the agent to perform the daily review
- Agent reads all of the notes from the day and produces a fun and meaningful review as an addendum to the daily note:
	- Overall grade & a few relevant emojis for the day's events
	- Feedback on how to make the most of what happened that day
	- Suggestions on which action items could be completed
	- Constructive feedback & positive encouragement

### Automatic Topic Page Creation

An agent could create missing topic pages from deadlinks found in daily notes. The LLM would be able to infer which topic folder they should go in, which would eliminate the manual steps of creating a new note in `_ Inbox`, moving it into a topic folder, and then restarting Obsidian

### Suggested Topics

An agent could look at a daily note (or scan through them all) and add links to topic pages it "thinks" belong on the page. This would enhance the value of the topic pages by including relevant notes that may not have been manually tagged at creation.