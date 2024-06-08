import { validator } from "hono/validator"
import { Handler } from "hono"
import { createFactory } from "hono/factory"

const factory = createFactory()

// const URL_REGEX = /(http|https):\/\/([\w.]+\/?)\S*/gi
export const validatorQueryURLMiddleware = validator("query", (value, c) => {
  if (typeof value.url !== "string") {
    return c.json({ error: `Invalid URL ${value.url}` }, 400)
  }

  // if (!URL_REGEX.test(value.url)) {
  // 	console.log(`[validatorURLMiddleware] Invalid URL ${value.url}`)
  // 	return c.json({ error: `Invalid URL ${value.url}` }, 400)
  // }

  return {
    url: value.url
  }
})

export const delHeaderLengthMiddleware = factory.createMiddleware(async (c, next) => {
  await next()
  console.log("[delHeaderLengthMiddleware] Deleting Content-Length header...")
  c.res.headers.delete("content-length")
  c.res.headers.delete("content-encoding")
})

export const anyCorsMiddleware = factory.createMiddleware(async (c, next) => {
  c.res.headers.set("Access-Control-Allow-Origin", "*")
  c.res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  c.res.headers.set("Access-Control-Allow-Headers", "Content-Type")
  await next()
})
