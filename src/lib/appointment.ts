import type {
  AppointmentAvailability,
  AppointmentFormData,
  AppointmentSubmitResponse,
} from "@/types/appointment";

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const ALL_SLOTS = [
  "09:00",
  "09:30",
  "10:30",
  "11:00",
  "13:00",
  "13:30",
  "14:30",
  "15:00",
  "16:00",
  "17:00",
];

// Mock generator — replace body with `fetch("/api/appointments/availability")` later
export async function getAppointmentAvailability(): Promise<
  AppointmentAvailability[]
> {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return {
      date: d.toISOString().split("T")[0],
      label: `${DAY_NAMES[d.getDay()]} ${d.getDate()}`,
      slots: ALL_SLOTS.filter((_, idx) => (idx + i) % 3 !== 0),
    };
  });
}

export async function submitAppointment(
  data: AppointmentFormData,
): Promise<AppointmentSubmitResponse> {
  const res = await fetch("/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
