import mongoose, { Schema, Document, models, Model } from 'mongoose';

// Mongoose Document interface (server-side)
// This interface extends mongoose.Document and is used for the schema and model.
export interface IFoodItem extends Document {
  name: string;
  barcode?: string;
  ingredients: string[];
  imageUrl?: string;
  source: string;
  tags: string[]; // e.g., ["halal", "vegan", "gluten_free"]
  allergens: string[]; // e.g., ["nuts", "soy", "dairy"]
  isSafeForDiabetics?: boolean;
  isSafeDuringPregnancy?: boolean;
  dietaryFlags?: string[];      // e.g., ["low_carb", "high_protein"]
  safetyScore?: number;         // e.g., 75 (out of 100)
  userNotes?: string;
  // createdAt and updatedAt are automatically managed by Mongoose timestamps
  // but defining them here makes the interface complete for type checking.
  createdAt: Date;
  updatedAt: Date;
}

// Plain TypeScript interface for client-side use and API responses
// This represents the data structure after it's fetched and serialized (e.g., from API)
// Note: _id and dates are strings here as they are typically serialized this way.
export interface FoodItemData {
  _id: string;
  name: string;
  barcode?: string;
  ingredients: string[];
  imageUrl?: string;
  source: string;
  tags: string[];
  allergens: string[];
  dietaryFlags?: string[];
  isSafeForDiabetics?: boolean;
  isSafeDuringPregnancy?: boolean;
  safetyScore?: number;
  userNotes?: string;
  createdAt: string; // Dates are typically stringified in JSON responses
  updatedAt: string;
}

// The Mongoose Schema definition using the IFoodItem interface
const FoodItemSchema: Schema<IFoodItem> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    barcode: { type: String, unique: true, sparse: true, trim: true }, // sparse allows multiple nulls if barcode is not present
    ingredients: [{ type: String, trim: true }],
    imageUrl: { type: String, trim: true },
    source: { type: String, required: true, trim: true }, // e.g., "Open Food Facts", "User Submission"
    tags: [{ type: String, trim: true, lowercase: true }],
    allergens: [{ type: String, trim: true, lowercase: true }],
    dietaryFlags: [{ type: String, trim: true, lowercase: true }],
    isSafeForDiabetics: { type: Boolean, default: false },
    isSafeDuringPregnancy: { type: Boolean, default: false },
    safetyScore: { type: Number, min: 0, max: 100 },
    userNotes: { type: String, trim: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Indexing for faster searches
FoodItemSchema.index({ name: 'text', ingredients: 'text' });
// FoodItemSchema.index({ barcode: 1 }); // Removed: unique:true on barcode field already creates this index
FoodItemSchema.index({ tags: 1 });
FoodItemSchema.index({ allergens: 1 });

// Prevent model recompilation in Next.js dev mode
const FoodItemModel: Model<IFoodItem> = models.FoodItem || mongoose.model<IFoodItem>('FoodItem', FoodItemSchema);

export default FoodItemModel;
