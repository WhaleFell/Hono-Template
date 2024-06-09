import { handle } from "@hono/node-server/vercel"
import { app } from "./src/index"

export const config = {
  supportsResponseStreaming: true,
  api: {
    badyParse: false
  }
}
export const dynamic = "force-dynamic"

export default handle(app)
