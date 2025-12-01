export enum RecordType {
  ARREST = 'Arrest',
  CITATION = 'Citation',
  WARNING = 'Warning',
  WARRANT = 'Warrant'
}

export enum Status {
  ACTIVE = 'Active',
  CLOSED = 'Closed',
  PENDING = 'Pending',
  STOLEN = 'Stolen',
  WANTED = 'Wanted'
}

export interface Civilian {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  height: string;
  hairColor: string;
  eyeColor: string;
  address: string;
  phoneNumber: string;
  image: string;
  warrants: Warrant[];
  licenses: { type: string; status: 'Valid' | 'Suspended' | 'Revoked' }[];
}

export interface Vehicle {
  plate: string;
  model: string;
  make: string;
  color: string;
  ownerId: string;
  status: Status;
  image: string;
  registrationDate: string;
  insuranceStatus: 'Valid' | 'Expired' | 'None';
}

export interface Incident {
  id: string;
  title: string;
  date: string;
  officerId: string;
  details: string;
  involvedPersons: { personId: string; role: 'Suspect' | 'Victim' | 'Witness' }[];
  type: string;
}

export interface Warrant {
  id: string;
  personId: string;
  reason: string;
  issuedDate: string;
  expiryDate: string;
  severity: 'Misdemeanor' | 'Felony';
  status: Status;
}

export interface Bolo {
  id: string;
  type: 'Person' | 'Vehicle' | 'Property';
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  timestamp: string;
}

export interface Officer {
  badge: string;
  name: string;
  rank: string;
  department: string;
  callsign: string;
}
