// /app/api/add-property/route.js
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cloudinary from "@/config/cloudinary";

export async function POST(req) {
  await connectDB();

  const formData = await req.formData();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "No token found, user is not authenticated" },
      { status: 401 }
    );
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const userId = decodedToken.id;
  if (!userId) {
    return NextResponse.json(
      { error: "User ID is missing from token" },
      { status: 400 }
    );
  }

  // Handle amenities & images
  const amenities = formData.getAll("amenities");
  const images = formData.getAll("images").filter((image) => image.name !== "");

  const propertyData = {
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
      nightly: formData.get("rates.nightly."),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    owner: userId,
  };

  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    const imageBase64 = imageData.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: "propertypulse",
      }
    );

    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  return NextResponse.json(
    { message: "Property added", id: newProperty._id },
    { status: 201 }
  );
}
