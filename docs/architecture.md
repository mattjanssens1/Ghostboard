# Ghostboard Architecture

## Overview

Ghostboard is a local-first collaborative whiteboard.

The goal is simple:

- work offline by default
- sync automatically when peers reconnect
- support real-time collaboration without conflict popups
- keep the architecture open, hackable, and fun to extend

Ghostboard is designed as an open-source playground for local-first ideas, CRDT-based collaboration, and expressive whiteboard UX.

## Core Principles

### 1. Local-first
A board should remain usable even when the network disappears. Users should be able to open, edit, and save boards locally without relying on a server round trip.

### 2. Conflict-tolerant collaboration
Multiple peers should be able to edit the same board concurrently. Merges should happen automatically through CRDT-based state rather than manual conflict resolution.

### 3. Progressive networking
Ghostboard should work in multiple sync modes:

- local only
- same-device multi-tab
- peer-to-peer room sync
- optional hosted relay/server sync

### 4. Clear separation of durable vs ephemeral state
Persistent board content and temporary presence should be modeled separately.

Examples:
- persistent: shapes, arrows, text, images, z-order
- ephemeral: cursor position, selected tool, viewport, online status

### 5. Contributor-friendly internals
The codebase should be easy to understand and easy to extend. Features like replay, branching, plugins, and alternate sync providers should have obvious homes.

## Proposed Stack

### UI / Canvas
- React
- Excalidraw as the initial whiteboard UI layer

### Shared State
- Yjs for CRDT document state

### Presence
- Yjs Awareness for cursors and user presence

### Offline Persistence
- IndexedDB via `y-indexeddb`

### Sync Providers
- `y-webrtc` for peer-to-peer sync
- `y-websocket` as an optional hosted fallback

### App Shell
- Vite or Next.js
- PWA support via service worker

## Monorepo Layout

```text
apps/
 web/ # browser app

packages/
 board-model/ # Yjs document schema, migrations, helpers
 board-ui/ # Excalidraw integration and board actions
 sync/ # WebRTC/WebSocket provider setup
 storage/ # IndexedDB persistence, snapshots, import/export
 presence/ # awareness, cursors, names, colors
 replay/ # timeline and history playback
 shared/ # common types and utilities

docs/
 architecture.md
 roadmap.md
```

## Data Model

The shared board document should stay small, explicit, and boring.

### Persistent board state

Suggested top-level structure:

- `meta`
  - board id
  - title
  - createdAt
  - updatedAt
  - schema version

- `elements`
  - map of element id to element payload

- `order`
  - ordered list of element ids for z-index / rendering order

- `assets`
  - metadata for images or attachments

- `snapshots` or `history`
  - optional timeline checkpoints for replay

### Ephemeral presence state

Presence should not live inside the durable board state.

Examples:

- cursor position
- pointer down/up state
- selected tool
- display name
- color
- viewport / camera info

## Sync Model

Ghostboard should support a layered sync model.

### Mode 1: Local only

- one device
- IndexedDB persistence
- no networking required

### Mode 2: Same-device sync

- multiple tabs
- shared Yjs updates
- awareness events for cursors and presence

### Mode 3: Peer-to-peer rooms

- room links
- WebRTC provider
- no permanent backend required for basic collaboration

### Mode 4: Hosted sync

- WebSocket provider
- optional relay / hosted rooms
- useful for more reliable multi-user access and future auth

## Replay / Time Echoes

A distinctive Ghostboard feature is replay.

The idea:

- preserve enough history to visually replay how a board evolved
- allow a user to scrub through changes over time
- eventually support forks from a previous point in the timeline

This feature is intentionally part utility, part delight.

## Non-Goals for v1

To keep the first version small, Ghostboard should avoid:

- full auth systems
- permissions and ACL complexity
- infinite plugin architecture
- server-heavy storage systems
- polished enterprise collaboration features
- every possible whiteboard tool on day one

## First Implementation Target

The first usable slice should prove four things:

1. a board can be created and edited offline
2. the board survives reloads
3. the same board syncs across tabs
4. two peers can collaborate in a shared room

If those four work, Ghostboard has real bones.

## Future Directions

Potential future extensions:

- timeline replay UI
- board branching / forks
- comments and annotations
- plugin system
- import/export adapters
- alternate CRDT backend experiments
- end-to-end encrypted rooms
- self-hosted sync server
