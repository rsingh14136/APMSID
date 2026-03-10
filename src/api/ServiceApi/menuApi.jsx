import axiosClient from "./axiosClient";


export const getUserMenu = async (seatId, hospitalCode) => {
  try {
    const response = await axiosClient.get("/IMCS/auth/menus", {
      params: {
        seatId: seatId,
        hospitalCode: hospitalCode,
      },
    });

    return response.data;

  } catch (error) {
    console.error("Error fetching menu:", error);
    throw error;
  }
};