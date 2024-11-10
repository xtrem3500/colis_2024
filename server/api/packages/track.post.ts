import type { packageInfo, RelayPoint } from "~/types";

export default defineEventHandler(async (event) => {
  const { phone, reference } = await readBody(event);

  // Mock data - Replace with database query
  const packageInfo: packageInfo = {
    id: "1",
    reference,
    status: "in_transit",
    senderId: "1",
    receiverId: "2",
    relayPointId: "1",
    weight: 2.5,
    description: "Vêtements et accessoires",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const relayPoint: RelayPoint = {
    id: "1",
    name: "Paris Centre",
    address: "15 Rue de la Paix",
    city: "Paris",
    country: "France",
    managerId: "1",
    isActive: true,
    rentPeriod: {
      start: new Date("2024-01-01"),
      end: new Date("2024-12-31"),
    },
  };

  return {
    packageInfo,
    relayPoint: packageInfo.relayPointId ? relayPoint : null,
  };
});
