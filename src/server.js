import express from "express"
import storage from "./storage"

import morgan from "morgan"

const { NODE_ENV, PORT = 3000 } = process.env;

var app = express()

if (NODE_ENV !== "test") app.use(morgan("tiny"))

const attatchRouter = async () => {
  const db = await storage

  Object.assign(app.locals, { db })
}

attatchRouter()

app.get("/", (req, res) => res.json({ version: "0.0.1" }))
app.get("/:name", (req, res) => {
  const { db } = req.app.locals
  const { name } = req.params
  console.log(db)
  return res.json({ name })
})

app.listen(PORT, () => console.log(`Budgety started at ${PORT} on ${NODE_ENV} mode`))