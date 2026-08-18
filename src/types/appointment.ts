export type TreatmentId =
  | "general"
  | "cleaning"
  | "cosmetic"
  | "orthodontics"
  | "implants"
  | "not-sure";

export interface AppointmentTreatment {
  id: TreatmentId;
  number: string;
  name: string;
  description: string;
}

export type DentistAvailability = "available" | "limited" | "unavailable";

export interface AppointmentDentist {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  specialty: TreatmentId[];
  availability: DentistAvailability;
}

export interface AppointmentAvailability {
  date: string;
  label: string;
  slots: string[];
}

export interface AppointmentFormData {
  treatment: TreatmentId;
  date: string;
  time: string;
  dentistId: string;
  patientName: string;
  phone: string;
  email: string;
  message?: string;
  isNewPatient: boolean;
}

export interface AppointmentSubmitResponse {
  success: boolean;
  appointmentId?: string;
  error?: string;
}
