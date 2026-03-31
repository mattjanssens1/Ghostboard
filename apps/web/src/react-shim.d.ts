declare module "react" {
 const React: {
  StrictMode: (props: { children?: unknown }) => JSX.Element;
 };

 export default React;
}

declare module "react-dom/client" {
 export type Root = {
  render(children: unknown): void;
 };

 export function createRoot(container: Element | DocumentFragment): Root;
}

declare module "react/jsx-runtime" {
 export function jsx(type: unknown, props: Record<string, unknown>, key?: unknown): JSX.Element;
 export function jsxs(type: unknown, props: Record<string, unknown>, key?: unknown): JSX.Element;
 export const Fragment: unique symbol;
}

declare namespace JSX {
 type Element = {
  readonly __jsx: unique symbol;
 };

 interface IntrinsicElements {
  [elementName: string]: Record<string, unknown>;
 }
}
