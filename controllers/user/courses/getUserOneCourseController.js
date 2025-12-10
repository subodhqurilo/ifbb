import Course from '../../../models/courseModel.js';
import User from '../../../models/userModel.js';

export const getUserOneCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.userId; // populated via auth middleware

    const course = await Course.findById(courseId).lean();
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(userId).select('purchasedCourses');

    const hasPurchased = user?.purchasedCourses.some(
      (purchasedId) => purchasedId.toString() === courseId,
    );

    // Add purchase flag
    course.hasPurchased = hasPurchased;

    // // If not purchased, exclude assetLink from modules
    // if (!hasPurchased) {
    //   course.modules = course.modules.map(({ title, type, description }) => ({
    //     title,
    //     type,
    //     description,
    //   }));
    // }

    return res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
