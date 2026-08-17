# Security and privacy notes

## Scope of the first release

VeilSnap release 0.1 is a client-side redaction utility. Its intended core workflow is: select an image or paste text, apply manual redactions in the browser, review the output, and export a copy locally.

## What to report

Please report a potential privacy or security issue privately rather than placing exploit details in a public issue. Useful reports include a clear reproduction path, browser/version, expected versus actual behaviour, whether user content could be exposed, and any suggested mitigation.

## Product boundaries

VeilSnap does not claim to be a compliance tool, a forensic sanitiser, a secret scanner, or a substitute for organisational security processes. In particular, the first release does not claim to remove image metadata. Users remain responsible for reviewing their exported copy and for following the data-handling requirements that apply to them.

## Disclosure practice

Public documentation must be updated whenever the application’s data flow, storage, analytics, authentication, or connected-service behaviour changes. A claim about local processing is only valid while the released code and observed behaviour support it.
