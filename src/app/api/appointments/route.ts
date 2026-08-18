import { NextRequest, NextResponse } from "next/server";
import type { AppointmentFormData } from "@/types/appointment";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<AppointmentFormData>;

  if (!body.treatment || !body.date || !body.time || !body.dentistId) {
    return NextResponse.json(
      { success: false, error: "Missing appointment selection." },
      { status: 400 },
    );
  }
  if (!body.patientName?.trim() || !body.phone?.trim()) {
    return NextResponse.json(
      { success: false, error: "Missing patient details." },
      { status: 400 },
    );
  }
  if (!body.email || !isValidEmail(body.email)) {
    return NextResponse.json(
      { success: false, error: "Invalid email address." },
      { status: 400 },
    );
  }

  // Mock persistence — swap for a real DB/CRM write later
  const appointmentId = `APT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  return NextResponse.json({ success: true, appointmentId });
}
