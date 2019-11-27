import express from "express"

const { PORT = 3000, NODE_ENV } = process.env

const app = express()

app.get("/", (req, res) => res.json({ version: "0.0.1" }))

app.listen(PORT, () => console.log(`Budgety started at ${PORT} on ${NODE_ENV} mode`))