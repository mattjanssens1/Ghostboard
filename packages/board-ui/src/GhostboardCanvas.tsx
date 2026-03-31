import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import type { ComponentProps } from "react";

type ExcalidrawProps = ComponentProps<typeof Excalidraw>;

export type GhostboardCanvasProps = {
 initialData?: ExcalidrawProps["initialData"];
 onChange?: ExcalidrawProps["onChange"];
};

export function GhostboardCanvas({
 initialData,
 onChange
}: GhostboardCanvasProps) {
 return (
  <div
   style={{
    height: "100vh",
    width: "100%"
   }}
  >
   <Excalidraw
    initialData={
     initialData ?? {
      appState: {
       viewBackgroundColor: "#0f172a"
      }
     }
    }
    onChange={onChange}
   />
  </div>
 );
}
