export type BoardElement = {
 id: string;
 type: "rectangle" | "ellipse" | "text" | "arrow";
};

export type BoardState = {
 meta: {
  id: string;
  title: string;
  schemaVersion: number;
  createdAt: string;
  updatedAt: string;
 };
 elements: Record<string, BoardElement>;
 order: string[];
 assets: Record<string, unknown>;
};

export function createEmptyBoardState(): BoardState {
 const now = new Date().toISOString();

 return {
  meta: {
   id: "local-board",
   title: "Untitled board",
   schemaVersion: 1,
   createdAt: now,
   updatedAt: now
  },
  elements: {},
  order: [],
  assets: {}
 };
}
