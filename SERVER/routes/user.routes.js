import { Router } from 'express'
import { register, login, getProfile, logout } from '../controller/user.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/register', register)
router.post("/login", login)
router.get("/me", isLoggedIn, getProfile)
router.get("/logout", isLoggedIn, logout)

export default router