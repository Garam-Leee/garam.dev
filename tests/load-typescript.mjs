import fs from "node:fs";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import path from "node:path";

const require = createRequire(import.meta.url);

export function loadTypeScript(file, mocks = {}) {
  const source = fs.readFileSync(file, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });
  const exports = {};
  vm.runInNewContext(outputText, {
    exports,
    process,
    console,
    URL,
    URLSearchParams,
    require: (name) => {
      if (mocks[name]) return mocks[name];
      if (name.startsWith(".")) {
        const target = path.resolve(path.dirname(file), `${name}.ts`);
        if (fs.existsSync(target)) return loadTypeScript(target, mocks);
      }
      return require(name);
    },
  }, { filename: file });
  return exports;
}
