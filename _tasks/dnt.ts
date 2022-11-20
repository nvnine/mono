import { build } from "../deps/dnt.ts";
import * as fs from "../deps/std/fs.ts";
import { fail } from "../deps/std/testing/asserts.ts";

const OUT_DIR = "target/npm";
await fs.emptyDir(OUT_DIR);

await Promise.all([
  build({
    entryPoints: ["mod.ts"],
    outDir: OUT_DIR,
    package: {
      name: "mono",
      version: Deno.args[0] || fail(),
      description: "A tiny functional effect system",
      license: "Apache-2.0",
      repository: `github:nvnine/mono`,
    },
    compilerOptions: {
      lib: ["dom", "esnext"],
      importHelpers: true,
      sourceMap: true,
      target: "ES2021",
    },
    scriptModule: "cjs",
    shims: {
      deno: {
        test: true,
      },
    },
    test: true,
    typeCheck: true,
  }),
  fs.copy("LICENSE", `${OUT_DIR}/LICENSE`),
  fs.copy("README.md", `${OUT_DIR}/README.md`),
]);
