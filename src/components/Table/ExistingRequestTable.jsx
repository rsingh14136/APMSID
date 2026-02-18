import React, { useState } from "react";
import { Eye, Trash2, FileText } from "lucide-react";
import Button from "../Buttons/Button";

import {
  getDeleteDetail,
  getExtendDetail,
  getViewDetail,
  extendDemandRequest,
  deleteDemand
} from "../../api/ServiceApi/Demand/DemandNotificationApi";
import "./ExistingRequestTable.scss";
import DemandDetailsModal from "./DemandDetailsModal";

const ExistingRequestTable = ({
  rows,
  onOpenModal,
  financialYear,
  storeId
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteDetails, setDeleteDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showExtendModal, setShowExtendModal] = useState(false);
  const [extendDetails, setExtendDetails] = useState(null);
  const [loadingExtendDetails, setLoadingExtendDetails] = useState(false);

  const [showViewModal, setViewModal] = useState(false);
  const [viewDetails, setViewDetails] = useState(null);
  const [loadingViewDetails, setLoadingViewDetails] = useState(false);

  const [extendDate, setExtendDate] = useState("");
  const [extendRemark, setExtendRemark] = useState("");
    const [deleteRemark, setDeleteRemark] = useState("");

  const formatDateToBackend = (dateStr) => {
    const months = [
      "jan","feb","mar","apr","may","jun",
      "jul","aug","sep","oct","nov","dec"
    ];

    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  if (!Array.isArray(rows) || rows.length === 0) return null;

  const isClosed = (statusCode) => statusCode === 50;

  /* ================= DELETE ================= */
  const handleDeleteClick = async (row) => {
    try {
      setSelectedRow(row);
      setShowDeleteModal(true);
      setLoadingDetails(true);
      setDeleteDetails(null);

      const responseText = await getDeleteDetail(
        financialYear,
        row.notificationNo,
        storeId
      );

      setDeleteDetails(JSON.parse(responseText));
    } catch (error) {
      console.error("Failed to load delete details", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  /* ================= EXTEND ================= */
  const handleExtendClick = async (row) => {
    try {
      setSelectedRow(row);
      setShowExtendModal(true);
      setLoadingExtendDetails(true);
      setExtendDetails(null);

      const responseText = await getExtendDetail(
        financialYear,
        row.notificationNo,
        storeId
      );

      setExtendDetails(JSON.parse(responseText));
    } catch (error) {
      console.error("Failed to load extend details", error);
    } finally {
      setLoadingExtendDetails(false);
    }
  };

  /* ================= VIEW ================= */
  const handleViewClick = async (row) => {
    try {
      setSelectedRow(row);
      setViewModal(true);
      setLoadingViewDetails(true);
      setViewDetails(null);

      const responseText = await getViewDetail(
        financialYear,
        row.notificationNo,
        storeId
      );

      setViewDetails(JSON.parse(responseText));
    } catch (error) {
      console.error("Failed to load view details", error);
    } finally {
      setLoadingViewDetails(false);
    }
  };

  /* ================= CONFIRM DELETE ================= */
  
  /* ================= CONFIRM DELETE ================= */
const handleConfirmDelete = async () => {
  try {
    if (!deleteRemark.trim()) {
      alert("Please enter delete remark");
      return;
    }

    setIsDeleting(true);

    const payload = {
      strIndentPeriodValue: financialYear,
      strNotificationNo: selectedRow.notificationNo,
      strStoreId: storeId,
      strRemarks: deleteRemark.trim()
    };

    console.log("Delete Payload:", payload);

    const response = await deleteDemand(payload);
    console.log("response",response.status)

    if (response.status === "SUCCESS") {
      alert(response.message || "Deleted Successfully");

      // ✅ reset states
      setShowDeleteModal(false);
      setDeleteDetails(null);
      setSelectedRow(null);
      setDeleteRemark("");

    } else {
      alert(response.message || "Delete failed");
    }

  } catch (error) {
    console.error("Delete failed", error);
    alert("Something went wrong while deleting.");
  } finally {
    setIsDeleting(false);
  }
};

  /* ================= CONFIRM EXTEND ================= */
  const handleConfirmExtend = async () => {
    try {
      if (!extendDate) {
        alert("Please select new submission date");
        return;
      }

      if (!extendRemark.trim()) {
        alert("Please enter remarks");
        return;
      }

      const formattedDate = formatDateToBackend(extendDate);

      const payload = {
        strIndentPeriodValue: financialYear,
        strNotificationNo: selectedRow.notificationNo,
        strStoreId: storeId,
        strExtendLastDate: formattedDate,
        strRemarks: extendRemark.trim()
      };

      const response = await extendDemandRequest(payload);

      if (response.status === "SUCCESS") {
        alert(response.message);

        setShowExtendModal(false);
        setExtendDetails(null);
        setSelectedRow(null);
        setExtendDate("");
        setExtendRemark("");

      } else {
        alert(response.message || "Failed to extend");
      }
    } catch (error) {
      console.error("Extend failed", error);
      alert("Something went wrong while extending.");
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <div className="table-card">
        <div className="table-title">Existing Demand Requests</div>

        <div className="table-scroll">
          <table className="custom-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Notification No</th>
                <th>Date</th>
                <th>Demand Type</th>
                <th>Date Constraint</th>
                <th>Last Submission</th>
                <th>Programme</th>
                <th>Drug</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => {
                const closed = isClosed(row.statusCode);

                return (
                  <tr key={index}>
                    <td>{row.sno}</td>
                    <td>{row.notificationNo}</td>
                    <td>{row.date}</td>
                    <td>{row.demandType}</td>
                    <td>{row.dateConstraint}</td>
                    <td>{row.lastSubmissionDate}</td>
                    <td>{row.programmeConstraint}</td>
                    <td>{row.drugConstraint}</td>

                    <td>
                      <span
                        className={`statusRequest ${
                          row.statusCode === 50
                            ? "closed"
                            : row.statusCode === 10
                            ? "progress"
                            : row.statusCode === 45
                            ? "reopen"
                            : "open"
                        }`}
                      >
                        {row.statusCode === 50
                          ? "Closed"
                          : row.statusCode === 10
                          ? "In Progress"
                          : row.statusCode === 45
                          ? "Reopen"
                          : "Open"}
                      </span>
                    </td>

                    <td>
                      <div className="action-icons-request">
                        <Eye onClick={() => !closed && handleViewClick(row)} />

                        <FileText
                          style={{
                            cursor: closed ? "not-allowed" : "pointer",
                            opacity: closed ? 0.4 : 1
                          }}
                          onClick={() =>
                            !closed && handleExtendClick(row)
                          }
                        />

                        <Trash2
                          style={{
                            cursor: closed ? "not-allowed" : "pointer",
                            opacity: closed ? 0.4 : 1
                          }}
                          onClick={() =>
                            !closed && handleDeleteClick(row)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DELETE MODAL */}
      <DemandDetailsModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        headerTitle="Delete Demand Details"
        details={deleteDetails}
        loading={loadingDetails}
         showDeleteRemark={true}
         deleteRemark={deleteRemark}
  setDeleteRemark={setDeleteRemark}
        footerButtons={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </>
        }
      />

      {/* EXTEND MODAL */}
      <DemandDetailsModal
        show={showExtendModal}
        onClose={() => setShowExtendModal(false)}
        headerTitle="Extend Demand Details"
        details={extendDetails}
        loading={loadingExtendDetails}
        showExtendDate={true}
        extendDate={extendDate}
        setExtendDate={setExtendDate}
        extendRemark={extendRemark}
        setExtendRemark={setExtendRemark}
        footerButtons={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowExtendModal(false)}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              onClick={handleConfirmExtend}
            >
              Extend
            </Button>
          </>
        }
      />

      {/* VIEW MODAL */}
      <DemandDetailsModal
        show={showViewModal}
        onClose={() => setViewModal(false)}
        headerTitle="View Details"
        details={viewDetails}
        loading={loadingViewDetails}
        footerButtons={
          <Button
            variant="secondary"
            onClick={() => setViewModal(false)}
          >
            Close
          </Button>
        }
      />
    </>
  );
};

export default ExistingRequestTable;
