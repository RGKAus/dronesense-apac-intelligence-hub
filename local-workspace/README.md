# Versaterm local fictional workspace

Phase 1 prototype only. **Never store real customer information, contacts,
transcripts or commercial records.** No OneDrive, Salesforce synchronisation,
Supabase, Vercel, analytics, AI or external services are connected.

## Start on this Mac

Use Node **24.2 or newer** (tested with Node 26). From the repository root:

```bash
cd local-workspace
npm start
```

Dependencies are already installed on the development Mac. On a fresh checkout,
first run `npm ci` in both `web-app` and `local-workspace`. Shared components
resolve their existing dependencies from the public application's directory.

The launcher compiles and builds the isolated app, then serves only
**http://127.0.0.1:3219**. Open that exact address; `localhost` is deliberately
not accepted. Copy the random unlock code from the launch terminal into the
unlock form. This is not a corporate password. Keep the terminal open; use
Ctrl+C to stop. Restarting requires the new launch code but retains records.

Do not run `next start`, expose a tunnel, change the host, or configure Vercel
to deploy this application. The custom server is the access-control boundary.
It refuses Vercel, strips inherited cloud credentials from child processes,
disables Next telemetry, and rejects local `.env` configuration.

## Storage and writes

The fixed development-data directory is:

```text
~/Library/Application Support/Versaterm Intelligence Hub Prototype/
  fictional-workspace.sqlite
  backups/
```

There is deliberately no configurable data-path override. The launcher rejects
symlinked ancestors and known sync-folder paths. This standard Application
Support location is outside this OneDrive-hosted Git checkout. Do not separately
configure any sync software to synchronise it. Application code cannot discover
every possible third-party synchronisation rule.

SQLite uses synchronous FULL transactions and a rollback journal. Data is seeded
only for a new database; damaged or incompatible existing state fails closed,
not back to demo defaults. Directories are owner-only (0700); files are 0600.
The database is not application-encrypted. FileVault, a managed account and
device protections remain necessary before any later real-data approval.

The database stores one **versioned workspace aggregate** as validated JSON in
a singleton SQLite row. Contracts and follow-ups remain nested in the existing
customer/entry domain models, avoiding a competing schema. Each save commits the
entire aggregate atomically with a global optimistic revision. This deliberately
simple single-user prototype is limited to 6 MB of workspace JSON, with a
200,000-character per-entry notes limit. It is not a scalable multi-user store
or an audit-history implementation.

Server-side exact-shape and shared domain validation reject unsupported fields,
contact patterns, unlabelled fictional text, changed canonical identities,
dangling links and invalid commercial values. These fictional-text checks are
**not sensitive-data detection**; adding the word "fictional" to a real note
does not make it permitted.

Customers retain section-level editing, unknown/reviewed-unknown states,
completeness, multiple contracts, evidence/source attribution and follow-up
editing. Save waits for the database acknowledgement. Cancel does not write.
Notebook entries can link to multiple existing organisations, including newly
created local fictional identities. IDs survive restarts and renames.
Canonical Agencies remain read-only and unclassified. Salesforce entry stays
locked and official records remain authoritative in Salesforce.

Deleting a customer removes its fictional organisation/profile/contracts/actions
and explicitly removes that ID from retained log entries. Deleting a log entry
removes its own follow-ups. Confirmation is required. Backups are retained.

Two tabs cannot silently overwrite one another: stale workspace revisions return
409 and preserve the failed draft. Reload before retrying. Only one server
instance can bind the fixed port. No automatic merging is attempted.

## Local access protection

The custom server validates the socket peer, exact Host and Origin; mutations
also require JSON and a session-bound CSRF token. Every private page/API requires
the launch session. Cross-origin access, arbitrary modules and state-changing
GETs are rejected. There is no permissive CORS.

Sessions use HttpOnly/SameSite=Strict cookies, an eight-hour maximum and a
30-minute server inactivity timeout. The UI returns to unlock 30 minutes after
loading, even if active; an explicit Lock button clears server access immediately.
Cookies do not have Secure because this prototype deliberately uses loopback
HTTP rather than TLS. Other processes under your macOS account remain outside
the protection this prototype can provide.

The UI has no external assets or analytics. CSP restricts connections to the
same origin and prevents framing. Inline script/style are permitted for Next's
production runtime; pasted notes are escaped plain text, never raw HTML.
API responses are no-store. Only necessary browser session cookies are used;
no local/session storage or service-worker persistence is introduced.

## Backup, restore and recovery

Use **Backup / Restore → Create backup**. This creates a versioned fictional JSON
snapshot with schema marker and SHA-256 checksum, using a temporary file,
file flush, atomic rename and directory flush. Snapshot reads are consistent
because the workspace is one committed SQLite row.

Choose a backup and **Restore selected backup** to validate and replace the
workspace transactionally. A pre-restore snapshot is retained and the current
revision advances; reload other tabs. Checksum/schema errors leave current
records unchanged. Only listed filenames in the local backups folder are
accepted; no uploads, arbitrary paths or OneDrive destinations.

If the database cannot open, stop the app and recover from a known good backup:

```bash
npm run recover -- fictional-YYYY-MM-DDTHH.MM.SS.sssZ-uuid.json
```

Use an actual filename from the local backups folder. Recovery verifies it
without opening the damaged database, builds a replacement, retains the previous
database, and atomically replaces the working file. It refuses to run while the
workspace's port is occupied. No corporate/synced data paths are accepted.

Backups and retained pre-recovery databases are on the same local disk, are not
encrypted by this app and have no automatic retention. Checksums detect
accidental corruption, not malicious tampering. They do not protect against disk
loss, device loss or same-user malware. Approved off-device backup and retention
remain future work; **do not copy them to OneDrive yet**.

## Validation and public-build isolation

```bash
# Repository root: build the public app for isolation-trace tests.
cd web-app
npm run build
node --test tests/customers.test.mjs tests/portfolio.test.mjs tests/intelligence-log.test.mjs
cd ../local-workspace
npm test
```

Stop any running workspace before the HTTP restart tests; they need port 3219.
They temporarily save a fictional entry in the prototype store and restore the
previous saved content. Storage unit tests use disposable OS temporary folders.
Do not run tests while editing.

Tests cover customer/contract/action/log CRUD, reopen/restart persistence,
validation, stale writes, backup/restore/checksum and symlink rejection,
authentication, Host/Origin/CSRF boundaries, and public Next route/file traces.
The public app does not import this directory. Shared editors accept injected
async persistence callbacks; absent injection they retain their memory-only
behavior and contain no local storage routes or database access.

Only fictional models/UI/code live in Git. SQLite files, backups, generated
runtime/build output and local configuration are excluded. The primary control
is storing data outside the repository, not relying on ignore rules.

Before any real-data phase: company approval, approved classification/location,
named-user/unlock design review, encryption/device controls, retention and audit,
recovery operations and security review are still required.
