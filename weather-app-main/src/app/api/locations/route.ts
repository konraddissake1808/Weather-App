import clientPromise from '@/app/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { fetchWeatherApi } from 'openmeteo';

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
      { city: locationData.city, country: locationData.country },
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

    /*const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
		return NextResponse.json({ error: 'Missing latitude or longitude parameters' }, { status: 400 });
	  }

    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { "User-Agent": "KonradWeatherApp/1.0 (konrad.dissakengandopro@yahoo.com)" } }
    );
    const geoData = await geoRes.json();
    const country = geoData.address?.country || null;
    
    const params = {
      "latitude": parseFloat(lat),
		  "longitude": parseFloat(lon),
      "timezone": "auto",};
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    const latitude = response.latitude();
	  const longitude = response.longitude();
    const timezone = response.timezone();

    const weatherData = {
      latitude,
			longitude,
      location: {
        timezone,
      }
    }

    const city = weatherData.location.timezone?.split('/')[1]?.replace('_', ' ') || '';*/

    /*const filter = { city: city, country: country };
    const existingLocation = await db.collection('geoLocations').findOne(filter);

    if (existingLocation) {
      return NextResponse.json({ message: 'Location already exists' }, { status: 200 });
    } else {
      const newLocation = {
        city: city,
        country: country,
        latitude: latitude,
        longitude: longitude,
        createdAt: new Date(),
      };
      const insertResult = await db.collection('geoLocations').insertOne(newLocation)
      console.log('Inserted location with ID:', insertResult.insertedId);
      return NextResponse.json({ message: 'Location added successfully' }, { status: 201 });    
    }*/

    
    
    /*console.log(`Upsert result: ${result}`);
    console.log(`Location: ${city}, ${country} at (${latitude}, ${longitude})`);
    if (result.upsertedCount > 0) {
      return NextResponse.json({ message: 'Location added successfully' }, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Location already exists' }, { status: 200 });
    }*/

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}