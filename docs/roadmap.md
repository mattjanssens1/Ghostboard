# Ghostboard Roadmap

## Vision

Ghostboard is a local-first collaborative whiteboard that works offline, syncs when peers reconnect, and makes collaboration feel seamless instead of fragile.

This roadmap is intentionally biased toward shipping a fun, understandable open-source core first.

---

## Phase 0: Repo Foundations

### Goals
- establish project structure
- document the architecture
- make contribution paths obvious

### Deliverables
- [ ] license
- [ ] gitignore
- [ ] docs/architecture.md
- [ ] docs/roadmap.md
- [ ] issue templates
- [ ] initial monorepo structure

---

## Phase 1: Local-First Single Player

### Goals
- make one board work well offline
- persist state locally
- create a tiny but satisfying editing loop

### Deliverables
- [ ] create a board
- [ ] render a whiteboard canvas
- [ ] add/edit/delete shapes
- [ ] auto-save board locally
- [ ] restore board on reload
- [ ] import/export board JSON

### Success Criteria
- the app works with Wi-Fi turned off
- the board survives a page refresh
- local editing feels stable and fast

---

## Phase 2: Same-Device Collaboration

### Goals
- prove the CRDT model works
- sync state across tabs/windows
- add visible presence

### Deliverables
- [ ] shared Yjs board document
- [ ] multi-tab sync
- [ ] cursor presence
- [ ] user name / color presence
- [ ] board metadata updates

### Success Criteria
- two tabs stay in sync in real time
- no manual save is required
- presence appears separate from board content

---

## Phase 3: Peer-to-Peer Rooms

### Goals
- allow simple live collaboration without a heavy backend
- share a room link and draw together

### Deliverables
- [ ] room creation
- [ ] room join via URL
- [ ] WebRTC sync provider
- [ ] basic connection status UI
- [ ] presence across peers

### Success Criteria
- two users can join the same board and collaborate
- edits merge without conflict prompts
- reconnecting peers catch up automatically

---

## Phase 4: Time Echoes

### Goals
- make Ghostboard feel unique
- add lightweight replay of board evolution

### Deliverables
- [ ] record edit timeline
- [ ] replay panel
- [ ] scrub through board history
- [ ] restore a previous point in time
- [ ] export replay as JSON metadata

### Success Criteria
- users can watch a board “come alive” over time
- replay does not corrupt current board state
- the feature feels magical and useful

---

## Phase 5: Hosted Sync Option

### Goals
- support more reliable room connectivity
- add an optional server-backed sync mode

### Deliverables
- [ ] WebSocket sync provider
- [ ] hosted room mode
- [ ] room state recovery
- [ ] clearer diagnostics for connection issues

### Success Criteria
- users can choose between peer-to-peer and hosted sync
- joining a room becomes more reliable in difficult networks

---

## Nice-to-Haves

These are exciting, but not required for the first meaningful release.

- [ ] comments / annotations
- [ ] board thumbnails
- [ ] multiple boards dashboard
- [ ] plugin API
- [ ] snapshots / named checkpoints
- [ ] forks / branches
- [ ] image uploads
- [ ] self-hosted sync server
- [ ] end-to-end encrypted rooms

---

## Release Milestones

### v0.1
Offline single-player board

### v0.2
Multi-tab sync with presence

### v0.3
Peer-to-peer collaborative rooms

### v0.4
Replay / Time Echoes

### v0.5
Optional hosted sync mode

---

## Open Source Priorities

Ghostboard should optimize for:
- easy local setup
- readable architecture
- visible progress in demos
- small, approachable issues for contributors
- clear boundaries between packages

If a feature is clever but makes the repo harder to understand, it should probably wait.
