import {
 createBoardDocument,
 getBoardMeta,
 setBoardMeta,
 type BoardDocument
} from "@ghostboard/board-model";
import { IndexeddbPersistence } from "y-indexeddb";
import * as Y from "yjs";

const LAST_BOARD_ID_STORAGE_KEY = "ghostboard:last-board-id";

export type LocalBoardSession = {
 boardId: string;
 doc: BoardDocument;
 persistence: IndexeddbPersistence;
 destroy: () => void;
};

export type OpenLocalBoardSessionOptions = {
 boardId?: string;
 title?: string;
};

export async function openLocalBoardSession(
 options: OpenLocalBoardSessionOptions = {}
): Promise<LocalBoardSession> {
 const boardId = options.boardId ?? getStoredLastBoardId() ?? createLocalBoardId();
 const doc = new Y.Doc();
 const persistence = new IndexeddbPersistence(boardId, doc);

 setStoredLastBoardId(boardId);

 await persistence.whenSynced;

 createBoardDocument({
  doc,
  meta: {
   id: boardId,
   title: options.title ?? "Untitled board"
  }
 });

 if (getBoardMeta(doc).id !== boardId) {
  setBoardMeta(doc, { id: boardId });
 }

 return {
  boardId,
  doc,
  persistence,
  destroy() {
   persistence.destroy();
   doc.destroy();
  }
 };
}

export function getStoredLastBoardId(): string | null {
 if (!hasLocalStorage()) {
  return null;
 }

 return window.localStorage.getItem(LAST_BOARD_ID_STORAGE_KEY);
}

export function setStoredLastBoardId(boardId: string): void {
 if (!hasLocalStorage()) {
  return;
 }

 window.localStorage.setItem(LAST_BOARD_ID_STORAGE_KEY, boardId);
}

export function createLocalBoardId(): string {
 if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
  return crypto.randomUUID();
 }

 return `board-${Date.now()}`;
}

function hasLocalStorage(): boolean {
 return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}
