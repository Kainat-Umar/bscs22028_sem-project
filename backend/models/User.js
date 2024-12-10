import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for a User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware to hash the password before saving the user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // If the password wasn't modified, just proceed
  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare the hashed password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
