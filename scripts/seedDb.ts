import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FoodItemModel, { IFoodItem } from '../src/models/FoodItem'; // Adjust path as necessary

// Load environment variables from .env file
dotenv.config({ path: './.env' }); // Ensure .env is at the root or adjust path

const dummyFoodItems: Partial<IFoodItem>[] = [
  {
    name: 'Chicken Salad Sandwich',
    barcode: '000000000001',
    ingredients: ['Whole Wheat Bread', 'Cooked Chicken Breast', 'Mayonnaise', 'Celery', 'Lettuce', 'Salt', 'Black Pepper'],
    imageUrl: 'https://images.unsplash.com/photo-1553909489-cd47e0907910?q=80&w=1920&auto=format&fit=crop',
    source: 'Dummy Data Generator',
    tags: ['sandwich', 'lunch'],
    allergens: ['gluten', 'eggs'],
    dietaryFlags: ['high_protein'],
    isSafeForDiabetics: false,
    isSafeDuringPregnancy: true,
    safetyScore: 70,
    userNotes: 'A classic chicken salad sandwich on whole wheat.'
  },
  {
    name: 'Vegan Lentil Soup',
    barcode: '000000000002',
    ingredients: ['Lentils', 'Vegetable Broth', 'Carrots', 'Celery', 'Onion', 'Garlic', 'Olive Oil', 'Turmeric', 'Cumin', 'Salt', 'Pepper'],
    imageUrl: 'https://images.unsplash.com/photo-1593253799390-997930244953?q=80&w=1920&auto=format&fit=crop',
    source: 'Dummy Data Generator',
    tags: ['soup', 'vegan', 'healthy'],
    allergens: [],
    dietaryFlags: ['vegan', 'gluten_free', 'high_fiber', 'low_fat'],
    isSafeForDiabetics: true,
    isSafeDuringPregnancy: true,
    safetyScore: 95,
    userNotes: 'Hearty and healthy vegan lentil soup, packed with vegetables.'
  },
  {
    name: 'Spicy Mango Salsa',
    barcode: '000000000003',
    ingredients: ['Mango', 'Red Onion', 'Jalapeno', 'Cilantro', 'Lime Juice', 'Salt'],
    imageUrl: 'https://images.unsplash.com/photo-1600699805908-355a60a71087?q=80&w=1920&auto=format&fit=crop',
    source: 'Dummy Data Generator',
    tags: ['salsa', 'snack', 'spicy', 'vegan'],
    allergens: [],
    dietaryFlags: ['vegan', 'gluten_free', 'low_fat', 'paleo'],
    isSafeForDiabetics: true, // in moderation
    isSafeDuringPregnancy: true,
    safetyScore: 90,
    userNotes: 'Sweet and spicy mango salsa, perfect with chips or as a topping.'
  },
  {
    name: 'Chocolate Chip Cookies (Pack of 6)',
    barcode: '000000000004',
    ingredients: ['Wheat Flour', 'Chocolate Chips', 'Butter', 'Sugar', 'Brown Sugar', 'Eggs', 'Vanilla Extract', 'Baking Soda', 'Salt'],
    imageUrl: 'https://images.unsplash.com/photo-1593253799390-997930244953?q=80&w=1920&auto=format&fit=crop', // Placeholder, update if needed
    source: 'Dummy Data Generator',
    tags: ['cookies', 'dessert', 'snack'],
    allergens: ['gluten', 'dairy', 'eggs'],
    dietaryFlags: ['vegetarian'],
    isSafeForDiabetics: false,
    isSafeDuringPregnancy: true, // in moderation
    safetyScore: 40,
    userNotes: 'Classic homemade-style chocolate chip cookies.'
  }
];

async function seedDatabase() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('Error: MONGODB_URI is not defined in your .env file.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Successfully connected to MongoDB.');

    // Optional: Clear existing data (use with caution!)
    // console.log('Clearing existing food items...');
    // await FoodItemModel.deleteMany({});
    // console.log('Existing food items cleared.');

    console.log('Inserting dummy food items...');
    // Using create for individual middleware execution (if any)
    // For bulk inserts without middleware, FoodItemModel.insertMany(dummyFoodItems) is faster.
    for (const item of dummyFoodItems) {
      // Check if item with the same barcode already exists
      const existingItem = await FoodItemModel.findOne({ barcode: item.barcode });
      if (existingItem) {
        console.log(`Food item with barcode ${item.barcode} (${item.name}) already exists. Skipping.`);
      } else {
        await FoodItemModel.create(item);
        console.log(`Inserted: ${item.name} (Barcode: ${item.barcode})`);
      }
    }
    console.log('Dummy food items inserted successfully.');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedDatabase();
