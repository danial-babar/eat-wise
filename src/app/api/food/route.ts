import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import FoodItemModel, { FoodItemData } from '@/models/FoodItem'; // Use FoodItemModel and FoodItemData if needed for typing response
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
console.log('Attempting to configure Cloudinary (global scope)...');
console.log('CLOUDINARY_NAME (global):', process.env.CLOUDINARY_NAME);
console.log('CLOUDINARY_API_KEY (global):', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET (global):', process.env.CLOUDINARY_API_SECRET ? 'Exists' : 'MISSING or Empty'); // Avoid logging secret directly

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(request: Request) {
  try {
    await connectMongoDB();

    // For now, let's fetch all food items. 
    // In a real app, you'd want pagination, filtering, and searching here.
    const foodItems = await FoodItemModel.find({}).sort({ createdAt: -1 }); // Sort by newest first

    return NextResponse.json({ 
      message: 'Food items fetched successfully',
      data: foodItems 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching food items:', error);
    return NextResponse.json({ message: 'Error fetching food items', error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.log('Attempting to configure Cloudinary...');
      console.log('CLOUDINARY_NAME:', process.env.CLOUDINARY_NAME);
      console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
      console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Exists' : 'MISSING or Empty'); // Avoid logging secret directly

      console.error('Cloudinary environment variables are not set.');
      return NextResponse.json({ message: 'Server configuration error: Image upload service not available.' }, { status: 500 });
    }

    const formData = await request.formData();

    const name = formData.get('name') as string;
    const ingredientsString = formData.get('ingredients') as string;

    // Basic validation
    if (!name || !ingredientsString) {
      return NextResponse.json({ message: 'Name and ingredients are required fields.' }, { status: 400 });
    }

    const imageFile = formData.get('imageFile') as File | null;
    let imageUrl = '';

    if (imageFile) {
      try {
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        const base64Image = imageBuffer.toString('base64');
        const dataUri = `data:${imageFile.type};base64,${base64Image}`;

        const uploadResponse = await cloudinary.uploader.upload(dataUri, {
          folder: 'eat-wise-app', // Optional: organize in a folder
          // resource_type: 'image', // auto-detects usually
        });
        imageUrl = uploadResponse.secure_url;
      } catch (uploadError: any) {
        console.error('Cloudinary upload error:', uploadError);
        return NextResponse.json({ message: `Image upload failed: ${uploadError.message || 'Unknown Cloudinary error'}` }, { status: 500 });
      }
    }

    const ingredientsArray = (ingredientsString && ingredientsString.trim() !== '')
      ? ingredientsString.split(',').map((item: string) => item.trim()).filter((item: string) => item !== '')
      : [];

    const newFoodItemData: Partial<FoodItemData> = {
      name,
      barcode: formData.get('barcode') as string || undefined,
      ingredients: ingredientsArray,
      imageUrl: imageUrl, // Use Cloudinary URL or empty if no upload
      source: formData.get('source') as string || '',
      tags: formData.getAll('tags') as string[] || [],
      allergens: formData.getAll('allergens') as string[] || [],
      // dietaryFlags and safetyScore are not currently sent by the form, will use Mongoose defaults
      isSafeForDiabetics: formData.get('isSafeForDiabetics') === 'true',
      isSafeDuringPregnancy: formData.get('isSafeDuringPregnancy') === 'true',
      userNotes: formData.get('userNotes') as string || '',
    };

    const newFoodItem = await FoodItemModel.create(newFoodItemData);
    
    return NextResponse.json({ message: 'Food item created successfully!', data: newFoodItem }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating food item:', error);
    if (error.code === 11000) {
      return NextResponse.json({ message: 'Error creating food item: A food item with this barcode already exists.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Error creating food item.', error: error.message }, { status: 500 });
  }
}
