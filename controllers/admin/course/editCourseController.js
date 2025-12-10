import Course from '../../../models/courseModel.js';

export const editCourseController = async (req, res) => {
  const { courseId } = req.params;
  if (!courseId) {
    return res.status(404).json({ message: 'Course Id Is Not Provided' });
  }
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'No Course Found' });
    }
    // Update course with fields from req.body
    Object.assign(course, req.body.editingData);

    await course.save();

    return res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating course', error: error.message });
  }
};
