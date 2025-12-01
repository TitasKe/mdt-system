import { Civilian, Vehicle, Incident, Warrant, Bolo, Status, RecordType } from '../types';

export const MOCK_OFFICER = {
  badge: '492',
  name: 'John Spartan',
  rank: 'Sergeant',
  department: 'LSPD',
  callsign: '1-L-12'
};

export const CIVILIANS: Civilian[] = [
  {
    id: '1001',
    firstName: 'Niko',
    lastName: 'Bellic',
    dob: '1978-04-12',
    gender: 'Male',
    height: "6'1\"",
    hairColor: 'Brown',
    eyeColor: 'Hazel',
    address: '123 Broker Ave, Liberty City',
    phoneNumber: '555-0100',
    image: 'https://picsum.photos/200/300?random=1',
    warrants: [],
    licenses: [{ type: 'Driver', status: 'Valid' }, { type: 'Weapon', status: 'Revoked' }]
  },
  {
    id: '1002',
    firstName: 'Trevor',
    lastName: 'Philips',
    dob: '1968-11-14',
    gender: 'Male',
    height: "6'0\"",
    hairColor: 'Balding',
    eyeColor: 'Brown',
    address: 'Sandy Shores Trailer Park',
    phoneNumber: '555-0199',
    image: 'https://picsum.photos/200/300?random=2',
    warrants: [
      {
        id: 'W-2023-001',
        personId: '1002',
        reason: 'Aggravated Assault',
        issuedDate: '2023-10-15',
        expiryDate: '2025-10-15',
        severity: 'Felony',
        status: Status.ACTIVE
      }
    ],
    licenses: [{ type: 'Driver', status: 'Suspended' }]
  }
];

export const VEHICLES: Vehicle[] = [
  {
    plate: '46EEK572',
    make: 'Karin',
    model: 'Sultan',
    color: 'Blue',
    ownerId: '1001',
    status: Status.ACTIVE,
    image: 'https://picsum.photos/400/200?random=3',
    registrationDate: '2023-01-01',
    insuranceStatus: 'Valid'
  },
  {
    plate: '24KRT001',
    make: 'Canis',
    model: 'Bodhi',
    color: 'Red',
    ownerId: '1002',
    status: Status.STOLEN,
    image: 'https://picsum.photos/400/200?random=4',
    registrationDate: '2022-05-15',
    insuranceStatus: 'Expired'
  }
];

export const INCIDENTS: Incident[] = [
  {
    id: 'INC-2023-882',
    title: 'Store Robbery - LTD Gasoline',
    date: '2023-10-25 14:30',
    officerId: '492',
    details: 'Suspect entered store brandishing a pistol. Took $400 cash.',
    involvedPersons: [{ personId: '1002', role: 'Suspect' }],
    type: 'Robbery'
  },
  {
    id: 'INC-2023-885',
    title: 'Traffic Stop - Speeding',
    date: '2023-10-26 09:15',
    officerId: '492',
    details: 'Vehicle clocked at 85mph in a 45mph zone.',
    involvedPersons: [{ personId: '1001', role: 'Suspect' }],
    type: 'Traffic'
  }
];

export const BOLOS: Bolo[] = [
  {
    id: 'B-101',
    type: 'Vehicle',
    description: 'Red Canis Bodhi, Plate 24KRT001. Suspect armed and dangerous.',
    priority: 'High',
    timestamp: '2 hours ago'
  },
  {
    id: 'B-102',
    type: 'Person',
    description: 'Male, wearing clown mask, seen near Maze Bank Arena.',
    priority: 'Medium',
    timestamp: '5 hours ago'
  }
];
