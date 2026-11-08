# Extra knowledge for the AI assistant

Markdown files in `content/knowledge/{locale}/*.md` (`es`, `en`) are added to
the assistant's knowledge index by `npm run knowledge`. Use them for facts that
are not published anywhere else on the site (e.g. availability, working style,
FAQs). Folders may be empty.

Each file is split into chunks by `## ` headings. Supported frontmatter:

```md
---
title: Availability # required: shown as the source title
type: knowledge # optional, defaults to "knowledge"
url: /en#about # optional: page the assistant can link to
---

## Current availability

Open to freelance AI integration projects.
```

E-mail addresses and phone numbers are redacted automatically. After editing,
run `npm run knowledge` and commit the regenerated `src/data/knowledge/*.json`.
