import type {
  AppointmentTreatment,
  AppointmentDentist,
} from "@/types/appointment";
import { team } from "@/data/team";

export const treatments: AppointmentTreatment[] = [
  {
    id: "general",
    number: "01",
    name: "General Dentistry",
    description: "Comprehensive care for your oral health.",
  },
  {
    id: "cleaning",
    number: "02",
    name: "Dental Cleaning",
    description: "Professional cleaning for a healthier smile.",
  },
  {
    id: "cosmetic",
    number: "03",
    name: "Cosmetic Dentistry",
    description: "Enhance your smile with natural-looking results.",
  },
  {
    id: "orthodontics",
    number: "04",
    name: "Orthodontics",
    description: "Thoughtful alignment solutions.",
  },
  {
    id: "implants",
    number: "05",
    name: "Dental Implants",
    description: "A lasting, natural-feeling replacement.",
  },
  {
    id: "not-sure",
    number: "06",
    name: "Not Sure",
    description: "Tell us what's bothering you — we'll guide you.",
  },
];

export const dentists: AppointmentDentist[] = [
  {
    id: "nadia",
    name: team[0].name,
    role: team[0].role,
    experience: team[0].experience,
    image: team[0].image,
    specialty: ["general", "cleaning", "not-sure"],
    availability: "available",
  },
  {
    id: "arya",
    name: team[1].name,
    role: team[1].role,
    experience: team[1].experience,
    image: team[1].image,
    specialty: ["orthodontics"],
    availability: "limited",
  },
  {
    id: "clara",
    name: team[2].name,
    role: team[2].role,
    experience: team[2].experience,
    image: team[2].image,
    specialty: ["cosmetic", "implants"],
    availability: "available",
  },
];

export const anyDentist: AppointmentDentist = {
  id: "any",
  name: "Any Dentist",
  role: "First available",
  experience: "",
  image: "",
  specialty: [
    "general",
    "cleaning",
    "cosmetic",
    "orthodontics",
    "implants",
    "not-sure",
  ],
  availability: "available",
};
