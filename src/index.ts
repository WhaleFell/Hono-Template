import { Hono } from "hono"

// custom
import { exceptionHandler } from "./exception"
import defaultRoute from "./routers/default"
import { anyCorsMiddleware } from "./utils/middleware"

export const app = new Hono({ strict: false })

// cors middleware
app.use(anyCorsMiddleware)

app.get("/", (c) => {
  const url = new URL(c.req.url)
  const hostname = url.origin
  return c.json({ message: `Hello World! This is NodeJS Hono web framework template!`, hostname })
})

// exception handler
exceptionHandler(app)

// add custom routes here
app.route("/", defaultRoute)
