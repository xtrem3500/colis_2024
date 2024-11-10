export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "client" | "admin" | "point_relais";
  createdAt: Date;
}

export interface packageInfo {
  id: string;
  reference: string;
  status: "pending" | "in_transit" | "at_relay" | "delivered";
  senderId: string;
  receiverId: string;
  relayPointId?: string;
  weight: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RelayPoint {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  managerId: string;
  isActive: boolean;
  rentPeriod: {
    start: Date;
    end: Date;
  };
}
