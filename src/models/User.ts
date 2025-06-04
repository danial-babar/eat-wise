import mongoose, { Schema, Document, models, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUserPreferences {
  isMuslim?: boolean;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isDiabetic?: boolean;
  isPregnant?: boolean;
  avoidsGluten?: boolean;
  allergies?: string[];
}

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string; // Optional because of OAuth
  authProvider: 'credentials' | 'google' | 'firebase'; // Example providers
  authProviderId?: string; // ID from the OAuth provider
  preferences: IUserPreferences;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  // Method to compare passwords
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      minlength: 3,
      maxlength: 30
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true, 
      match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      // Required if authProvider is 'credentials'
      required: function(this: IUser) { return this.authProvider === 'credentials'; },
      minlength: 6
    },
    authProvider: {
      type: String,
      enum: ['credentials', 'google', 'firebase'],
      default: 'credentials',
      required: true,
    },
    authProviderId: { type: String, unique: true, sparse: true },
    preferences: {
      isMuslim: { type: Boolean, default: false },
      isVegan: { type: Boolean, default: false },
      isVegetarian: { type: Boolean, default: false },
      isDiabetic: { type: Boolean, default: false },
      isPregnant: { type: Boolean, default: false },
      avoidsGluten: { type: Boolean, default: false },
      allergies: [{ type: String, trim: true, lowercase: true }],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash password if it's modified (or new) and provider is 'credentials'
UserSchema.pre<IUser>('save', async function (next) {
  // Only hash the password if it has been modified (or is new) and authProvider is 'credentials'
  if (!this.isModified('password') || this.authProvider !== 'credentials' || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password || this.authProvider !== 'credentials') {
    return false; // Or throw an error, depending on how you want to handle this case
  }
  return bcrypt.compare(candidatePassword, this.password);
};

// Indexing
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

const User: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
