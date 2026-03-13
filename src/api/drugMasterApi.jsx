import axiosClient from "./ServiceApi/axiosClient";


const BASE_URL = "/DWH_MASTERS/DrugMst";

export const getDrugList = async () => {
  const res = await axiosClient.get(`${BASE_URL}/list`);
  console.log("ress2222",res)
  return res.data;
};




export const getDrugListByCat = async ( catId, statusId) => {
  const res = await axiosClient.get(
    `${BASE_URL}/list/${catId}/${statusId}`
  );
  return res.data;
};


// =============================
// 2️⃣ Filter By Group
// /drugListByGruopId/{groupId}/{catId}/{statusId}
// =============================
export const getDrugListByGroup = async (groupId, catId, statusId) => {
  const res = await axiosClient.get(
    `${BASE_URL}/drugListByGruopId/${groupId}/${catId}/${statusId}`
  );
  return res.data;
};


// =============================
// 3️⃣ Filter By Record Status
// /drugListByGruopId/{activeId}/{groupId}/{catId}
// =============================
export const getDrugListByStatus = async (statusId, groupId, catId) => {
  const res = await axiosClient.get(
    `${BASE_URL}/drugListByActiveId/${statusId}/${groupId}/${catId}`
  );
  return res.data;
};


// =============================
// 4️⃣ Filter By Approve Type
// /drugListByGruopId/{approveId}/{groupId}/{catId}/{statusId}
// =============================
export const getDrugListByApprove = async (
  approveId,
  groupId,
  catId,
  statusId
) => {
  const res = await axiosClient.get(
    `${BASE_URL}/drugListByApproveId/${approveId}/${groupId}/${catId}/${statusId}`
  );
  return res.data;
};

export const getDrugDetails = async (drugId, groupId, groupName) => {
  const res = await axiosClient.get(
    `${BASE_URL}/viewDrugMstDetails/${drugId}/${groupId}/${groupName}`
  );
  return res.data;
}

export const getBeforeAddDrug = async () => {
  const res = await axiosClient.get(`${BASE_URL}/beforeAddDrug`);
  return res.data;
};


export const getGenericItemByGroupId = async (groupId) => {
  const res = await axiosClient.get(`${BASE_URL}/genericItems/${groupId}`);
  return res.data;
};

export const getDefaultPackByGenItemId = async (itemId) => {
  const res = await axiosClient.get(`${BASE_URL}/defaultPackSize/${itemId}`);
  return res.data;
};


export const getRatePerUnitByGenItemId = async (itemId) => {
  const res = await axiosClient.get(`${BASE_URL}/getStrMktUnitIdBasedOnItemId/${itemId}`);
  return res.data;
};

export const saveDrug = async (data) => {
  const res = await axiosClient.post(
    `${BASE_URL}/saveDrugMstdata`,
    data
  );
  return res.data;
};

export const deleteDrug = async (drugId) => {
  const res = await axiosClient.delete(
    `${BASE_URL}/deleteDrugMstDetails/${drugId}`
  );
  return res.data;
};