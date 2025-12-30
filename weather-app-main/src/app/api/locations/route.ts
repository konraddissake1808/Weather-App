import clientPromise from '@/app/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

  try {
    const client = await clientPromise;
    const db = client.db('weather_now_db');
    
    const data = await db.collection('geoLocations').find({}).toArray();

    
    return Response.json(data);
  } catch (e) {
    console.error(e);
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const locationData = await request.json();
    const client = await clientPromise;
    const db = client.db('weather_now_db');
    await db.collection('geoLocations').updateOne(
      { city: locationData.city, country: locationData.country},
      {
        $setOnInsert: {city : locationData.city,
          country: locationData.country,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          createdAt: new Date(),},
      }
      , { upsert: true }
    );
    return NextResponse.json({ message: 'Location added successfully' }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}