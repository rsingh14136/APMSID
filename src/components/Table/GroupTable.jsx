import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { categoryListState } from "../../recoil/groupState";
import { toast } from "react-toastify";


import "./GroupTable.scss";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import EditGroupModal from "../../Pages/Model/EditGroupModal";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import GroupDetailsModal from "../../Pages/Model/GroupDetailsModal";
import DeleteConfirmModal from "../../Pages/Model/DeleteConfirmModal";
import { deleteGroup, updateGroup } from "../../api/groupMasterApi";

//const API_DELETE_URL = "http://localhost:8081/DWH_MASTERS/StoreGroup/deleteStoreGroupMst";
//const API_UPDATE_URL = "http://localhost:8081/DWH_MASTERS/StoreGroup/saveStoreGroupmstdata";
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};


export default function GroupTable({
  filteredData,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  data,
  setData,
  refreshGroupList   
}) {
  const categoryList = useRecoilValue(categoryListState);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRows = filteredData.slice(indexOfFirst, indexOfLast);

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const total = data.length;
  const activeCount = data.filter(d => d.status === "Active").length;
  const inactiveCount = total - activeCount;

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

    await refreshGroupList(); // ✅ ALWAYS REFRESH

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
    await refreshGroupList();   // ✅ REFRESH FROM BACKEND
toast.success("Group updated successfully");
  } catch (err) {
   toast.error(err.message || "Update failed");
  }
};


  const createPageNumbers = () => {
    if (totalPages <= 10) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = [];
    pages.push(1);
    if (currentPage > 4) pages.push("...");
    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 3) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const pageList = createPageNumbers();

  return (
    <div className="group-table">
      <table>
        <thead>
          <tr>
            <th>S No</th>
            <th>Group Name</th>
            <th>Category</th>
            <th>Effective From</th>
            <th>Status</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length ? (
            currentRows.map((row, i) => (
              <tr key={row.id} className="clickable-row">
                <td>{indexOfFirst + i + 1}</td>
                <td>{row.name}</td>
                <td>{row.category}</td>
                <td>{row.effectivefrom}</td>
                <td>
                  <span className={row.status === "Active" ? "active" : "inactive"}>
                    {row.status}
                  </span>
                </td>
                <td className="action-icons">
                  <Eye size={30} className="view" onClick={() => handleRowClick(row)} />
                  <FaRegEdit size={30} className="edit" onClick={() => handleEdit(row)} />
                  <FaTrashAlt
                    size={30}
                    className={`delete ${row.status === "In-Active" ? "disabled" : ""}`}
                    onClick={() => handleDelete(row)}
                    title={row.status === "In-Active" ? "Already inactive" : "Deactivate"}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-results">No groups found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <GroupDetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        row={selectedRow}
      />

      <div className="bottom-bar">
        <div className="table-stats">
          <span>Total: <b>{total}</b></span>
          <span className="active-text">Active: <b>{activeCount}</b></span>
          <span className="inactive-text">Inactive: <b>{inactiveCount}</b></span>
        </div>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </button>

          {pageList.map((p, index) =>
            p === "..." ? (
              <span key={index} className="dots">...</span>
            ) : (
              <button
                key={index}
                className={currentPage === p ? "active" : ""}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

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
