import { GhostboardCanvas } from "@ghostboard/board-ui";
import { openLocalBoardSession, type LocalBoardSession } from "@ghostboard/storage";
import { useEffect, useState } from "react";

import {
 createInitialSceneFromBoard,
 persistSceneToBoard,
 type SceneElementsSnapshot,
 type SceneFilesSnapshot
} from "./boardScene";

export default function App() {
 const [session, setSession] = useState<LocalBoardSession | null>(null);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  let cancelled = false;
  let activeSession: LocalBoardSession | null = null;

  void openLocalBoardSession()
   .then((nextSession) => {
    if (cancelled) {
     nextSession.destroy();
     return;
    }

    activeSession = nextSession;
    setSession(nextSession);
   })
   .catch((nextError: unknown) => {
    if (cancelled) {
     return;
    }

    setError(nextError instanceof Error ? nextError.message : "Failed to open board.");
   });

  return () => {
   cancelled = true;
   activeSession?.destroy();
  };
 }, []);

 if (error !== null) {
  return (
   <main className="app-shell">
    <p>Failed to open local board.</p>
    <p>{error}</p>
   </main>
  );
 }

 if (session === null) {
  return (
   <main className="app-shell">
    <p>Opening local board...</p>
   </main>
  );
 }

 return (
  <GhostboardCanvas
   initialData={createInitialSceneFromBoard(session.doc)}
   onChange={(elements: SceneElementsSnapshot, _appState: unknown, files?: SceneFilesSnapshot) => {
    persistSceneToBoard(session.doc, elements, files);
   }}
  />
 );
}
