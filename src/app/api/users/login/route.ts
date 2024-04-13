import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";

import jwt from "jsonwebtoken";

// connect to database
connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }
    // check if password is correct

    const verifiedPassword = await bcryptjs.compare(password, user.password);

    if (!verifiedPassword) {
      return NextResponse.json(
        { error: "Password does not matched" },
        { status: 404 }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Successfully Login",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
