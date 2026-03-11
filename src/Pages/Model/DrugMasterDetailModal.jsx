import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import "./DrugMasterDetailModal.scss";
import { getDrugDetails } from "../../api/drugMasterApi";

export default function DrugMasterDetailModal({
  show,
  onClose,
  drugId,
  groupId,
  groupName
}) {

  const [drugData, setDrugData] = useState(null);
  const [issueType, setIssueType] = useState([]);
  const [approveType, setApproveType] = useState([]);

  useEffect(() => {
    if (show) fetchDrugDetails();
  }, [show]);

  const fetchDrugDetails = async () => {
    try {
      const res = await getDrugDetails(drugId, groupId, groupName);

      setDrugData(res.data);
      setIssueType(res.issueType);
      setApproveType(res.approveType);

    } catch (error) {
      console.error("Error loading drug details", error);
    }
  };

  if (!show || !drugData) return null;

  return (
    <div className="modal-overlay">
      <div className="drug-modal-container">

        {/* Header */}
        <div className="modals-header">
          <h2>Drug Master Details</h2>
          <button className="close-icon" onClick={onClose}>
            <X size={18}/>
          </button>
        </div>

        {/* Body */}
        <div className="drug-grid">

          <div><b>Category :</b> {drugData.strSubCatTypeId}</div>
          <div><b>Generic Item Name :</b> {drugData.strGenericItemName}</div>
          <div><b>Sub Category Type :</b> {drugData.strSubCatTypeId}</div>

          <div><b>Drug Code :</b> {drugData.strNewCPACode}</div>
          <div><b>Drug Name :</b> {drugData.strDrugName}</div>
          <div><b>Manufacturer :</b> {drugData.strManufacturerId}</div>

          <div><b>Default Pack Size :</b> {drugData.strDefaultPackSizeId}</div>
          <div><b>Drug Type :</b> {drugData.strDrugType}</div>
          <div><b>Rate/Unit :</b> {drugData.strGenericItemId}</div>

          <div><b>Batch No :</b> {drugData.strBatchNo}</div>
          <div><b>Approved Type :</b> {drugData.strApprovedType}</div>
          <div><b>Issue Type :</b> {drugData.strIssueType}</div>

          <div><b>QC Type :</b> {drugData.strQCType}</div>
          <div><b>Record Status :</b> {drugData.strIsValid === "1" ? "Yes" : "No"}</div>
          <div><b>Market Price :</b> {drugData.strMktRate}</div>

          <div><b>Drug Make :</b> {drugData.strItemMake === "1" ? "Indian" : "Imported"}</div>
          <div><b>Whether Drug is Sachet :</b> {drugData.strIsItemSachet === "1" ? "Yes" : "No"}</div>
          <div><b>Whether Drug is Quantifiable :</b> {drugData.strIsQuantifiable === "1" ? "Yes" : "No"}</div>

          <div><b>Effective From :</b> {drugData.strEffectiveFrom}</div>
          <div><b>Specification :</b> {drugData.strSpecification}</div>

        </div>

        {/* Footer */}
        <div className="modals-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}