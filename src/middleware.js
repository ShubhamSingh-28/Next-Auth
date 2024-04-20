import { NextResponse, NextRequest } from "next/server";
const { getToken } = require("next-auth/jwt");

export async function middleware(req) {
  const authToken = req.cookies.get("next-auth.session-token")?.value;
  
  const loggedInUserNotAccessPath = req.nextUrl.pathname === "/login" || req.nextUrl.pathname =="/signup";

  if (loggedInUserNotAccessPath) {
    if (authToken) {
     return NextResponse.redirect(new URL("/", req.url));
    }
  }else{
    if (!authToken){
      return NextResponse.redirect(new URL("/login", req.url));
    }   
    }
  }

export const config = {
    matcher :["/", "/login", "/signup"]
  
};
