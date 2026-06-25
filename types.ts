
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: ServiceCategory;
}

export enum ServiceCategory {
  LAUNDRY = 'Laundry & Dry Cleaning',
  CLEANING = 'Home Cleaning',
  FUMIGATION = 'Fumigation',
  LOGISTICS = 'Moving & Deliveries'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
