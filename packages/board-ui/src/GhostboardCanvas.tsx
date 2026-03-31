import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

export function GhostboardCanvas() {
 return (
  <div
   style={{
    height: "100vh",
    width: "100%"
   }}
  >
   <Excalidraw
    initialData={{
     appState: {
      viewBackgroundColor: "#0f172a"
     }
    }}
   />
  </div>
 );
}
