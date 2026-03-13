import React, { useEffect, useState } from "react";
import "./AddDrugMasterModal.scss";
import { getBeforeAddDrug, getGenericItemByGroupId,getDefaultPackByGenItemId  } from "../../api/drugMasterApi";
import { convertDate, convertDateToBackend } from "../../components/util/drugUploadHelper";

export default function AddDrugMasterModal({ show, onClose,onSave }) {
const [groupList, setGroupList] = useState([]);
const [genericList, setGenericList] = useState([]);
const [showDrugCode, setShowDrugCode] = useState(false);
const [drugTypeList, setDrugTypeList] = useState([]);
const [manufacturerList, setManufacturerList] = useState([]);
const [approvedType, setApprovedType] = useState([]);
const [issueType, setIssueType] = useState([]);
const [drugBudgetClass, setDrugBudgetClass] = useState([]);
const [packSizeList, setPackSizeList] = useState([]);
const [ratePerUnitList, setRatePerUnitList] = useState([]);

 const [form, setForm] = useState({
  category: "",
  groupName: "",
  subCategory: "",
  genericItem: "",
  drugCode: "",
  drugType: "",
  drugName: "",
  manufacturer: "",
  iphsName: "",
  defaultRate: "",
  rateUnit: "",
  packSize: "",
  ndcCode: "",
  sterilityTest: "",
  branded: "Y",

  batchNo: 0,
  expiryDate: 0,

  approvedType: "",
  issueType: "",
  drugMake: "1",
  qcType: "0",
  drugClassification: "",
  drugBudgetClassification: "",
  testFee: "",
  sterile: "1",
 

  isIPHS: 0,
  isSachet: 0,
  isQuantifiable: 0,
  isEDL: 0,
  isPrioritized: 0,

  sampleSendLimit: "",
  specification: "",
  effectiveDate: "",
  mktrate:"0"

});

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setForm({
      category: "",
      groupName: "",
      subCategory: "",
      genericItem: "",
      drugCode: "",
      drugType: "",
      drugName: "",
      manufacturer: "",
      iphsName: "",
      defaultRate: "",
      rateUnit: "",
      packSize: "",
      ndcCode: "",
      sterilityTest: "",
      branded: "1",
      batchNo: false,
      expiryDate: false,
      approvedType: "",
      issueType: "",
      drugMake: "1",
      qcType: "0",
      drugClassification: "",
      drugBudgetClassification: "",
      testFee: "",
      sterile: "1",
      isIPHS: 0,
      isPrioritized: 0,
      sampleSendLimit: "",
      specification: "",
      effectiveDate: "",
      StrIssueRateConfigFlg:0,
      StrConfigIssueRate:0,
       mktrate:"0"
    });
  };
  useEffect(() => {
  const loadData = async () => {
    const data = await getBeforeAddDrug();
    setGroupList(data.groupList);
    setDrugTypeList(data.drugType);
    setManufacturerList(data.manufacturerList);
    setApprovedType(data.approvedType);
    setIssueType(data.issueType);
    setDrugBudgetClass(data.drugBudgetClass);
      if (data.effectiveDate) {
      setForm(prev => ({
        ...prev,
        effectiveDate: convertDate(data.effectiveDate)
      }));
    }

  };


  loadData();
}, []);
console.log("packSizeList=====>>>>",packSizeList);
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container large" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modals-header">
          <h2>Add Drug Master</h2>
          <button className="close-icon" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="modals-body">

          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>* Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option value="0">Select</option>
                <option value="1">Drug</option>
                <option value="2">Surgicals</option>
                <option value="3">Sutures</option>
              </select>
            </div>

            <div className="form-group">
              <label>* Group Name</label>
        <select
  value={form.groupName}
  onChange={async (e) => {
    const groupId = e.target.value;

    handleChange("groupName", groupId);

    if (groupId) {
      const data = await getGenericItemByGroupId(groupId);
      setGenericList(data);
    }

    setShowDrugCode(false);
  }}
>
  <option value="">Select</option>

  {groupList.map((group) => (
    <option key={group.strGroupId} value={group.strGroupId}>
      {group.strGroupName}
    </option>
  ))}
</select>
            </div>

            <div className="form-group">
              <label>* Sub Category Type</label>
              <select
                value={form.subCategory}
                onChange={(e) => handleChange("subCategory", e.target.value)}
              >
                <option value="">Select Value</option>
                <option value="10">Consumable</option>
                   <option value="11">Non-Consumable</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>* Generic Item Name</label>
            <select
  value={form.genericItem}
  onChange={async (e) => {

    const value = e.target.value;

    handleChange("genericItem", value);
    setShowDrugCode(true);
    console.log("====value",value)

    if (value) {
      const itemId = value.split("^")[0]; // get 0th value

      const data = await getDefaultPackByGenItemId(itemId);

      setPackSizeList(data);
      setRatePerUnitList(data);
    }

  }}
>
  <option value="">Select</option>

  {genericList.map((item) => (
    <option key={item.strGenericItemId} value={`${item.strGenericItemId}^${item.strInventoryUnitId}^${item.strCPACode}^${item.strGroupId}^${item.strSubGroupId}`}>
      {item.strGenericItemName}
    </option>
  ))}
</select>
            </div>

           {showDrugCode && (
  <div className="form-group">
    <label>* Drug Code</label>
    <input
      placeholder="Enter Drug Code"
      value={form.drugCode}
      onChange={(e) => handleChange("drugCode", e.target.value)}
    />
  </div>
)}

            <div className="form-group">
              <label>* Drug Name</label>
              <input
                placeholder="Enter Drug Name"
                value={form.drugName}
                onChange={(e) => handleChange("drugName", e.target.value)}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>* Drug Type</label>
             <select
  value={form.drugType}
  onChange={(e) => handleChange("drugType", e.target.value)}
>
  <option value="">Select</option>

  {drugTypeList.map((type) => (
    <option key={type.strItemTypeId} value={type.strItemTypeId}>
      {type.strItemType}
    </option>
  ))}
</select>
            </div>

            <div className="form-group">
              <label>Default Rate</label>
              <input
                placeholder="Enter Default Rate"
                value={form.defaultRate}
                onChange={(e) => handleChange("defaultRate", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>* Manufacturer</label>
              
               <select
   value={form.manufacturer}
                onChange={(e) => handleChange("manufacturer", e.target.value)}
>
  <option value="">Select</option>

  {manufacturerList.map((type) => (
    <option key={type.strManufacturerId} value={type.strManufacturerId}>
      {type.strManufacturer}
    </option>
  ))}
</select>
            </div>
          </div>

          {/* Row 4 */}
          <div className="form-row">
            <div className="form-group">
              <label>* IPHS Name</label>
              <input
                value={form.iphsName}
                onChange={(e) => handleChange("iphsName", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>* Rate / Unit</label>
          
                           <select
   value={form.rateUnit}
                onChange={(e) => handleChange("rateUnit", e.target.value)}
>
  <option value="">Select</option>

  {ratePerUnitList.map((type) => (
    <option key={type.strUnitId} value={type.strUnitId.split("^")[0]}>
      {type.strUnitValues}
    </option>
  ))}
</select>
            </div>

            <div className="form-group">
              <label>Sterility Test</label>
              <select
                value={form.sterilityTest}
                onChange={(e) => handleChange("sterilityTest", e.target.value)}
              >
                <option value="0">Select Value</option>
                <option value="A">A</option>
                   <option value="B">B</option>
              </select>
            </div>
          </div>

          {/* Row 5 */}
          <div className="form-row">
            <div className="form-group">
              <label>* Default Pack Size</label>
              <select
 value={form.packSize}
                onChange={(e) => handleChange("packSize", e.target.value)}
>
  <option value="">Select</option>

  {packSizeList.map((type) => (
    <option key={type.strUnitId} value={type.strUnitId}>
      {type.strUnitValues}
    </option>
  ))}
</select>
            </div>

            <div className="form-group">
              <label>Brand Type</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                     value="1"
                    checked={form.branded === "1"}
                   onChange={(e) => handleChange("branded", e.target.value)}
                  />
                  Branded
                </label>

                <label>
                  <input
                    type="radio"
                      value="2"
                     checked={form.branded === "2"}
                    onChange={(e) => handleChange("branded", e.target.value)}
                  />
                  Non-Branded
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>* NDC (National Drug Code)</label>
              <input
                value={form.ndcCode}
                onChange={(e) => handleChange("ndcCode", e.target.value)}
              />
            </div>
          </div>

          {/* Drug Managed By */}
          <div className="section-title">Drug Managed By</div>

          <div className="form-row">
            <div className="form-group checkbox-group">
              <label>Batch No</label>
             <input
  type="checkbox"
  checked={form.batchNo === 1}
  onChange={(e) =>
    handleChange("batchNo", e.target.checked ? 1 : 0)
  }
/>
            </div>

            <div className="form-group checkbox-group">
              <label>Expiry Date</label>
              <input
  type="checkbox"
  checked={form.expiryDate === 1}
  onChange={(e) =>
    handleChange("expiryDate", e.target.checked ? 1 : 0)
  }
/>
            </div>
          </div>

          {/* Drug Parameter */}
          <div className="section-title">Drug Parameter</div>

          <div className="form-row">
            <div className="form-group">
              <label>* Approved Type</label>
             
                <select
 value={form.approvedType}
                onChange={(e) => handleChange("approvedType", e.target.value)}
>
  <option value="">Select</option>

  {approvedType.map((type) => (
    <option key={type.strDrugType} value={type.strDrugType}>
      {type.strApprovedTypeName}
    </option>
  ))}
</select>
              
            </div>

            <div className="form-group">
              <label>* Issue Type</label>
              <select
                value={form.issueType}
                onChange={(e) => handleChange("issueType", e.target.value)}
              >
                <option value="">Select</option>
                 {issueType.map((type) => (
    <option key={type.strIssueTypeId} value={type.strIssueTypeId}>
      {type.strIssueType}
    </option>
  ))}
              </select>
            </div>

            <div className="form-group">
              <label>* Drug Make</label>
              <select
                value={form.drugMake}
                onChange={(e) => handleChange("drugMake",  e.target.checked)}
              >
                <option value="1">Indian</option>
                <option value="2">Foreign</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>* QC Type</label>
              <select
                value={form.qcType}
                onChange={(e) => handleChange("qcType", e.target.value)}
              >
                <option value="0">Non-Mandatory</option>
                <option value="1">Mandatory</option>
                  <option value="2">Desirable</option>
                
              </select>
            </div>

            <div className="form-group">
              <label>Drug Classification</label>
              <select
                value={form.drugClassification}
                onChange={(e) =>
                  handleChange("drugClassification", e.target.value)
                }
              >
                <option value="0">Select</option>
                <option value="1">V</option>
                <option value="2">E</option>
                  <option value="3">D</option>
              </select>
            </div>

            <div className="form-group">
              <label>* Drug Budget Classification</label>
              <select
                value={form.drugBudgetClassification}
                onChange={(e) =>
                  handleChange("drugBudgetClassification", e.target.value)
                }
              >
                <option value="">Select</option>
                 {drugBudgetClass.map((type) => (
    <option key={type.strDrugCode} value={type.strDrugCode}>
      {type.strDrugName}
    </option>
  ))}
              </select>
            </div>
          </div>
 <div className="form-row">
     <div className="form-group checkbox-group">
              <label>Whether Drug is Sachet</label>
             <input
  type="checkbox"
  checked={form.isSachet === 1}
  onChange={(e) =>
    handleChange("isSachet", e.target.checked ? 1 : 0)
  }
/>
            </div>
             <div className="form-group checkbox-group">
              <label>Whether Drug is Quantifiable</label>
              <input
  type="checkbox"
  checked={form.isQuantifiable === 1}
  onChange={(e) =>
    handleChange("isQuantifiable", e.target.checked ? 1 : 0)
  }
/>
            </div>
             <div className="form-group checkbox-group">
              <label>Whether EDL</label>
             <input
  type="checkbox"
  checked={form.isEDL === 1}
  onChange={(e) =>
    handleChange("isEDL", e.target.checked ? 1 : 0)
  }
/>
            </div>
 </div>
          {/* Extra Fields */}
          <div className="form-row">
            <div className="form-group checkbox-group">
              <label>Whether IPHS</label>
             <input
  type="checkbox"
  checked={form.isIPHS === 1}
  onChange={(e) =>
    handleChange("isIPHS", e.target.checked ? 1 : 0)
  }
/>
            </div>

            <div className="form-group checkbox-group">
              <label>Whether Item is prioritized</label>
            <input
  type="checkbox"
  checked={form.isPrioritized === 1}
  onChange={(e) =>
    handleChange("isPrioritized", e.target.checked ? 1 : 0)
  }
/>
            </div>

            <div className="form-group">
              <label>Sample Send Limit</label>
              <input
                type="number"
                value={form.sampleSendLimit}
                onChange={(e) => handleChange("sampleSendLimit", e.target.value)}
              />
            </div>
          </div>



                <div className="form-row">
              <div className="form-group">
    <label>Test Fee</label>
    <input
      type="number"
      value={form.testFee}
      onChange={(e) => handleChange("testFee", e.target.value)}
    />
  </div>
  
            <div className="form-group">
              <label>* Sterile</label>
             <select
                value={form.sterile}
                onChange={(e) =>
                  handleChange("sterile", e.target.value)
                }
              >
                <option value="1">Y</option>
                <option value="0">N</option>
                
              </select>
            </div>
        
            
           <div className="form-group">
    <label>Market Price</label>
    <input
      type="number"
      placeholder="Enter Market Price"
      value={form.mktrate}
      onChange={(e) => handleChange("mktrate", e.target.value)}
    />
  </div>
            
          </div>

          <div className="form-row">
   
  
            <div className="form-group">
              <label>* Effective Date</label>
              <input
                type="date"
                value={form.effectiveDate}
                onChange={(e) => handleChange("effectiveDate", e.target.value)}
              />
            </div>
            <div className="form-group large">
              <label>* Specification (If Any)</label>
              <textarea
                placeholder="Enter Remarks"
                value={form.specification}
                onChange={(e) => handleChange("specification", e.target.value)}
              />
            </div>
            

            
          </div>

          <div className="mandatory-note">
            * Mandatory Fields
          </div>

        </div>

        {/* Footer */}
        <div className="modals-footer">
          <button
  className="btn-save"
  onClick={() => {
    const payload = {
      ...form,
      effectiveDate: convertDateToBackend(form.effectiveDate)
    };

    onSave(payload);

    handleClear(); // clear form after save
  }}
>
  Save
</button>
          <button className="btn-clear" onClick={handleClear}>Clear</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>

      </div>
    </div>
  );
}

