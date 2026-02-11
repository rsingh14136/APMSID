const BASE_URL = "http://localhost:8081/DWH_SERVICES/projectedDemandRequestTrans";



export const getStoreNameCombo = async () => {
  const res = await fetch(`${BASE_URL}/init`);
  if (!res.ok) throw new Error("Failed to fetch group list");
  return res.json();
};

export const getProgName = async () => {
  const res = await fetch(`${BASE_URL}/PROGNAME`);
  if (!res.ok) throw new Error("Failed to fetch PROGNAME list");
  return res.json();
};
export const getDemandType = async (finYear, storeId) => {
  const res = await fetch(
    `${BASE_URL}/DEMANDTYPE?strIndentPeriodValue=${encodeURIComponent(finYear)}&storeId=${storeId}`,

  );
  if (!res.ok) throw new Error("Failed to fetch Demand Type");
  return res.text(); // ✅ TEXT, NOT JSON
};

export const getExistingDetail = async (finYear, storeId) => {
  const res = await fetch(
    `${BASE_URL}/GETEXISTINGREQDTL?financialYear=${encodeURIComponent(finYear)}&storeId=${storeId}`,

  );
  if (!res.ok) throw new Error("Failed to fetch Existing Detail");
  return res.text(); // ✅ TEXT
};

export const getDeleteDetail = async (finYear,notificationNo, storeId) => {
  const res = await fetch(
    `${BASE_URL}/delete-details?strIndentPeriodValue=${encodeURIComponent(finYear)}&notificationNo=${notificationNo}&storeId=${storeId}`,

  );
  if (!res.ok) throw new Error("Failed to fetch Existing Detail");
  return res.text(); // ✅ TEXT
};

export const getExtendDetail = async (finYear,notificationNo, storeId) => {
  const res = await fetch(
    `${BASE_URL}/delete-details?strIndentPeriodValue=${encodeURIComponent(finYear)}&notificationNo=${notificationNo}&storeId=${storeId}`,

  );
  if (!res.ok) throw new Error("Failed to fetch Existing Detail");
  return res.text(); // ✅ TEXT
};
export const getViewDetail = async (finYear,notificationNo, storeId) => {
  const res = await fetch(
    `${BASE_URL}/viewDetails?strIndentPeriodValue=${encodeURIComponent(finYear)}&notificationNo=${notificationNo}&storeId=${storeId}`,

  );
  if (!res.ok) throw new Error("Failed to fetch Existing Detail");
  return res.text(); // ✅ TEXT
};


