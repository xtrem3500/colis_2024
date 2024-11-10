export const usepackageInfos = () => {
  const trackpackageInfo = async (phone: string, reference: string) => {
    try {
      const { packageInfo: pkg, relayPoint } = await $fetch(
        "/api/packageInfos/track",
        {
          method: "POST",
          body: { phone, reference },
        }
      );
      return { packageInfo: pkg, relayPoint };
    } catch (error) {
      console.error("Error tracking packageInfo:", error);
      throw new Error("Impossible de trouver le colis");
    }
  };

  return {
    trackpackageInfo,
  };
};
