import { runTests, batchImport } from "./common";

window.onload = async () => {
  const specs = await batchImport();
  const result = await runTests(specs);
  console.warn(JSON.stringify(result));
  document.getElementById("result-panel")!.innerHTML = `<span style="color: ${
    result.success ? "green" : "red"
  };">${JSON.stringify(result)}</span>`;
};
