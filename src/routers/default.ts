// default router
import { Hono } from "hono"
import { getRuntimeKey } from "hono/adapter"

import { StatusCode } from "hono/utils/http-status"
import { customFetch, mergeHeaders } from "../utils/request"
import { validatorQueryURLMiddleware } from "../utils/middleware"

const defaultRoute = new Hono()

defaultRoute.get("/ping", (c) => {
  return c.text("pong", 200)
})

defaultRoute.get("/runtime", (c) => {
  return c.json({ runtime: getRuntimeKey() })
})

defaultRoute.all("/proxy", validatorQueryURLMiddleware, async (c) => {
  const url = c.req.valid("query").url
  console.log(`[defaultRoute] Fetching data from ${url}...`)
  // header property `'Accept-Encoding'='identity'` is used to disable gzip compression
  // make sure get the correct `content-length` header, otherwise the response will not render in browser correctly.
  // another way is to remove the `content-length` header. But it will cause the download progress not be displayed.
  const rep = await customFetch(url, {
    headers: mergeHeaders(c.req.raw.headers, { "Accept-Encoding": "identity" }),
    method: c.req.method
  })
  return c.newResponse(rep.body, rep.status as StatusCode, Object.fromEntries(rep.headers))
})

defaultRoute.get("/down", validatorQueryURLMiddleware, async (c) => {
  const url = c.req.valid("query").url
  console.log(`[defaultRoute] Fetching data from ${url}...`)
  const rep = await customFetch(url, { headers: c.req.raw.headers, method: c.req.method })
  return c.newResponse(rep.body, rep.status as StatusCode, Object.fromEntries(rep.headers))
})

defaultRoute.get("/speedtest", async (c) => {
  const url =
    "https://github.com/AaronFeng753/Waifu2x-Extension-GUI/releases/download/v2.21.12/Waifu2x-Extension-GUI-v2.21.12-Portable.7z"
  const rep = await customFetch(url, { headers: c.req.raw.headers, method: c.req.method })
  console.log(`[defaultRoute] Speedtest from ${url}...`)
  return c.newResponse(rep.body, rep.status as StatusCode, Object.fromEntries(rep.headers))
})

export default defaultRoute
