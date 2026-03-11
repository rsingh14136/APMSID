import React, { useState, useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { categoryListState } from "../../recoil/groupState";
import { toast } from "react-toastify";

import "./GroupMaster.scss";

import SearchActions from "../../components/SearchActions/SearchActions";
import GroupTable from "../../components/Table/GroupTable";
import GroupChart from "../../components/Graph/GroupStatusChart";
import { deleteGroup, updateGroup } from "../../api/groupMasterApi";

import ReportModal from "../Model/ReportModal";
import AddGroupModal from "../Model/AddGroupModal";

import {
  getGroupList,
  getBeforeAddGroup,
  saveGroupData
} from "../../api/groupMasterApi";
import GroupStatusChart from "../../components/Graph/GroupStatusChart";
import MasterTable from "../../components/Table/MasterTable";
import GroupDetailsModal from "../Model/GroupDetailsModal";
import EditGroupModal from "../Model/EditGroupModal";
import DeleteConfirmModal from "../Model/DeleteConfirmModal";

export default function GroupMasterUI({ onBack }) {
  const setCategoryList = useSetRecoilState(categoryListState);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState(null);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

  const itemsPerPage = 5;
const groupColumns = [
  { header: "Group Name", field: "name" },
  { header: "Category", field: "category" },
  { header: "Effective From", field: "effectivefrom" },
  { header: "Status", field: "status" }
];
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

  // ------------------------
  // FETCH LIST DATA
  // ------------------------
// ------------------------
// FETCH LIST DATA (REUSABLE)
// ------------------------
const loadGroupList = async () => {
  try {
    const apiData = await getGroupList();

    const mapped = apiData.map((item, i) => ({
      id: i + 1,
      groupId: item.strGroupId,
      catId: item.strItemCatId,
      name: item.strGroupName,
      category: item.strCategory,
      effectivefrom: item.strEffectiveFrom,
      status: 
  item.strRecordStatus === "1" ||
  item.strRecordStatus === "Active"
    ? "Active"
    : "In-Active"

    }));

    setData(mapped);
    setCurrentPage(1)

    const uniqueCategories = Array.from(
      new Map(
        apiData
          .filter(i => i.strItemCatId)
          .map(i => [
            i.strItemCatId,
            { id: i.strItemCatId, name: i.strCategory }
          ])
      ).values()
    );

    setCategoryList(uniqueCategories);
  } catch (err) {
    console.error(err);
  }
};


  
  useEffect(() => {
   loadGroupList();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // ------------------------
  // ADD GROUP
  // ------------------------
  const handleOpenAddForm = async () => {
    try {
      const apiData = await getBeforeAddGroup();
      setAddFormData(apiData);
      setAddModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddGroup = async (newGroup) => {
    try {
      const apiResponse = await saveGroupData(newGroup);

      const categoryName =
        addFormData?.categoryList?.find(
          c => c.strItemCatId === apiResponse.data.strItemCatId
        )?.strItemName || "";

      const newRow = {
        id: Date.now(),
        name: apiResponse.data.strGroupName,
        category: categoryName,
        effectivefrom: apiResponse.data.strEffectiveFrom,
        status: apiResponse.data.strIsValid === "1" ? "Active" : "Inactive"
      };

      setData(prev => [newRow, ...prev]);
      setAddModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };


  const filteredData = useMemo(() => {
  return data.filter(d =>
    (d.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (d.category ?? "").toLowerCase().includes(search.toLowerCase())
  );
}, [data, search]);

  // ------------------------
  // REPORT
  // ------------------------
  const handleReportClick = () => {
    setReportData(data);
    setShowReportModal(true);
  };

  const handleReportFromChart = (list) => {
    setReportData(list);
    setShowReportModal(true);
  };


  //------------------------------
   const handleRowClick = (row) => {
      setSelectedRow(row);
      setShowModal(true);
    };
  
    const handleEdit = (row) => {
      setSelectedRow(row);
      setShowEditModal(true);
    };
  
    // Only allow delete if status is Active
    const handleDelete = (row) => {
      if (row.status === "In-Active") return;
      console.log("hhhhhhh")
      setSelectedRow(row);
      setShowDeleteModal(true);
    };
  
  const confirmDelete = async () => {
    if (!selectedRow) return;
  
    try {
      const result = await deleteGroup(selectedRow.groupId);
      if (result.status !== "success") {
        throw new Error(result.message || "Delete failed");
      }
  
      setShowDeleteModal(false);
  
      await loadGroupList(); // ✅ ALWAYS REFRESH
  
      toast.success(result.message || "Group deactivated successfully");
    } catch (err) {
      toast.error(err.message || "Failed to deactivate group");
    }
  };
  
  
  // ------------------------ UPDATE ------------------------
  const saveEditedData = async (updated) => {
    console.log("===>",selectedRow.groupId)
     console.log("===>",updated.name)
      console.log("===>",updated.categoryId)
       console.log("===>",formatDate(updated.effectivefrom))
        console.log("===>",updated.status)
    try {
      const payload = {
        strGroupId: selectedRow.groupId,
        strGroupName: updated.name,
        strItemCatId: updated.categoryId,
        strEffectiveFrom: formatDate(updated.effectivefrom),
        strIsValid: updated.status === "1" ? "1" : "0"
      };
  
      const result = await updateGroup(payload); // use API function
      console.log("UPDATE API RESPONSE 👉", result);
      if (result.status !== "SUCCESS") throw new Error(result.message);
      setShowEditModal(false);
      setSelectedRow(null);
      await loadGroupList();   // ✅ REFRESH FROM BACKEND
  toast.success("Group updated successfully");
    } catch (err) {
     toast.error(err.message || "Update failed");
    }
  };

  return (
    <div className="group-master">
      <main className="group-container">
        <div className="group-card">
          <button className="close-btn" onClick={onBack}>Close</button>

          <h1 className="group-title">Group Master</h1>

          <SearchActions
            search={search}
            setSearch={setSearch}
            onReportClick={handleReportClick}
            onAddClick={handleOpenAddForm}
            tableData={data}
          />

          <AddGroupModal
            show={addModalOpen}
            onClose={() => setAddModalOpen(false)}
            onAdd={handleAddGroup}
            formData={addFormData}
          />

          {/* <GroupTable
            filteredData={filteredData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            data={data}
            setData={setData}
             refreshGroupList={loadGroupList}
          /> */}

          <MasterTable
  columns={groupColumns}
  data={data}
  filteredData={filteredData}
  currentPage={currentPage}
  setCurrentPage={setCurrentPage}
  itemsPerPage={itemsPerPage}
  onView={handleRowClick}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

          <GroupStatusChart
            data={data}
            onBarReport={handleReportFromChart}
          />
        </div>
      </main>

      <ReportModal
        show={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
       <GroupDetailsModal
              show={showModal}
              onClose={() => setShowModal(false)}
              row={selectedRow}
            />
        <EditGroupModal
              show={showEditModal}
              onClose={() => setShowEditModal(false)}
              rowData={selectedRow}
              onSave={saveEditedData}
            />
                <DeleteConfirmModal 
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                    row={selectedRow}
                  />
    </div>
  );
}
