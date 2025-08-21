import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

type Callback = (...args: any[]) => Promise<any>;
export function cache<T extends Callback, A extends any[]>(
  callback: (...args: A) => ReturnType<T>,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] }
) {
  return nextCache(
    reactCache(callback as unknown as Callback),
    keyParts,
    options
  ) as unknown as (...args: A) => ReturnType<T>;
}
