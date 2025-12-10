import mongoose, { Schema } from 'mongoose';

const ModuleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Module title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Module description is required'],
  },
  type: {
    type: String,
    enum: ['video', 'pdf'],
    required: [true, 'Module type is required'],
  },
  assetLink: {
    type: String,
    required: [true, 'Asset link is required'],
  },
});

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    courseThumbnail: {
      type: String,
      required: [true, 'Thumbnail For The Course Is Required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be at least 0'],
      validate: {
        validator: Number.isFinite,
        message: 'Price must be a valid number',
      },
    },
    discountedPrice: {
      type: Number,
      min: [0, 'Discounted price must be at least 0'],
      validate: {
        validator: function (value) {
          return value == null || value < this.price;
        },
        message: 'Discounted price must be less than the original price',
      },
    },
    purchasedByHowMuch: {
      type: Number,
      default: 0,
    },
    modules: {
      type: [ModuleSchema],
      // validate: [(arr) => arr.length > 0, 'At least one module is required'],
    },
    durationToComplete: {
      type: Number,
      required: [true, 'Duration to complete is required'],
      min: [10, 'Duration must be at least 10 minutes'],
    },
    ratings: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        value: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
        review: { type: String },
      },
    ],
    isPublic: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

const Course = mongoose.model('Course', CourseSchema);
export default Course;
