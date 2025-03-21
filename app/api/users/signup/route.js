import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bycriptjs from "bcryptjs";

connectDB();
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, password, email } = reqBody;

    //check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //  hash password
    const salt = await bycriptjs.genSalt(10);
    const hashedPassword = await bycriptjs.hash(password, salt);

    const user = new User({
      password: hashedPassword,
      email,
      username,
    });

    const savedUser = await user.save();

    return NextResponse.json(
      { message: "User created successfully", savedUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
