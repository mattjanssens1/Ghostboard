import { createEmptyBoardState } from "@ghostboard/board-model";
import { APP_NAME, APP_TAGLINE } from "@ghostboard/shared";

const board = createEmptyBoardState();

export default function App() {
 return (
  <main className="shell">
   <header className="hero">
    <p className="eyebrow">Ghostboard</p>
    <h1>{APP_NAME}</h1>
    <p className="tagline">{APP_TAGLINE}</p>
   </header>

   <section className="panel">
    <h2>Boot status</h2>
    <ul>
     <li>Monorepo is wired up</li>
     <li>Web app is running</li>
     <li>Workspace packages resolve correctly</li>
    </ul>
   </section>

   <section className="panel">
    <h2>Board seed</h2>
    <pre>{JSON.stringify(board, null, 2)}</pre>
   </section>

   <section className="panel">
    <h2>Next milestones</h2>
    <ol>
     <li>Integrate Excalidraw</li>
     <li>Replace seed state with Yjs document model</li>
     <li>Add local persistence</li>
     <li>Sync across tabs</li>
    </ol>
   </section>
  </main>
 );
}
