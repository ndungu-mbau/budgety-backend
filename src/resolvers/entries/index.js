import { Router } from "express"
import { ObjectID } from "mongodb"

const router = Router()

router.get("/", async (req, res) => {
  const { db: { collections }} = req.app.locals
  const { id : user } = req.user

  const entries = await collections["entries"].find({ user, isDeleted: false })
  res.json(entries)
})

router.post("/", async (req, res) => {
  const { db: { collections }} = req.app.locals
  const { id : user } = req.user
  const { type, description, amount } = req.body

  const entry = {
    type,
    description,
    amount,
    id: new ObjectID().toHexString(),
    user
  }

  await collections["entries"].create(entry)

  res.json(entry)
})

router.delete("/:id", async (req, res) => {
  const { db: { collections }} = req.app.locals
  const { id } = req.params

  try {
    await collections["entries"].update({ id }).set({ isDeleted: true })

    return res.json({ id, ok: true, message: "Deleted successfully" })
  } catch (err) {
    return res.json({ id, ok: false, message: err.message })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.body
  const entry = req.body

  try {
    delete entry.id

    await collections["entries"].update({ id }).set(entry)

    return res.json({ ok:true, message:"Updated successfully", entry })
  } catch (err) {
    return res.json({ ok: false, message: err.message })
  }
})

export {
  router
}