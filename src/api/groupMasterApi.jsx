import axiosClient from "./ServiceApi/axiosClient";


const BASE_URL = "/DWH_MASTERS/StoreGroup";

export const getGroupList = async () => {
  const res = await axiosClient.get(`${BASE_URL}/lists`);
  return res.data;
};

export const getBeforeAddGroup = async () => {
  const res = await axiosClient.get(`${BASE_URL}/beforeAddStoreGroup`);
  return res.data;
};

export const saveGroupData = async (payload) => {
  const res = await axiosClient.post(
    `${BASE_URL}/saveStoreGroupmstdata`,
    payload
  );
  return res.data;
};

export const deleteGroup = async (groupId) => {
  const res = await axiosClient.delete(
    `${BASE_URL}/deleteStoreGroupMst/${groupId}`
  );
  return res.data;
};

export const updateGroup = async (payload) => {
  const res = await axiosClient.post(
    `${BASE_URL}/updateRecord`,
    payload
  );
  return res.data;
};