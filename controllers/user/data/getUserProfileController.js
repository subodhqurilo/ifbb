import User from '../../../models/userModel.js';

export const getUserProfileController = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(404).json({ message: 'User Id Not Provided' });
  }
  try {
    const userProfile = await User.findById(userId).select('-password');
    if (!userProfile) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    return res.json({ userProfile });
  } catch (error) {
    console.error('Error fetchign profile data', error);
    return res.status(500).json({ message: 'Could Not Fetch User Profile' });
  }
};
