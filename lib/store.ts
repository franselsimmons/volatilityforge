type Json = any;

declare global {
  // eslint-disable-next-line no-var
  var __VF_MEMSTORE__: Map<string, any> | undefined;
}

function mem() {
  if (!globalThis.__VF_MEMSTORE__) globalThis.__VF_MEMSTORE__ = new Map();
  return globalThis.__VF_MEMSTORE__;
}

function hasVercelKv(): boolean {
  return !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;
}

async function kvClient() {
  const mod = await import("@vercel/kv");
  return mod.kv;
}

export async function get(key: string): Promise<Json | null> {
  if (hasVercelKv()) {
    const kv = await kvClient();
    return (await kv.get(key)) as any;
  }
  return mem().get(key) ?? null;
}

export async function set(key: string, value: Json, opts?: { ex?: number }): Promise<void> {
  if (hasVercelKv()) {
    const kv = await kvClient();
    await kv.set(key, value, opts as any);
    return;
  }
  mem().set(key, value);
}

export async function del(key: string): Promise<void> {
  if (hasVercelKv()) {
    const kv = await kvClient();
    await kv.del(key);
    return;
  }
  mem().delete(key);
}