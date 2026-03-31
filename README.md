# Ghostboard

Ghostboard is a local-first collaborative whiteboard built to work offline, sync cleanly, and stay fun to hack on.

The idea is simple:
- draw and edit boards without depending on a server round-trip
- sync automatically across tabs and peers
- merge concurrent edits without conflict popups
- keep the internals open, understandable, and contributor-friendly

This is meant to be both a useful app and a playground for CRDTs, local-first architecture, replayable state, and expressive whiteboard UX.

## Why Ghostboard exists

Most collaborative tools feel great right up until the network gets weird.
Then things get brittle, confusing, or suspiciously magical in all the wrong ways.

Ghostboard aims for something sturdier:
- **local-first by default**
- **collaborative when available**
- **clear about durable vs ephemeral state**
- **small enough to understand**
- **open enough to extend**

## Principles

### Local-first
A board should still work when Wi-Fi disappears. Create, edit, and save locally first.

### Conflict-tolerant collaboration
Multiple people should be able to edit the same board at once, with merges handled by CRDT state instead of manual cleanup.

### Progressive sync
Ghostboard is intended to support multiple modes over time:
- local only
- same-device multi-tab sync
- peer-to-peer room sync
- optional hosted sync

### Durable vs ephemeral state
Persistent board content and temporary presence should stay separate.

**Durable examples:**
- shapes
- arrows
- text
- images
- z-order
- metadata

**Ephemeral examples:**
- cursor position
- selected tool
- viewport
- presence / online state
- display name and color

### Contributor-friendly internals
The repo should feel inviting, not cryptic. Replay, branching, alternate sync providers, and future plugins should all have obvious homes.

## Proposed stack

- **UI:** React
- **Canvas layer:** Excalidraw
- **CRDT state:** Yjs
- **Presence:** Yjs Awareness
- **Offline persistence:** IndexedDB via `y-indexeddb`
- **Peer sync:** `y-webrtc`
- **Hosted sync fallback:** `y-websocket`
- **App shell:** Vite or Next.js
- **PWA support:** service worker

## Repository layout

```text
apps/
  web/               # browser app

packages/
  board-model/       # Yjs document schema, migrations, helpers
  board-ui/          # Excalidraw integration and board actions
  sync/              # WebRTC/WebSocket provider setup
  storage/           # IndexedDB persistence, snapshots, import/export
  presence/          # awareness, cursors, names, colors
  replay/            # timeline and history playback
  shared/            # common types and utilities

docs/
  architecture.md
  roadmap.md
```

## First implementation target

The first usable slice should prove four things:

1. a board can be created and edited offline
2. the board survives a reload
3. the same board syncs across tabs
4. two peers can collaborate in a shared room

If those four work, Ghostboard has real bones.

## Roadmap

High-level phases:
- **Phase 0:** repo foundations
- **Phase 1:** local-first single player
- **Phase 2:** same-device collaboration
- **Phase 3:** peer-to-peer rooms
- **Phase 4:** Time Echoes replay
- **Phase 5:** optional hosted sync

See [`docs/roadmap.md`](docs/roadmap.md) for the fuller version.

## Time Echoes

One of the more fun ideas in Ghostboard is replay.

The long-term goal is to preserve enough history to:
- scrub through how a board evolved
- replay a session visually
- eventually fork from a previous point in time

Part utility, part delight.

## Status

Right now this repo is in the early scaffold stage:
- docs are in place
- issue templates exist
- monorepo package boundaries are sketched out
- implementation is still ahead

Which is good. Better clean bones than premature spaghetti.

## Contributing

Contributions are welcome, especially around:
- local-first architecture
- Yjs data modeling
- Excalidraw integration
- offline persistence
- sync provider design
- replay/history architecture
- developer experience and docs

If you have an idea, open an issue. If something is broken, weird, haunted, or on fire, there’s a template for that too.

## License

MIT
