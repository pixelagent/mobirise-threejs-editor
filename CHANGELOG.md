# Changelog

All notable changes to this project will be documented in this file.

## v2.0.0 (2025-06-12)

- Replaced the global *head/body* injection with a real **Three.js block** that adds a
  `<section>` to a page.
- External library scripts are now injected once into the page **footer** (before
  `</body>`), de-duplicated across multiple Three.js sections on the same page.
- Scene JavaScript is rendered **inside the `<section>`** and runs after the footer
  libraries have loaded.
- Added gear-panel controls for the scene code, external scripts and section height.

## v1.0.0 (2025-06-12)

- Initial release: *Global HTML Insert* extension.
