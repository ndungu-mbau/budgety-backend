import "babel-polyfill"
import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cookies from "cookie-parser"
import favicon from "serve-favicon"
import cors from "cors"

import path from "path"

import storage from "./storage"

import { router as auth, authMiddleware } from "./resolvers/auth"
import { router as entries } from "./resolvers/entries"

const { NODE_ENV, PORT = 4000 } = process.env;

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json('*/*'))
app.use(cookies())
app.use(cors())
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))

if (NODE_ENV !== "test") app.use(morgan("tiny"))

const attatchRouter = async () => {
  const db = await storage

  Object.assign(app.locals, { db })

  app.use("/auth", auth)
  app.use("/entries", authMiddleware, entries)
}

attatchRouter()

app.get("/", (req, res) => res.json({ name:"Budgety", version: "0.0.1" }))

app.listen(PORT, () => console.log(`Budgety started at ${PORT} on ${NODE_ENV} mode`))