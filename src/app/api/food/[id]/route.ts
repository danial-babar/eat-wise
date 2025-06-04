import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import FoodItemModel from '@/models/FoodItem';
import mongoose from 'mongoose';

interface Params {
  id: string;
}

export async function GET(request: NextRequest, context: { params: Params }) {
  const { id } = context.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid food item ID' }, { status: 400 });
  }

  try {
    await connectMongoDB();

    const foodItem = await FoodItemModel.findById(id);

    if (!foodItem) {
      return NextResponse.json({ message: 'Food item not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Food item fetched successfully',
      data: foodItem 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching food item:', error);
    return NextResponse.json({ message: 'Error fetching food item', error: error.message }, { status: 500 });
  }
}
