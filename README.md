# InternPath — Internship Listing UI

A responsive, accessible internship listing interface built with plain HTML, CSS, and JavaScript. No frontend framework or build step is required.

## Run locally
1. Download and extract the project folder.
2. Open `index.html` in a modern browser.
3. Optional: use VS Code's Live Server extension for a local development server.

## Features
- Responsive layouts for mobile, tablet, and desktop.
- Search across role, company, category, location, and skills.
- Filters for work style, category, and paid internships.
- Sort by recommended order, newest, or stipend.
- Expandable internship details dialog with keyboard and close controls.
- Show-more pagination, empty state, clear filters, and live result announcements.
- Skip link, semantic landmarks, explicit form labels, visible keyboard focus, and reduced-motion support.
- Sample listings are demo content. Email addresses use the reserved `.example` domain and are not real application contacts.

## Project files
- `index.html` — semantic page structure and accessible controls.
- `styles.css` — responsive visual system and layouts.
- `app.js` — sample data, search/filter/sort logic, and detail dialog.

## Customize listings
Edit the `internships` array near the top of `app.js`. Each item has a title, company, category, location, work style, stipend, duration, description, responsibilities, skills, and contact email. Replace all demo records and `.example` addresses before using this interface for real vacancies.
