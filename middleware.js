import { NextResponse } from "next/server";
const { getToken } = require("next-auth/jwt");

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const publicPath = path === "/login" || path === "/signup";
  
  if (publicPath && token) {
    return NextResponse.redirect(new URL("/"));
  }
  if (!publicPath && !token) {
    return NextResponse.redirect(new URL("/signup"));
  }
  
  // If the request doesn't match any conditions, continue without redirection
  return NextResponse.next();
}

export const config = {
    matcher :["/","/about", "/login", "/signup"]
  // Specify the paths to which this middleware should be applied
  // The middleware should apply to all paths, so remove the explicit matcher
};
