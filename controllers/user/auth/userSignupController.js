import bcrypt from 'bcrypt';
import User from '../../../models/userModel.js';
import { validationResult } from 'express-validator';
import createUserAuthTokenAndSetCookie from '../../../utils/createUserAuthTokenAndSetCookie.js';

const userSignUpController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password, name } = req.body;
  console.log(password);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'Email already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, name });

    await createUserAuthTokenAndSetCookie(String(newUser._id), newUser.email, res);

    res.status(201).json({ message: 'Signed Up Successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Could Not Sign Up' });
  }
};

export default userSignUpController;
