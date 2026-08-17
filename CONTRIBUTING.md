# Contributing to VeilSnap

Thank you for considering a contribution. VeilSnap values changes that improve **real safe-sharing workflows**, accessibility, documentation accuracy, and maintainability.

## Before you begin

Please search existing issues before opening a new one. A good issue explains the user situation, the current behaviour, the expected result, and any privacy or accessibility effect. Never include a real API key, password, customer record, private screenshot, or personal data in an issue, pull request, or example.

## Good first contributions

Suitable contributions include keyboard improvements, clearer labels, fictional safe examples, browser compatibility fixes, tests, documentation corrections, and tightly scoped interface refinements. Contributions should not add unnecessary account systems, data collection, automatic “secret detection” claims, or external processing without a prior discussion of the privacy impact.

## Pull request standard

Keep pull requests focused. Describe the user problem, explain the change, list the testing performed, and update screenshots or documentation when a visible workflow or public claim changes. If you collaborate with another person on a commit, credit them accurately using GitHub’s documented co-author mechanism only when they made a genuine contribution.

## Development

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
```

The app is intentionally client-side. Do not introduce server-side handling of user screenshots or pasted text without a documented design decision, clear user disclosure, and project maintainer approval.
