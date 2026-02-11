import React, { useState } from "react";
import { Eye, Trash2, FileText } from "lucide-react";
import CustomModel from "../../Pages/Model/CustomModel";
import Button from "../Buttons/Button";
import {
  getDeleteDetail,
  getExtendDetail,
  getViewDetail
} from "../../api/ServiceApi/Demand/DemandNotificationApi";
import "./ExistingRequestTable.scss";

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

  if (!Array.isArray(rows) || rows.length === 0) return null;

  const isClosed = (statusCode) => statusCode === 50;

  /* ================= FETCH DELETE DETAILS ================= */
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

      const parsedData = JSON.parse(responseText);
      setDeleteDetails(parsedData);
    } catch (error) {
      console.error("Failed to load delete details", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  /* ================= FETCH EXTEND DETAILS ================= */
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

      const parsedData = JSON.parse(responseText);
      setExtendDetails(parsedData);
    } catch (error) {
      console.error("Failed to load extend details", error);
    } finally {
      setLoadingExtendDetails(false);
    }
  };

  /*=============================view detail=========*/
  const handleViewClick = async (row) => {
    console.log("=====view data======")
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

      const parsedData = JSON.parse(responseText);
      console.log("===",parsedData)
      setViewDetails(parsedData);
    } catch (error) {
      console.error("Failed to load extend details", error);
    } finally {
      setLoadingViewDetails(false);
    }
  }; 

  /* ================= CONFIRM DELETE ================= */
  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);

      console.log("Final Delete for:", selectedRow.notificationNo);

      setShowDeleteModal(false);
      setDeleteDetails(null);
      setSelectedRow(null);
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setIsDeleting(false);
    }
  };

  /* ================= REUSABLE MODAL COMPONENT ================= */

  const DemandDetailsModal = ({
    show,
    onClose,
    headerTitle,
    details,
    loading,
    footerButtons
  }) => {
    return (
      <CustomModel
        show={show}
        onClose={onClose}
        headerTitle={headerTitle}
        width="900px"
        showFooter={true}
        footerButtons={footerButtons}
      >
        {loading ? (
          <div className="delete-loading">Loading details...</div>
        ) : details ? (
          <div className="delete-container">
            {/* BASIC INFO GRID */}
            <div className="delete-grid">
              <div className="info-card">
                <span className="label">Notification No</span>
                <span className="value">{details.notificationNo}</span>
              </div>

              <div className="info-card">
                <span className="label">Demand Type</span>
                <span className="value">{details.demandType}</span>
              </div>

              <div className="info-card">
                <span className="label">Date Constraint</span>
                <span className="value badge">
                  {details.dateConstraint ? "Yes" : "No"}
                </span>
              </div>

              <div className="info-card">
                <span className="label">Submission Last Date</span>
                <span className="value">
                  {details.submissionLastDate}
                </span>
              </div>

              <div className="info-card">
                <span className="label">Program Constraint</span>
                <span className="value badge">
                  {details.programConstraint ? "Yes" : "No"}
                </span>
              </div>

              <div className="info-card">
                <span className="label">Drug Constraint</span>
                <span className="value badge">
                  {details.drugConstraint ? "Yes" : "No"}
                </span>
              </div>
            </div>

            {/* PROGRAM SECTION */}
            {details.programs?.length > 0 && (
              <div className="section-block">
                <div className="section-title">
                  Programs ({details.programs.length})
                </div>

                <div className="program-grid">
                  {details.programs.map((p) => (
                    <div key={p.id} className="pill">
                      {p.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ITEMS SECTION */}
            {details.items?.length > 0 && (
              <div className="section-block">
                <div className="section-title">
                  Items ({details.items.length})
                </div>

                <div className="item-table-wrapper">
                  <table className="mini-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Item Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.items.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="delete-empty">No data found</div>
        )}
      </CustomModel>
    );
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
                        <Eye  onClick={() =>
                            !closed && handleViewClick(row)
                          }/>

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
              {isDeleting ? "Deleting..." : "Confirm Delete"}
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
        footerButtons={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowExtendModal(false)}
            >
              Cancel
            </Button>
          </>
        }
      />

       <DemandDetailsModal
        show={showViewModal}
        onClose={() => setViewModal(false)}
        headerTitle="View Details"
        details={viewDetails}
        loading={loadingViewDetails}
        footerButtons={
          <>
            <Button
              variant="secondary"
              onClick={() => setViewModal(false)}
            >
              Cancel
            </Button>
          </>
        }
      />
    </>
  );
};

export default ExistingRequestTable;
