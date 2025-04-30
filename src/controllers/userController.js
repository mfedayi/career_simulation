const { prisma } = require("../utils/common");

const {
  hashPassword,
  comparePassword,
  createToken,
} = require("../utils/authHelpers");

//Post /api/users/register
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "This email is already taken" });
    }
    const hashedPassword = await hashPassword(password);

    // Create user in DB
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Auto-login after register (by creating token)
    const token = createToken({ id: user.id });

    //Send token back to client side
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

//Post /api/users/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "please enter credintials" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.staus(400).json({ error: "invalid credintials" });
    }

    const isPassMatch = await comparePassword(password, user.password);
    console.log("password saved in db:", user.password);
    if (!isPassMatch) {
      return res.status(400).json({ error: "invalid credintials" });
    }

    //token for authenticated user
    const token = createToken({ id: user.id });
    res.json(token);
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
