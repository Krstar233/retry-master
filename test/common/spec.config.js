const files = require.context("../spec", true, /.spec.js$/);
const keys = files.keys();

export async function batchImport() {
  const res = [];
  for (const key of keys) {
    const specModule = await files(key);
    res.push(specModule);
  }
  return res;
}