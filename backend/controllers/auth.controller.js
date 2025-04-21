import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body

  // 1. Validate input
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: "All fields are required." })
  }

  try {
    // 2. Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(409).json({ message: "Email is already in use." })
    }

    // 3. Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10)

    // 4. Create & save the user
    const newUser = new User({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: hashedPassword,
    })
    await newUser.save()

    // 5. Create a JWT (with expiry) and set cookie securely
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "2h" })
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

    res.status(201).json({
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
      },
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Internal server error." })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (!existingUser) {
      return res.status(409).json({ message: "User Not Found" })
    }

    const compare = bcryptjs.compare(password, existingUser.password)

    if (!compare) {
      return res.status(407).json({ message: "Password Incoreat" })
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "2h" })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

    res.status(201).json({
      user: {
        id: existingUser._id,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        email: existingUser.email,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Internal server error." })
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token")
    res.status(200).json({ message: "Logout successful." })
  } catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
}

export const checkAuth = async (req, res) => {
  console.log(req.user.id)
  try {
    res.status(200).json({ authentication: true })
  } catch (error) {
    res.status(500).json({ message: "Internal server error." })
  }
}
