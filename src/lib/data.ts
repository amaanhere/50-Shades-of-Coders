export const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español (Spanish)' },
  { value: 'fr', label: 'Français (French)' },
  { value: 'de', label: 'Deutsch (German)' },
  { value: 'sw', label: 'Kiswahili (Swahili)' },
  { value: 'hi', label: 'हिन्दी (Hindi)' },
  { value: 'zh', label: '中文 (Chinese)' },
  { value: 'ar', label: 'العربية (Arabic)' },
];

export const specialties = [
  { value: 'general', label: 'General Practice' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'oncology', label: 'Oncology' },
  { value: 'psychiatry', label: 'Psychiatry' },
];

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  location: string;
  rating: number;
  reviews: number;
  availability: string;
  image: string;
}

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Alice Smith',
    specialty: 'Cardiology',
    languages: ['English', 'Spanish'],
    location: 'New York, USA',
    rating: 4.8,
    reviews: 120,
    availability: 'Mon, Wed, Fri',
    image: 'https://picsum.photos/seed/doctor1/200/200',
  },
  {
    id: '2',
    name: 'Dr. Bob Johnson',
    specialty: 'Dermatology',
    languages: ['English', 'French'],
    location: 'London, UK',
    rating: 4.5,
    reviews: 95,
    availability: 'Tue, Thu',
    image: 'https://picsum.photos/seed/doctor2/200/200',
  },
  {
    id: '3',
    name: 'Dr. Carol Williams',
    specialty: 'Pediatrics',
    languages: ['English', 'German'],
    location: 'Berlin, Germany',
    rating: 4.9,
    reviews: 200,
    availability: 'Mon - Fri',
    image: 'https://picsum.photos/seed/doctor3/200/200',
  },
  {
    id: '4',
    name: 'Dr. David Brown',
    specialty: 'Neurology',
    languages: ['English'],
    location: 'Toronto, Canada',
    rating: 4.7,
    reviews: 150,
    availability: 'Mon, Tue, Thu',
    image: 'https://picsum.photos/seed/doctor4/200/200',
  },
  {
    id: '5',
    name: 'Dr. Eve Davis',
    specialty: 'General Practice',
    languages: ['English', 'Swahili'],
    location: 'Nairobi, Kenya',
    rating: 4.6,
    reviews: 80,
    availability: 'Wed, Fri, Sat',
    image: 'https://picsum.photos/seed/doctor5/200/200',
  },
];

export const userRoles = [
  { value: 'patient', label: 'Patient' },
  { value: 'doctor', label: 'Doctor' },
];
