declare module "@excalidraw/excalidraw" {
 import type { JSX } from "react";

 export type ExcalidrawProps = {
  initialData?: {
   appState?: {
    viewBackgroundColor?: string;
   };
  };
 };

 export function Excalidraw(props: ExcalidrawProps): JSX.Element;
}

declare module "@excalidraw/excalidraw/index.css";
