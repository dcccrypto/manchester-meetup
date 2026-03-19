import { NextRequest, NextResponse } from "next/server";

// Simple in-memory store for registrations (persists for the lifetime of the serverless function)
// In production, this writes to Vercel's edge config or a simple log
const registrations: Array<Record<string, string>> = [];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const entry = {
      ...data,
      timestamp: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") || "unknown",
    };
    registrations.push(entry);
    
    // Log to console (visible in Vercel function logs)
    console.log("[REGISTRATION]", JSON.stringify(entry));
    
    return NextResponse.json({ ok: true, message: "Registration received" });
  } catch (err) {
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  // Simple endpoint to view registrations (basic auth should be added in production)
  return NextResponse.json({ count: registrations.length, registrations });
}
