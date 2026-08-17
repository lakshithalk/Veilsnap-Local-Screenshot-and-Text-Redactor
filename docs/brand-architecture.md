# VeilSnap Brand Architecture, SEO/AEO Vocabulary, and Visual Content Standard

**Status:** Approved working identity for implementation. It is not a trademark opinion or commercial clearance.  
**Product:** A privacy-first browser utility for manually redacting screenshots and pasted text before sharing.

## 1. Product identity

| Layer | Approved working copy | Job it performs |
|---|---|---|
| Brand | **VeilSnap** | Creates a memorable, compact product identity. “Veil” signals protection; “Snap” makes the screenshot use case instantly legible. |
| Functional descriptor | **Local screenshot and text redactor** | States the searchable product category without vague marketing language. |
| Core promise | **Redact sensitive details from screenshots and pasted text before you share them — directly in your browser.** | States the task, the outcome, and the intended local-processing boundary. |
| Brand line | **Share the context. Keep the secrets.** | Supports recall without replacing the factual descriptor. |
| Primary audience | Developers, support teams, students, independent makers, and anyone who needs to share screenshots or copied text safely. | Keeps the initial use cases broad but concrete. |
| Primary differentiator | **Safe-sharing workflow, not just image markup.** VeilSnap combines image and pasted-text redaction, a clear privacy surface, and honest limits in one small tool. | Avoids claiming that ordinary screenshot redaction itself is novel. |

The public repository should use the slug **`veilsnap`** if it remains available at creation time. A namespace check on 17 August 2026 returned a GitHub 404 for the exact public `veilsnap` path; this is only an availability signal, not a domain, package, or trademark clearance.

## 2. Search-intent and answer-engine vocabulary

The project will use keywords only where they describe a real capability. The language must remain natural: the same concept should not be repeated as a list of word variants. The exact visible wording will be maintained in the app, its README, and the product page, with only the page task changing.

| Intent cluster | Natural terms to use | Answer-ready question | Evidence needed before publishing |
|---|---|---|---|
| Screenshot redaction | redact screenshot, hide sensitive information, remove API key from screenshot, cover an email address | **How can I redact a screenshot before sharing it?** | Working image import, region tools, and permanent export. |
| Local privacy | browser-based, local processing, no account, no upload | **Does VeilSnap upload my screenshot?** | Code and release checks must confirm that the initial path makes no network request for user content. |
| Text cleanup | redact copied text, remove secrets from logs, hide tokens in text | **How can I redact a pasted log or code snippet?** | Working text-selection and export path. |
| Secure sharing | solid redaction, blur vs. black box, check before sharing | **Is blur the same as permanent redaction?** | A clear explanation that solid coverage is the appropriate visible option when underlying content must be concealed, plus a limitation statement. |
| Usability | free redaction tool, no signup, mobile screenshot redactor | **Can I use VeilSnap without an account?** | A release that truly requires no account for its core task. |
| Product comparison | screenshot editor, image blur tool, privacy redactor | **What is VeilSnap for, and when should I use it instead of an image editor?** | Honest capability/limitation comparison that does not make unverified claims about competitors. |

## 3. Approved page and repository copy system

| Surface | Approved working copy | Constraint |
|---|---|---|
| Website `<title>` | **VeilSnap — Redact Screenshots Locally Before Sharing** | Descriptive, concise, and unique to the home page. |
| Website meta description | **VeilSnap is a local screenshot and text redactor for hiding sensitive details before you share. Redact, review, and export in your browser.** | Must be revised if implementation changes the local-processing model. |
| Website H1 | **Redact screenshots locally. Share safely.** | Hero subtitle carries the specific tool category. |
| Hero subtitle | **VeilSnap hides sensitive details in screenshots and pasted text before you share them — no account required for the core workflow.** | Publish only after account-free core workflow is verified. |
| Repository About text | **Local screenshot and text redactor for safer sharing.** | Keep factual and compact. |
| README first line | **VeilSnap is a local screenshot and text redactor that helps you hide sensitive details before sharing.** | Must be the first factual description. |
| README callout | **Share the context. Keep the secrets.** | Brand line only; never substitute it for product explanation. |
| Social preview headline | **Redact before you share.** | The supporting visual must show actual product UI. |

Google’s official guidance calls for descriptive, concise titles, rejects keyword stuffing, and recommends concise branding plus a clear dominant page title. The copy system above implements that pattern rather than creating repeated lists of keyword variants.[1]

## 4. Answer-engine page structure

The product page will provide a direct answer before elaboration. Every major claim needs a supporting implementation, screenshot, or limitation disclosure. The first version will not create a blog farm or generic “how to” pages; it will publish a focused product page and a small, factual FAQ around the actual user journey.

| Page section | Direct answer | Supporting material |
|---|---|---|
| Hero | VeilSnap lets users manually redact sensitive details in screenshots and pasted text before sharing. | Current product screenshot and a one-sentence processing boundary. |
| How it works | Import or paste, add redactions, review, then export the cleaned result. | Three actual workflow screenshots. |
| Privacy surface | In the initial local-only release, user content is processed in the browser; no account is needed for the core workflow. | A data-flow diagram and a plain-language limitations table. |
| Redaction choices | Use solid masks when details must be visibly concealed; blur is for context preservation and may not be appropriate for every risk level. | Side-by-side fictional example and plain-language note. |
| Use cases | Developers can conceal tokens; support teams can conceal names and emails; students can conceal personal information. | Fictional examples only. |
| FAQ | Short questions with direct, current answers. | Links to usage, privacy, and limitations sections. |

## 5. Visual storytelling system

Product screenshots must show the true release. Concept artwork is allowed only as a supporting brand visual and must not imply UI or features that have not been built. Visual proof should make the user’s path understandable even if they scan rather than read.

| Asset ID | Filename convention | What it shows | Draft alt-text pattern | Placement |
|---|---|---|---|---|
| V01 | `veilsnap-local-redaction-editor.webp` | Editor with a fictional API token covered by a solid mask. | “VeilSnap editor with a solid redaction box covering a fictional API token in a screenshot.” | README hero and product proof block. |
| V02 | `veilsnap-redact-screenshot-three-steps.webp` | Import, redact, export sequence. | “Three VeilSnap steps: import a screenshot, cover sensitive details, and export the cleaned image.” | How-it-works section. |
| V03 | `veilsnap-text-redaction-before-after.webp` | Pasted fictional text before and after redaction. | “Pasted fictional log text before and after VeilSnap redacts an email address and token.” | Text-redaction use case. |
| V04 | `veilsnap-redaction-modes-solid-and-blur.webp` | Fictional sample comparing solid cover and blur. | “VeilSnap example showing solid and blur redaction modes on fictional screenshot details.” | Redaction-choice explanation. |
| V05 | `veilsnap-local-data-flow.png` | Deterministic data-flow diagram. | “Diagram showing a screenshot processed and exported locally in VeilSnap without an account in the core workflow.” | Privacy section. |
| V06 | `veilsnap-screenshot-redaction-demo.gif` | Short real end-to-end happy path. | “Short VeilSnap demo: open a screenshot, redact a fictional token, and export.” | README immediately below hero. |

All screenshot filenames and alt text must stay specific and contextual. Google’s image guidance recommends descriptive filenames, relevant surrounding text, and information-rich alt text while warning against keyword stuffing; it also treats alt text as an accessibility benefit.[2]

## 6. Transparency register

| Statement class | Publish only when this is true | Do not say |
|---|---|---|
| Local processing | The actual core workflow processes user content in the browser and validation shows no content upload. | “Military-grade,” “100% secure,” or “private by magic.” |
| No account | A user can complete the central workflow without creating or supplying an account. | “No tracking” unless analytics configuration and network behaviour prove it. |
| Redaction | The exported file visibly covers selected regions in the final output. | “Blur is unrecoverable” or “all redaction is legally compliant.” |
| Metadata | Metadata is stripped only if the product explicitly implements and validates that behaviour. | “EXIF removed” by default. |
| Accessibility | The tested core workflow is keyboard accessible and labels are present. | “Fully accessible” without a defined audit basis. |
| Free product | The stated core workflow has no charge at the time of release. | “Free forever.” |

## 7. Future brand reserve list

These are **unvalidated working directions** for the other two mini-projects. They are intentionally brand plus descriptor, not final adoption decisions. Availability, collision screening, and product-fit review are required before use.

| Product lane | Working brand direction | Descriptor pattern | Brand line direction |
|---|---|---|---|
| Time-zone availability | **SlotLoom** | No-signup time-zone availability page | “One plan. Every time zone.” |
| Decision records | **DecisionInk** | Shareable decision record and accountability card | “Make the decision traceable.” |

## References

[1]: https://developers.google.com/search/docs/appearance/title-link "Google Search Central: Influencing title links in Google Search"
[2]: https://developers.google.com/search/docs/appearance/google-images "Google Search Central: Image SEO best practices"
