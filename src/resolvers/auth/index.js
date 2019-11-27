import jwt from "jsonwebtoken"
import { Router } from "express"
import { ObjectID } from "mongodb"

const router = Router()

const { SECRET = "abcde" } = process.env

const authMiddleware = (req, res, next) => {
  const { token } = req.cookies

  if(!token) return res.json({ ok: false, message: "Not Authenticated" })

  req.user = jwt.decode(token, SECRET)
  next()
}

router.post('/login', async (req, res) => {
  const { db : { collections }} = req.app.locals
  const { email, password } = req.body
  
  const user = await collections["users"].findOne({ email })
  console.log(user)

  if(!user){
    return res.json({ ok: false, message: `User with email ${email} not found` })
  } else if(password !== user.password){
    return res.json({ ok: false, message: "Incorrect password" })
  } else {
    const token = jwt.sign(user, SECRET)
    res.cookie('token', token)
    return res.json({ ok: true, token })
  }
})

router.post('/signup', async (req, res) => {
  const { db : { collections }} = req.app.locals
  const { username, email, password } = req.body
  const user = {
    username,
    email,
    password,
    isDeleted: false,
    id: new ObjectID().toHexString()
  }
  
  await collections["users"].create(user)
  console.log(user)

  const token = jwt.sign(user, SECRET)
  res.cookie('token', token)
  return res.json({ ok: true, token })
})

router.get("/me", authMiddleware, (req, res) => {
  const { username, email, id, isDeleted } = req.user
  res.json({ id, username, email, isDeleted })
})

export {
  router,
  authMiddleware
}