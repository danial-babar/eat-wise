import { NextResponse, NextRequest } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import FoodItemModel from '@/models/FoodItem';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ message: 'Search query is required' }, { status: 400 });
    }

    await connectMongoDB();

    // Case-insensitive search on name and ingredients
    // We can also add barcode or tags if needed in the future
    const searchRegex = new RegExp(query, 'i'); 

    const foodItems = await FoodItemModel.find({
      $or: [
        { name: { $regex: searchRegex } },
        { ingredients: { $regex: searchRegex } },
        // { tags: { $regex: searchRegex } } // Optionally search tags
        { barcode: query } // Allow exact barcode match
      ],
    }).limit(20); // Limit results to prevent overload, add pagination later if needed

    return NextResponse.json({
      message: 'Food items fetched successfully based on search query',
      data: foodItems,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error searching food items:', error);
    return NextResponse.json({ message: 'Error searching food items', error: error.message }, { status: 500 });
  }
}
