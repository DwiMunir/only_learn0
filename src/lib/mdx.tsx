import { evaluate } from "@mdx-js/mdx";
import type { ComponentType } from "react";
import * as runtime from "react/jsx-runtime";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Components = Record<string, ComponentType<any>>;

/**
 * Render MDX di server (saat build). Konten berasal dari repo sendiri, jadi aman dieksekusi.
 */
export async function renderMdx(source: string, components: Components) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { default: Content } = await evaluate(source, { ...(runtime as any), development: false });
  return <Content components={components} />;
}
