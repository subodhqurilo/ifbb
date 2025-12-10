import User from '../../../models/userModel.js';
import '../../../models/courseModel.js';
const userPurchasedCoursesController = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(404).json({ message: 'User Id Not Provided' });
    return;
  }
  try {
    const userPurchasedCourses = await User.findById(userId)
      .select('purchasedCourses')
      .populate('purchasedCourses');
    return res.json({ userPurchasedCourses });
  } catch (error) {
    console.error('User Data Error', error);
    res.status(500).json({ message: 'Could Not Fetch Users Data' });
  }
};
export default userPurchasedCoursesController;
