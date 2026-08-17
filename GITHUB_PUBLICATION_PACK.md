# VeilSnap GitHub Publication Pack

This is the copy-and-paste handoff for publishing VeilSnap as a public GitHub project. It assumes that you have downloaded the project, extracted it to a stable folder on your Mac, and will use **GitHub Desktop** to create the first public repository. It does not ask you to create fake activity, buy stars, add nominal contributors, or accept low-value pull requests. Those practices damage trust and can violate GitHub’s rules on inauthentic activity.[1]

> **Publishing target:** a useful, transparent open-source product that earns real user feedback, voluntary stars, meaningful contributors, and credible community activity over time.

## 1. Copy this repository identity exactly

| GitHub field | Copy-and-paste value |
|---|---|
| Repository name | `veilsnap` |
| Visibility | **Public** |
| Description | `Local screenshot and text redactor for safer sharing. Redact, review, and export directly in your browser.` |
| Website | Leave blank until you have a public deployment URL, then use that exact HTTPS URL. |
| Primary language | TypeScript |
| License | MIT License — already included as `LICENSE`. |
| Default branch | `main` |
| First release tag | `v0.1.0` |

### Repository topics

After publishing, go to the repository’s **About** area, select the settings gear, and add these topics one at a time:

```text
privacy
screenshot
redact
redaction
local-first
browser-based
react
typescript
accessibility
developer-tools
```

Use only topics that remain accurate. Do not add `security`, `ai`, `open-source`, or `cybersecurity` solely to chase visibility if those terms do not precisely describe the current release.

## 2. GitHub Desktop on macOS — first publication

### Prepare the local folder

1. Extract the downloaded VeilSnap project to a permanent location, for example `~/Documents/Projects/veilsnap`. Do not use the Downloads folder as the long-term working location.
2. Confirm that the folder contains `README.md`, `package.json`, `client/`, `docs/`, `.github/`, and `GITHUB_PUBLICATION_PACK.md`.
3. Open **GitHub Desktop** and sign in to the GitHub account where the public project should live.

### Create the local Git repository

1. In GitHub Desktop, choose **File → Add Local Repository…**.
2. Choose the extracted `veilsnap` folder.
3. If GitHub Desktop says the folder is not yet a Git repository, choose the offered **Create a Repository** action. If it does not offer that action, choose **File → New Repository…**, set the name to `veilsnap`, select a new empty location, create it, and then copy the downloaded VeilSnap files into that newly created repository folder before returning to GitHub Desktop.
4. In the **Changes** tab, confirm that the project files appear. Do not include unrelated personal files, `.DS_Store`, credentials, private screenshots, or local notes.
5. In the bottom-left **Summary** field, paste:

```text
feat: launch VeilSnap 0.1
```

6. In the optional description field, paste:

```text
Initial public release of VeilSnap: a local screenshot and text redactor with transparent privacy boundaries, visual documentation, and contributor guidance.
```

7. Click **Commit to main**.

### Publish the GitHub repository

1. In the repository bar, click **Publish repository**.
2. In **Name**, enter `veilsnap`.
3. In **Description**, paste the repository description from Section 1.
4. **Uncheck “Keep this code private.”** This makes the project public.
5. In the Organization menu, choose your personal account unless you intentionally want an organization to own the project.
6. Click **Publish Repository** and wait for the push to complete.
7. Use **Repository → View on GitHub** in GitHub Desktop. Check that the README renders, the two screenshot images load, the Mermaid diagram renders, and the repository is marked **Public**.

GitHub’s current Desktop guidance uses this publish flow: add the local project, select **Publish repository**, choose the name/description, deselect the private option for a public repository, choose the account, and publish.[2]

## 3. GitHub settings — enable these in this order

Open the repository on GitHub in your browser. The paths below are written for a personal public repository. Labels can vary slightly as GitHub updates its interface.

### General settings

| Location | Setting | Recommendation | Why |
|---|---|---|---|
| **Settings → General → Features** | Issues | **Enable** | Gives users an accountable place to report reproducible bugs. |
| **Settings → General → Features** | Discussions | **Enable** | Separates questions, ideas, and show-and-tell from actionable bugs. |
| **Settings → General → Features** | Projects | Optional | Enable only when you are prepared to maintain a public roadmap. |
| **Settings → General → Pull Requests** | Allow squash merging | **Enable** | Keeps a small project history readable when contributors make several commits. |
| **Settings → General → Pull Requests** | Allow merge commits | Optional; leave off initially | Avoids unnecessary merge noise in an early one-maintainer project. |
| **Settings → General → Pull Requests** | Allow rebase merging | Optional | Enable only if you already understand and prefer linear history. |
| **Settings → General → Pull Requests** | Automatically delete head branches | **Enable** | Removes stale contributor branches after a merged pull request. |
| **Settings → General → Pull Requests** | Allow auto-merge | Leave off initially | Add later if you are comfortable reviewing queued contributions. |
| **Settings → General → Social preview** | Upload an actual product image | **Enable after choosing a real product screenshot** | Makes shared links intelligible without overstating features. |

### Security and analysis settings

| Location | Setting | Recommendation | Why |
|---|---|---|---|
| **Settings → Advanced Security** | Private vulnerability reporting | **Enable** | Gives researchers a private reporting route rather than forcing a public issue. |
| **Repository Watch** | Custom → Security alerts | **Enable for yourself** | Helps you notice private vulnerability reports and dependency/security alerts. |
| **Settings → Actions → General** | Actions permissions | **Allow actions created by GitHub** initially | The included CI only needs GitHub-maintained `actions/checkout` and `actions/setup-node`. |
| **Settings → Actions → General** | Workflow permissions | **Read repository contents permission** | The CI should not need broader write access. |
| **Settings → Actions → General** | Fork pull request workflow approval | **Require approval for first-time contributors** if the option is shown | Gives you a deliberate gate before workflows run on a new contributor’s PR. |

To enable private vulnerability reporting, GitHub’s current path is **Settings → Advanced Security → Private vulnerability reporting → Enable**. It creates a private **Report a vulnerability** path on the repository’s Advisories page; configure your watch/notification preferences so you actually see reports.[3]

### Branch protection for `main`

Go to **Settings → Branches → Add branch protection rule** and use these values.

| Field | Value to set now | Rationale |
|---|---|---|
| Branch name pattern | `main` | Protects the public default branch only. |
| Require a pull request before merging | **Enable** | Makes every external change reviewable. |
| Required approvals | `0` while you are the only maintainer; change to `1` when a trusted second maintainer joins | A one-person project cannot approve its own required review. |
| Dismiss stale approvals | **Enable once you require approvals** | A prior approval should not silently apply after later code changes. |
| Require conversation resolution before merging | **Enable** | Ensures visible review questions are handled. |
| Require status checks to pass before merging | **Enable after the `verify` check appears** | Makes the included type/build check a real safety gate. |
| Required status check | `verify` | Matches the included workflow job name. |
| Require branches to be up to date before merging | Leave off initially | Adds friction before the project has a steady contributor flow. |
| Allow force pushes | **Do not enable** | Preserves auditable history. |
| Allow deletions | **Do not enable** | Prevents accidental removal of the main branch. |
| Include administrators | **Enable when you have a co-maintainer** | Applies the same guardrails to maintainers; keep a documented emergency procedure. |

GitHub allows rules to require pull requests, reviews, selected status checks, resolved conversations, and restrictions on force pushes or deletions.[4] Do **not** require a check until it has run successfully at least once, otherwise the branch can be blocked by a check that GitHub cannot yet identify.

## 4. Community setup — copy this content

### Create these Discussion categories

With Discussions enabled, create or retain these categories.

| Category | Purpose | Moderation rule |
|---|---|---|
| Announcements | Releases and decisions made by maintainers. | Maintainer-posted only where the setting is available. |
| Q&A | Usage and setup questions. | Encourage accepted answers only when a response truly resolves the question. |
| Ideas | Feature proposals and workflow discussions. | Require one concrete user situation. |
| Show and tell | Redacted, fictional, or safely anonymised examples of use. | Never allow real credentials, personal data, or customer screenshots. |

### Create and pin this welcome discussion

**Title**

```text
Welcome to VeilSnap — share feedback safely
```

**Body**

```md
Welcome to VeilSnap.

VeilSnap is a local screenshot and text redactor for people who need to share useful context without exposing details that should stay private.

This is the best place for usage questions, ideas, and safely anonymised examples. Please use fictional screenshots and placeholder tokens in every public post. Never publish passwords, API keys, customer records, private logs, personal addresses, or unredacted screenshots.

If you found a security or privacy problem in VeilSnap itself, do not open a public issue. Use the repository’s private vulnerability-reporting route instead.

To make feedback actionable, include: the situation you were in, what you expected, what happened, and the smallest safe example you can share.
```

### Create these labels

Create the following labels from **Issues → Labels → New label**.

| Name | Description | Suggested color |
|---|---|---|
| `bug` | A reproducible problem in the current release. | `D73A4A` |
| `documentation` | README, guide, or public-claim improvement. | `0075CA` |
| `accessibility` | Keyboard, contrast, semantics, or assistive-technology improvement. | `6F42C1` |
| `privacy` | Data handling, disclosure, or safe-sharing concern. | `E3492D` |
| `good first issue` | A bounded issue suitable for a first contributor. | `7057FF` |
| `help wanted` | A well-defined task where maintainer input is available. | `008672` |
| `needs reproduction` | More safe details are needed before work can begin. | `FBCA04` |
| `needs design` | The problem is understood but needs a product/design decision. | `BFDADC` |
| `status: triage` | Awaiting the maintainer’s first assessment. | `D4C5F9` |
| `status: accepted` | Planned or currently being worked on. | `0E8A16` |
| `security-private` | Use only internally; never ask reporters to post vulnerabilities publicly. | `151514` |

## 5. Safe maintenance workflow

### Issue triage order

When a new issue arrives, first decide whether it contains private data or describes a security vulnerability. If it does, ask the reporter to remove the public details and use private vulnerability reporting. If it is a normal bug, assign `status: triage`, ask for a minimal **safe** reproduction, and reproduce it yourself before promising a fix.

Only create `good first issue` labels on tasks that are genuinely bounded and documented. A helpful first issue states the user outcome, exact files/areas likely to change, acceptance criteria, and what must not change. Never use a crowd of trivial pull requests as an achievement strategy.

### Pull request review standard

Accept a pull request when it solves the stated problem, respects the local-processing and privacy boundaries, does not introduce unsupported claims, passes the `verify` check, updates user-facing documentation when needed, and contains no real secret or personal data. Thank contributors publicly in release notes where appropriate, but attribute only actual work.

### Suggested maintainer reply for a new contributor

```md
Thank you for the contribution. Before we merge this, please confirm that the example content is fictional or safely anonymised, run `pnpm check` and `pnpm build`, and update the README or privacy notes if the visible workflow or data boundary changes. Once those points are clear, I will complete the review.
```

## 6. First release — copy this into GitHub Releases

On the repository page, choose **Releases → Draft a new release**. GitHub’s release workflow lets you choose/create the tag, target the release branch, add a title and description, and publish the release.[5]

| Release field | Copy-and-paste value |
|---|---|
| Choose a tag | `v0.1.0` |
| Target | `main` |
| Release title | `VeilSnap 0.1 — Local redaction desk` |
| Pre-release | Leave unchecked. |
| Set as latest release | Enable. |

**Release description**

```md
## VeilSnap 0.1

VeilSnap is a local screenshot and text redactor for hiding sensitive details before sharing.

### Included

- Manual solid and blur coverage regions for screenshots.
- Exact-term redaction for pasted text, logs, and snippets.
- Local PNG and text export from the browser workflow.
- A transparent privacy boundary, limitations table, FAQ, and visual product documentation.

### Important limits

- The initial release does not automatically detect secrets.
- It does not claim to remove image metadata.
- Blur preserves context and is not the conservative choice for every sensitive-data risk; use a solid cover when details must not remain visible.
- Please use the repository’s private vulnerability-reporting route for security or privacy flaws in VeilSnap itself.

### What feedback is most useful

Please report a concrete safe-sharing workflow, a reproducible issue using fictional sample data, an accessibility problem, or a documentation gap. Do not include real credentials, customer information, private logs, or personal screenshots.
```

## 7. Growth without gaming the platform

The project can build credibility through real usefulness: a clear README, visible product evidence, a narrow problem, respectful community discussion, clear contribution paths, and maintainers who respond to genuine feedback. It should **not** ask strangers to star as a condition of help, swap stars, automate follows, buy promotion, or create artificial issues/PRs. GitHub prohibits automated rank abuse and inauthentic interaction, including automated starring/following and fake accounts.[1]

The first goal should be five people who are not already collaborators using VeilSnap and describing whether it helped them safely share something. A voluntary star, good issue, trustworthy mention, or meaningful pull request can follow from that result; it cannot be honestly guaranteed in advance.

## 8. Legitimate achievement connection

| Achievement area | How this project can support it | What you control | What you do not control |
|---|---|---|---|
| Starstruck | A useful, public repository with real users may earn voluntary stars. The community catalogue lists 16 stars for the base tier. | Product quality, README clarity, launch discipline, and maintenance. | Whether people star; do not solicit or manufacture stars. |
| Pair Extraordinaire higher tier | A real peer can coauthor a meaningful merged change, correctly attributed. | Clear contributor guidance and honest attribution. | The collaborator’s participation and GitHub’s achievement evaluation. |
| Pull Shark higher tier | External contributors can submit useful PRs that you review and merge. | Triage, meaningful starter issues, and fair review. | PR quality and contributor participation. |
| Galaxy Brain | You can answer genuine GitHub Discussion questions in your real area of knowledge; accepted answers are chosen by the question author. | The quality and usefulness of your answer. | Whether it is accepted. |
| Public Sponsor | Optional personal sponsorship of a qualifying maintainer. | Your voluntary choice. | It is not produced by publishing VeilSnap. |

The achievement thresholds above are community-observed, not a GitHub guarantee; refer to the project’s [achievement research notes](docs/brand-research-notes.md) and verify your profile after authentic milestones.

## 9. Final public-repository checklist

- [ ] Repository is public and named `veilsnap`.
- [ ] Description and topics match the actual product.
- [ ] README visuals, Mermaid diagram, and all internal documentation links render on GitHub.
- [ ] `LICENSE`, `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `CHANGELOG.md` are visible in the repository root.
- [ ] The first commit has been published through GitHub Desktop.
- [ ] Issues and Discussions are enabled.
- [ ] Private vulnerability reporting is enabled, and repository notifications are configured.
- [ ] The branch rule protects `main`; required status check `verify` is selected only after it appears.
- [ ] The first GitHub Actions run passes.
- [ ] The `v0.1.0` release is published with the provided notes.
- [ ] The welcome Discussion is pinned and the labels are created.
- [ ] You have reviewed every public screenshot and example for personal data, private tokens, and unsupported claims.

## References

[1]: https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies "GitHub Acceptable Use Policies"
[2]: https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-an-existing-project-to-github-using-github-desktop "GitHub Docs: Adding an existing project using GitHub Desktop"
[3]: https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/configure-for-a-repository "GitHub Docs: Configuring private vulnerability reporting"
[4]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule "GitHub Docs: Managing a branch protection rule"
[5]: https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository "GitHub Docs: Managing releases in a repository"
