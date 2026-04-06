const { resolve } = require("path");
const { context } = require("esbuild");

const buildPath = resolve(__dirname, "build");

(async () => {
  const ctx = await context({
    entryPoints: ["./client/client.ts"],
    outdir: resolve(buildPath, "client"),
    bundle: true,
    minify: true,
    platform: "browser",
    target: "es2020",
    logLevel: "info",
  });

  await ctx.watch();
  // optional: keep process alive / serve
  // await ctx.serve({ servedir: resolve(buildPath, "client") });
})().catch(() => process.exit(1));
