import esbuild from "esbuild"

esbuild
  .build({
    entryPoints: ["./src/vercel-runner.ts"], // 入口文件
    bundle: true, // 打包成单个文件
    outfile: "./dist/bundle.js", // 输出文件
    format: "esm", // 使用 ES 模块格式
    target: ["esnext"], // 保留 const 等现代语法
    platform: "node", // 目标平台为node
    sourcemap: false // 生成 source map 文件
  })
  .then(() => {
    console.log("Build succeeded")
  })
  .catch(() => {
    console.error("Build failed")
    process.exit(1)
  })
