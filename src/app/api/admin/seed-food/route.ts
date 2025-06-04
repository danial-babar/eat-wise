import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import FoodItemModel, { FoodItemData } from '@/models/FoodItem'; // Use FoodItemModel and import FoodItemData

const sampleFoodItems: Array<Omit<FoodItemData, '_id' | 'createdAt' | 'updatedAt'>> = [
  {
    name: 'Organic Apples',
    barcode: '000000000001',
    ingredients: ['Organic Apples'],
    tags: ['fruit', 'organic', 'healthy'],
    allergens: [],
    dietaryFlags: ['vegan', 'gluten-free', 'halal', 'kosher', 'diabetic-friendly', 'pregnancy-safe'],
    safetyScore: 95,
    userNotes: 'Crisp and delicious. Great for snacking.',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800',
    source: 'Admin Seeded',
  },
  {
    name: 'Whole Wheat Bread',
    barcode: '000000000002',
    ingredients: ['Whole Wheat Flour', 'Water', 'Yeast', 'Salt', 'Sugar'],
    tags: ['bread', 'bakery', 'whole-grain'],
    allergens: ['gluten', 'wheat'],
    dietaryFlags: ['vegan', 'halal', 'kosher'],
    safetyScore: 80,
    userNotes: 'Good for sandwiches. Contains gluten.',
    imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=800',
    source: 'Admin Seeded',
  },
  {
    name: 'Almond Milk (Unsweetened)',
    barcode: '000000000003',
    ingredients: ['Water', 'Almonds', 'Calcium Carbonate', 'Sea Salt', 'Potassium Citrate', 'Sunflower Lecithin', 'Gellan Gum', 'Vitamin A Palmitate', 'Vitamin D2', 'D-Alpha-Tocopherol (Natural Vitamin E)'],
    tags: ['milk-alternative', 'dairy-free', 'vegan'],
    allergens: ['nuts', 'almonds'],
    dietaryFlags: ['vegan', 'gluten-free', 'dairy-free', 'halal', 'kosher', 'diabetic-friendly', 'pregnancy-safe'],
    safetyScore: 90,
    userNotes: 'Great alternative to dairy milk.',
    imageUrl: 'https://images.unsplash.com/photo-1620189507195-68309c04c4d0?q=80&w=800',
    source: 'Admin Seeded',
  },
  {
    name: 'Spicy Jalapeño Chips',
    barcode: '000000000004',
    ingredients: ['Potatoes', 'Vegetable Oil (Sunflower, Corn, and/or Canola Oil)', 'Jalapeño Seasoning (Maltodextrin [Made From Corn], Salt, Dextrose, Onion Powder, Torula Yeast, Spices, Whey, Paprika, Natural Flavors, Sunflower Oil, Garlic Powder, Jalapeño Pepper Powder, And Artificial Flavors)'],
    tags: ['snacks', 'chips', 'spicy'],
    allergens: ['dairy', 'milk'], // From Whey
    dietaryFlags: ['vegetarian', 'kosher'],
    safetyScore: 60,
    userNotes: 'Very spicy! Contains dairy.',
    imageUrl: 'https://images.unsplash.com/photo-1599490659273-495f3c17c1b2?q=80&w=800',
    source: 'Admin Seeded',
  },
  {
    name: 'Canned Chickpeas',
    barcode: '000000000005',
    ingredients: ['Prepared Chickpeas', 'Water', 'Salt', 'Calcium Chloride (Firming Agent)', 'Disodium EDTA (To Promote Color Retention)'],
    tags: ['legumes', 'canned-food', 'protein'],
    allergens: [],
    dietaryFlags: ['vegan', 'gluten-free', 'halal', 'kosher', 'diabetic-friendly', 'pregnancy-safe'],
    safetyScore: 88,
    userNotes: 'Versatile for salads, hummus, or stews.',
    imageUrl: 'https://images.unsplash.com/photo-1603513492128-ba7bc9b06358?q=80&w=800',
    source: 'Admin Seeded',
  }
];

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const existingBarcodes = sampleFoodItems.map(item => item.barcode);
    const existingItems = await FoodItemModel.find({ barcode: { $in: existingBarcodes } }).select('barcode').lean();
    const existingItemBarcodes = new Set(existingItems.map(item => item.barcode));

    const newItemsToInsert = sampleFoodItems.filter(item => !existingItemBarcodes.has(item.barcode));

    let insertedCount = 0;
    if (newItemsToInsert.length > 0) {
      const result = await FoodItemModel.insertMany(newItemsToInsert, { ordered: false });
      insertedCount = result.length;
    }

    const alreadyExistedCount = sampleFoodItems.length - insertedCount;

    return NextResponse.json({
      message: `Food items seeded successfully. Inserted: ${insertedCount} new items. ${alreadyExistedCount} items already existed.`,
      inserted: insertedCount,
      alreadyExisted: alreadyExistedCount,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error seeding food items:', error);
    return NextResponse.json({ message: 'Error seeding food items', error: error.message }, { status: 500 });
  }
}

// To prevent GET requests or other methods from being used if not defined
export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
