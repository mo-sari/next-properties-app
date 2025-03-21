import { NextResponse } from "next/server";

export async function GET() {
  console.log("logout endpoint was called");
  try {
    const response = NextResponse.json({
      message: "logout successfull",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (err) {
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}
