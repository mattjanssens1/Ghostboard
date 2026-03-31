import {
 getAssetsMap,
 getElementsMap,
 getOrderArray,
 setBoardMeta,
 type BoardAssetRecord,
 type BoardDocument,
 type BoardElementRecord
} from "@ghostboard/board-model";
import type { GhostboardCanvasProps } from "@ghostboard/board-ui";

type CanvasOnChange = NonNullable<GhostboardCanvasProps["onChange"]>;
type SceneElements = Parameters<CanvasOnChange>[0];
type SceneFiles = NonNullable<Parameters<CanvasOnChange>[2]>;

export function createInitialSceneFromBoard(
 doc: BoardDocument
): GhostboardCanvasProps["initialData"] {
 const elementsMap = getElementsMap(doc);
 const orderedIds = getOrderArray(doc).toArray();
 const assetsMap = getAssetsMap(doc);
 const orderedElements: SceneElements = [];
 const seenIds = new Set<string>();

 for (const elementId of orderedIds) {
  const element = elementsMap.get(elementId);

  if (element === undefined) {
   continue;
  }

  orderedElements.push(element as SceneElements[number]);
  seenIds.add(elementId);
 }

 for (const [elementId, element] of elementsMap.entries()) {
  if (seenIds.has(elementId)) {
   continue;
  }

  orderedElements.push(element as SceneElements[number]);
 }

 const files: SceneFiles = {};

 for (const [assetId, asset] of assetsMap.entries()) {
  files[assetId] = asset as SceneFiles[string];
 }

 return {
  elements: orderedElements,
  files,
  appState: {
   viewBackgroundColor: "#0f172a"
  }
 };
}

export function persistSceneToBoard(
 doc: BoardDocument,
 elements: SceneElements,
 files?: SceneFiles
): void {
 const elementsMap = getElementsMap(doc);
 const orderArray = getOrderArray(doc);
 const assetsMap = getAssetsMap(doc);
 const nextElementIds = new Set<string>();
 const nextFiles = files ?? {};

 doc.transact(() => {
  for (const element of elements) {
   nextElementIds.add(element.id);
   elementsMap.set(element.id, element as BoardElementRecord);
  }

  for (const existingElementId of Array.from(elementsMap.keys())) {
   if (!nextElementIds.has(existingElementId)) {
    elementsMap.delete(existingElementId);
   }
  }

  const nextOrder = elements.map((element) => element.id);
  orderArray.delete(0, orderArray.length);

  if (nextOrder.length > 0) {
   orderArray.insert(0, nextOrder);
  }

  const nextFileIds = new Set<string>(Object.keys(nextFiles));

  for (const [fileId, file] of Object.entries(nextFiles)) {
   assetsMap.set(fileId, file as BoardAssetRecord);
  }

  for (const existingFileId of Array.from(assetsMap.keys())) {
   if (!nextFileIds.has(existingFileId)) {
    assetsMap.delete(existingFileId);
   }
  }
 });

 setBoardMeta(doc, {});
}
