import * as Y from "yjs";

export const BOARD_SCHEMA_VERSION = 1;

const META_KEY = "meta";
const ELEMENTS_KEY = "elements";
const ORDER_KEY = "order";
const ASSETS_KEY = "assets";

/**
 * Durable board metadata stored in the Yjs document.
 * Presence, cursors, tool state, and viewport state must stay out of this model.
 */
export type BoardMeta = {
 id: string;
 title: string;
 schemaVersion: number;
 createdAt: string;
 updatedAt: string;
};

export type BoardElementRecord = Record<string, unknown>;
export type BoardAssetRecord = Record<string, unknown>;

export type BoardDocument = Y.Doc;
export type BoardMetaMap = Y.Map<BoardMeta[keyof BoardMeta]>;
export type BoardElementsMap = Y.Map<BoardElementRecord>;
export type BoardOrderArray = Y.Array<string>;
export type BoardAssetsMap = Y.Map<BoardAssetRecord>;

export type CreateBoardDocumentOptions = {
 doc?: BoardDocument;
 meta?: Partial<BoardMeta>;
};

export type LoadBoardDocumentOptions = {
 doc?: BoardDocument;
 meta?: Partial<BoardMeta>;
};

/**
 * Ghostboard durable schema:
 * - `meta`: board metadata and schema version
 * - `elements`: durable element payloads keyed by element id
 * - `order`: z-order / presentation order of element ids
 * - `assets`: durable asset payloads keyed by asset id
 */
export function createBoardDocument(options: CreateBoardDocumentOptions): BoardDocument;
export function createBoardDocument(options?: Partial<CreateBoardDocumentOptions>): BoardDocument;
export function createBoardDocument(
 options: Partial<CreateBoardDocumentOptions> = {}
): BoardDocument {
 const doc = options.doc ?? new Y.Doc();

 initializeBoardDocument(doc, options.meta);

 return doc;
}

export function loadBoardDocument(
 update: Uint8Array,
 options: LoadBoardDocumentOptions
): BoardDocument;
export function loadBoardDocument(
 update: Uint8Array,
 options?: Partial<LoadBoardDocumentOptions>
): BoardDocument;
export function loadBoardDocument(
 update: Uint8Array,
 options: Partial<LoadBoardDocumentOptions> = {}
): BoardDocument {
 const doc = options.doc ?? new Y.Doc();

 Y.applyUpdate(doc, update);
 initializeBoardDocument(doc, options.meta);

 return doc;
}

export function getBoardMeta(doc: BoardDocument): BoardMeta {
 const meta = getMetaMap(doc);

 return {
  id: readRequiredMetaField(meta, "id"),
  title: readRequiredMetaField(meta, "title"),
  schemaVersion: readRequiredMetaField(meta, "schemaVersion"),
  createdAt: readRequiredMetaField(meta, "createdAt"),
  updatedAt: readRequiredMetaField(meta, "updatedAt")
 };
}

export function setBoardMeta(
 doc: BoardDocument,
 patch: Partial<Omit<BoardMeta, "schemaVersion">>
): BoardMeta {
 const meta = getMetaMap(doc);
 const current = getBoardMeta(doc);

 const next: BoardMeta = {
  ...current,
  ...patch,
  schemaVersion: BOARD_SCHEMA_VERSION,
  updatedAt: patch.updatedAt ?? new Date().toISOString()
 };

 doc.transact(() => {
  meta.set("id", next.id);
  meta.set("title", next.title);
  meta.set("schemaVersion", next.schemaVersion);
  meta.set("createdAt", next.createdAt);
  meta.set("updatedAt", next.updatedAt);
 });

 return next;
}

export function getElementsMap(doc: BoardDocument): BoardElementsMap {
 return doc.getMap<BoardElementRecord>(ELEMENTS_KEY);
}

export function getOrderArray(doc: BoardDocument): BoardOrderArray {
 return doc.getArray<string>(ORDER_KEY);
}

export function getAssetsMap(doc: BoardDocument): BoardAssetsMap {
 return doc.getMap<BoardAssetRecord>(ASSETS_KEY);
}

function initializeBoardDocument(
 doc: BoardDocument,
 metaOverrides: Partial<BoardMeta> = {}
): void {
 const meta = getMetaMap(doc);
 const defaults = createDefaultMeta(metaOverrides);

 doc.transact(() => {
  setDefaultMetaField(meta, "id", defaults.id);
  setDefaultMetaField(meta, "title", defaults.title);
  setDefaultMetaField(meta, "schemaVersion", BOARD_SCHEMA_VERSION);
  setDefaultMetaField(meta, "createdAt", defaults.createdAt);
  setDefaultMetaField(meta, "updatedAt", defaults.updatedAt);

  if (meta.get("schemaVersion") !== BOARD_SCHEMA_VERSION) {
   meta.set("schemaVersion", BOARD_SCHEMA_VERSION);
  }

  getElementsMap(doc);
  getOrderArray(doc);
  getAssetsMap(doc);
 });
}

function createDefaultMeta(metaOverrides: Partial<BoardMeta>): BoardMeta {
 const now = new Date().toISOString();

 return {
  id: metaOverrides.id ?? "local-board",
  title: metaOverrides.title ?? "Untitled board",
  schemaVersion: BOARD_SCHEMA_VERSION,
  createdAt: metaOverrides.createdAt ?? now,
  updatedAt: metaOverrides.updatedAt ?? metaOverrides.createdAt ?? now
 };
}

function getMetaMap(doc: BoardDocument): BoardMetaMap {
 return doc.getMap<BoardMeta[keyof BoardMeta]>(META_KEY);
}

function setDefaultMetaField<K extends keyof BoardMeta>(
 meta: BoardMetaMap,
 key: K,
 value: BoardMeta[K]
): void {
 if (meta.has(key)) {
  return;
 }

 meta.set(key, value);
}

function readRequiredMetaField<K extends keyof BoardMeta>(
 meta: BoardMetaMap,
 key: K
): BoardMeta[K] {
 const value = meta.get(key);

 if (value === undefined) {
  throw new Error(`Ghostboard board document is missing required meta field "${key}".`);
 }

 return value as BoardMeta[K];
}
