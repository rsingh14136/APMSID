import React, { useEffect, useState } from "react";
import "./EditDrugModal.scss";
import { getModifyDrugDetails } from "../../api/drugMasterApi";

export default function EditDrugModal({
  show,
  onClose,
  drugId,
  groupId,
  groupName
}) {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  /* FETCH DRUG DETAILS */

  useEffect(() => {

    if (show && drugId) {
      loadDrugDetails();
    }

  }, [show, drugId]);

  const loadDrugDetails = async () => {

    try {

      setLoading(true);

      const data = await getModifyDrugDetails(
        drugId,
        groupId,
        groupName
      );

      if (data) {
        setFormData(data);
      }

    } catch (error) {

      console.error("Error loading drug details", error);

    } finally {

      setLoading(false);

    }

  };

  /* INPUT CHANGE HANDLER */

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

  };

  if (!show) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-container drug-modal">

        {/* HEADER */}

        <div className="modal-header">

          <h2>Drug Master Modify</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        {/* BODY */}

        <div className="modal-body">

          {/* Row 1 */}

          <div className="form-row">

            <div className="form-group">

              <label>Category</label>

              <select
                name="categoryId"
                value={formData.categoryId || ""}
                onChange={handleChange}
              >

                <option value="1">Drug</option>
                <option value="2">Surgical</option>
                <option value="3">Sutures</option>

              </select>

            </div>

            <div className="form-group">

              <label>Group Name</label>

              <input
                type="text"
                name="groupName"
                value={groupName || ""}
                readOnly
              />

            </div>

            <div className="form-group">

              <label>Generic Item Name</label>

              <input
                type="text"
                name="genericItemName"
                value={formData.genericItemName || ""}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Row 2 */}

          <div className="form-row">

            <div className="form-group">

              <label>* Sub Category Type</label>

              <select
                name="subCategoryType"
                value={formData.subCategoryType || ""}
                onChange={handleChange}
              >

                <option>Consumable</option>

              </select>

            </div>

            <div className="form-group">

              <label>* Drug Code</label>

              <input
                type="text"
                name="drugCode"
                value={formData.drugCode || ""}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>* Drug Type</label>

              <select
                name="drugType"
                value={formData.drugType || ""}
                onChange={handleChange}
              >

                <option>Bottle</option>

              </select>

            </div>

          </div>

          {/* Row 3 */}

          <div className="form-row">

            <div className="form-group">

              <label>* Drug Name</label>

              <input
                type="text"
                name="drugName"
                value={formData.drugName || ""}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>* Manufacturer</label>

              <select
                name="manufacturer"
                value={formData.manufacturer || ""}
                onChange={handleChange}
              >

                <option>Select</option>

              </select>

            </div>

            <div className="form-group">

              <label>IPHS Name</label>

              <input
                type="text"
                name="iphsName"
                value={formData.iphsName || ""}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Row 4 */}

          <div className="form-row">

            <div className="form-group">

              <label>* Rate / Unit</label>

              <select
                name="rateUnit"
                value={formData.rateUnit || ""}
                onChange={handleChange}
              >

                <option>Bottle</option>

              </select>

            </div>

            <div className="form-group">

              <label>* Default Pack Size</label>

              <select
                name="defaultPackSize"
                value={formData.defaultPackSize || ""}
                onChange={handleChange}
              >

                <option>1</option>

              </select>

            </div>

            <div className="form-group">

              <label>Default Rate</label>

              <input
                type="text"
                name="defaultRate"
                value={formData.defaultRate || ""}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* DRUG MANAGED BY */}

          <h3 className="section-title">
            Drug Managed By
          </h3>

          <div className="form-row">

            <div className="form-group checkbox-group">

              <label>Batch No</label>

              <input
                type="checkbox"
                name="batchNo"
                checked={formData.batchNo || false}
                onChange={handleChange}
              />

            </div>

            <div className="form-group checkbox-group">

              <label>Expiry Date</label>

              <input
                type="checkbox"
                name="expiryDate"
                checked={formData.expiryDate || false}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* DRUG PARAMETER */}

          <h3 className="section-title">
            Drug Parameter
          </h3>

          <div className="form-row">

            <div className="form-group">

              <label>* Approved Type</label>

              <select
                name="approvedType"
                value={formData.approvedType || ""}
                onChange={handleChange}
              >

                <option>Central Drugs</option>

              </select>

            </div>

            <div className="form-group">

              <label>* Issue Type</label>

              <select
                name="issueType"
                value={formData.issueType || ""}
                onChange={handleChange}
              >

                <option>T</option>

              </select>

            </div>

            <div className="form-group">

              <label>* QC Type</label>

              <select
                name="qcType"
                value={formData.qcType || ""}
                onChange={handleChange}
              >

                <option>Non-Mandatory</option>

              </select>

            </div>

          </div>
<div className="form-row">
  <div className="form-group">
    <label>Drug Classification</label>
    <select
      name="drugClassification"
      value={formData.drugClassification || ""}
      onChange={handleChange}
    >
      <option value="">Select Value</option>
    </select>
  </div>

  <div className="form-group">
    <label>Sample Send Limit</label>
    <input
      type="text"
      name="sampleSendLimit"
      value={formData.sampleSendLimit || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Test Fee</label>
    <input
      type="text"
      name="testFee"
      value={formData.testFee || ""}
      onChange={handleChange}
    />
  </div>
</div>

<div className="form-row">
  <div className="form-group">
    <label>Sterile</label>
    <select
      name="sterile"
      value={formData.sterile || ""}
      onChange={handleChange}
    >
      <option value="Y">Y</option>
      <option value="N">N</option>
    </select>
  </div>

  <div className="form-group">
    <label>Market Price</label>
    <input
      type="text"
      name="marketPrice"
      value={formData.marketPrice || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>* Drug Make</label>
    <select
      name="drugMake"
      value={formData.drugMake || ""}
      onChange={handleChange}
    >
      <option value="Indian">Indian</option>
      <option value="Imported">Imported</option>
    </select>
  </div>
</div>

<div className="form-row">
  <div className="form-group checkbox-group">
    <label>Whether Drug is Sachet</label>
    <input
      type="checkbox"
      name="sachet"
      checked={formData.sachet || false}
      onChange={handleChange}
    />
  </div>

  <div className="form-group checkbox-group">
    <label>Whether Drug is Quantifiable</label>
    <input
      type="checkbox"
      name="quantifiable"
      checked={formData.quantifiable || false}
      onChange={handleChange}
    />
  </div>

  <div className="form-group checkbox-group">
    <label>Whether EDL</label>
    <input
      type="checkbox"
      name="edl"
      checked={formData.edl || false}
      onChange={handleChange}
    />
  </div>
</div>

<div className="form-row">
  <div className="form-group">
    <label>* Specification (if any)</label>
    <input
      type="text"
      name="specification"
      value={formData.specification || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>* Effective From</label>
    <input
      type="date"
      name="effectiveFrom"
      value={formData.effectiveFrom || ""}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>* Record Status</label>
    <select
      name="recordStatus"
      value={formData.recordStatus || "1"}
      onChange={handleChange}
    >
      <option value="1">Active</option>
      <option value="0">Inactive</option>
    </select>
  </div>
</div>



        </div>

        {/* FOOTER */}

        <div className="modal-footer">

          <button className="btn-update">
            Update
          </button>

          <button
            className="btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

