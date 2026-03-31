declare module "yjs" {
 export class Doc {
  getMap<T = unknown>(name?: string): Map<T>;
  getArray<T = unknown>(name?: string): Array<T>;
  transact(callback: () => void): void;
 }

 export class Map<T = unknown> {
  get(key: string): T | undefined;
  set(key: string, value: T): T;
  has(key: string): boolean;
 }

 export class Array<T = unknown> {
  get(index: number): T | undefined;
  push(items: T[]): number;
  insert(index: number, items: T[]): void;
  delete(index: number, length?: number): void;
  toArray(): T[];
 }

 export function applyUpdate(doc: Doc, update: Uint8Array): void;
}
