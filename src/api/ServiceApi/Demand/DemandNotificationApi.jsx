import axiosClient from "../axiosClient";


const BASE_URL = "/DWH_SERVICES/projectedDemandRequestTrans";

// ================= STORE NAME =================
export const getStoreNameCombo = async () => {
  const res = await axiosClient.get(`${BASE_URL}/init`);
  return res.data;
};

// ================= PROGRAM NAME =================
export const getProgName = async () => {
  const res = await axiosClient.get(`${BASE_URL}/PROGNAME`);
  return res.data;
};

// ================= DEMAND TYPE =================
export const getDemandType = async (finYear, storeId) => {
  const res = await axiosClient.get(`${BASE_URL}/DEMANDTYPE`, {
    params: {
      strIndentPeriodValue: finYear,
      storeId: storeId,
    },
    responseType: "text", // ✅ because backend returns TEXT
  });

  return res.data;
};

// ================= EXISTING DETAILS =================
export const getExistingDetail = async (finYear, storeId) => {
  const res = await axiosClient.get(`${BASE_URL}/GETEXISTINGREQDTL`, {
    params: {
      financialYear: finYear,
      storeId: storeId,
    },
    responseType: "text",
  });

  return res.data;
};

// ================= DELETE DETAIL =================
export const getDeleteDetail = async (
  finYear,
  notificationNo,
  storeId
) => {
  const res = await axiosClient.get(`${BASE_URL}/delete-details`, {
    params: {
      strIndentPeriodValue: finYear,
      notificationNo,
      storeId,
    },
    responseType: "text",
  });

  return res.data;
};

// ================= EXTEND DETAIL =================
export const getExtendDetail = async (
  finYear,
  notificationNo,
  storeId
) => {
  const res = await axiosClient.get(`${BASE_URL}/delete-details`, {
    params: {
      strIndentPeriodValue: finYear,
      notificationNo,
      storeId,
    },
    responseType: "text",
  });

  return res.data;
};

// ================= VIEW DETAIL =================
export const getViewDetail = async (
  finYear,
  notificationNo,
  storeId
) => {
  const res = await axiosClient.get(`${BASE_URL}/viewDetails`, {
    params: {
      strIndentPeriodValue: finYear,
      notificationNo,
      storeId,
    },
    responseType: "text",
  });

  return res.data;
};

// ================= EXTEND DEMAND =================
export const extendDemandRequest = async (payload) => {
  const res = await axiosClient.post(`${BASE_URL}/extend`, payload);
  return res.data;
};

// ================= DELETE DEMAND =================
export const deleteDemand = async (payload) => {
  const res = await axiosClient.post(`${BASE_URL}/delete`, payload);
  return res.data;
};

// ================= SAVE PROJECTED DEMAND =================
export const saveProjectedDemand = async (formData) => {
  const res = await axiosClient.post(`${BASE_URL}/save`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};