const BASE_URL = "http://localhost:8081/DWH_MASTERS/StoreGroup";

export const getGroupList = async () => {
  const res = await fetch(`${BASE_URL}/lists`);
  if (!res.ok) throw new Error("Failed to fetch group list");
  return res.json();
};

export const getBeforeAddGroup = async () => {
  const res = await fetch(`${BASE_URL}/beforeAddStoreGroup`);
  if (!res.ok) throw new Error("Failed to fetch add form data");
  return res.json();
};

export const saveGroupData = async (payload) => {
  const res = await fetch(`${BASE_URL}/saveStoreGroupmstdata`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error("Failed to save group");
  return res.json();
};

export const deleteGroup = async (groupId) => {
  const res = await fetch(`${BASE_URL}/deleteStoreGroupMst/${groupId}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Failed to delete group");
  return res.json();
};

export const updateGroup = async (payload) => {
  const res = await fetch(`${BASE_URL}/updateRecord`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error("Failed to update group");
  return res.json();
};