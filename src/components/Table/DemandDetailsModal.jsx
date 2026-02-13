import React from "react";
import CustomModel from "../../Pages/Model/CustomModel";

const DemandDetailsModal = ({
  show,
  onClose,
  headerTitle,
  details,
  loading,
  footerButtons,
  showExtendDate = false,
  extendDate,
  setExtendDate,
  extendRemark,
  setExtendRemark
}) => {
  if (!show) return null;

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

          {/* ===== BASIC INFO ===== */}
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

          {/* ===== EXTEND SECTION ===== */}
          {showExtendDate && (
            <div className="section-block">
              <div className="section-title">
                Extend Submission Date
              </div>

              <div className="extend-date-field">
                <label>New Submission Last Date</label>
                <input
                  type="date"
                  value={extendDate}
                  onChange={(e) => setExtendDate(e.target.value)}
                />
              </div>

              <div className="extend-date-field">
                <label>Remarks</label>
                <textarea
                  rows="3"
                  placeholder="Enter remarks"
                  value={extendRemark}
                  onChange={(e) => setExtendRemark(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ===== PROGRAMS ===== */}
          {details.programs?.length > 0 && (
            <div className="section-block">
              <div className="section-title">
                Selected Programs ({details.programs.length})
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

          {/* ===== ITEMS ===== */}
          {details.items?.length > 0 && (
            <div className="section-block">
              <div className="section-title">
                Programs ({details.items.length})
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

export default DemandDetailsModal;
