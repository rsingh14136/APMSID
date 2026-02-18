import React, { useState, useEffect } from "react";
import {
  Package,
  FileText,
  Users,
  X,
  Search,
  ClipboardCheck,
  Upload
} from "lucide-react";
import "./DemandNotification.scss";
import { parseDrugExcel, parseDrugExcelFullColumns, parseOptionHtml } from "../../../components/util/drugUploadHelper";
import { Trash2, Save } from "lucide-react";
import Button from "../../../components/Buttons/Button";
import {
  getStoreNameCombo,
  getProgName,
  getDemandType,
  getExistingDetail,
  saveProjectedDemand
} from "../../../api/ServiceApi/Demand/DemandNotificationApi";
import ExistingRequestTable from "../../../components/Table/ExistingRequestTable";
import { toast } from "react-toastify";

const DemandNotification = ({ onClose }) => {

  /* ================= STATE ================= */
  const [selectedProgs, setSelectedProgs] = useState([]);
  const [allProgrammes, setAllProgrammes] = useState([]);
  const [showProgrammeSection, setShowProgrammeSection] = useState(false);

  const [remarks, setRemarks] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [file, setFile] = useState(null);
  const [drugList, setDrugList] = useState([]);
  const[completeDrug,setCompleteDrug] = useState([]);
  const [uploadError, setUploadError] = useState("");

  const [storeOptions, setStoreOptions] = useState([]);
  const [storeId, setStoreId] = useState("");

  const [finYearOptions, setFinYearOptions] = useState([]);
  const [finYear, setFinYear] = useState("");

  const [isManualStoreChange, setIsManualStoreChange] = useState(false);
  const [demandTypeOptions, setDemandTypeOptions] = useState([]);
  const [demandType, setDemandType] = useState("0");

  const [tableData, setTableData] = useState([]);
   const [isDateConstraint, setIsDateConstraint] = useState(false);
  const [lastDateOfSubmission, setLastDateOfSubmission] = useState("");
  const resetForm = () => {
   setStoreId("0");
  setFinYear("0");
  setDemandType("0");
  setIsDateConstraint(false);
  setLastDateOfSubmission("");
  setRemarks("");

  setSelectedProgs([]);
  setDrugList([]);
  setCompleteDrug([]);

  setFile(null);
  setUploadError("");

  const fileInput = document.getElementById("drugExcelInput");
  if (fileInput) fileInput.value = "";
};


  /* ================= LOAD STORES ================= */
  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await getStoreNameCombo();

        const parsedStores = parseOptionHtml(data.strStoreNameCmb);
        setStoreOptions(parsedStores);

        const selected = parsedStores.find(s => s.selected);
        if (selected) setStoreId(selected.value);

        const finYears = parseOptionHtml(data.strIndentPeriodValueCombo);
        setFinYearOptions(finYears);

        const selectedYear = finYears.find(y => y.selected);
        if (selectedYear) setFinYear(selectedYear.value);

      } catch (err) {
        console.error("Failed to load store list", err);
      }
    };

    loadStores();
  }, []);

  /* ================= LOAD PROGRAMMES AFTER MANUAL STORE CHANGE ================= */
  useEffect(() => {
    if (!storeId || !isManualStoreChange) {
      setShowProgrammeSection(false);
      setAllProgrammes([]);
      setSelectedProgs([]);
      return;
    }

    const loadProgrammes = async () => {
      try {
        const data = await getProgName();
        setAllProgrammes(data.map(p => p.programmeName));
        setShowProgrammeSection(true);
      } catch (err) {
        console.error("Failed to load programmes", err);
        setShowProgrammeSection(false);
      }
    };

    loadProgrammes();
  }, [storeId, isManualStoreChange]);

  /* ================= LOAD DEMAND + TABLE ON FIN YEAR CHANGE ================= */
  useEffect(() => {
    if (!finYear || !storeId) return;

    const loadDemandData = async () => {
      try {
        const demandHtml = await getDemandType(finYear, storeId);
        const parsedDemand = parseOptionHtml(demandHtml);
        setDemandTypeOptions(parsedDemand);
        setDemandType(parsedDemand.find(d => d.selected)?.value || "0");

        const table = await getExistingDetail(finYear, storeId);
        const parsedTable = JSON.parse(table);
        console.log("==>",parsedTable)
setTableData(parsedTable);

      } catch (e) {
        console.error(e);
        setTableData([]);
      }
    };

    loadDemandData();
  }, [finYear, storeId]);

  /* ================= FILTER AVAILABLE ================= */
  const filteredAvailable = allProgrammes
    .filter(p => !selectedProgs.includes(p))
    .filter(p => p.toLowerCase().includes(searchTerm.toLowerCase()));

  /* ================= MAP / UNMAP ================= */
  const mapProgramme = (prog) => {
    setSelectedProgs(prev => [...prev, prog]);
    setSearchTerm("");
  };

  const unmapProgramme = (prog) => {
    setSelectedProgs(prev => prev.filter(p => p !== prog));
  };

  /* ================= FILE UPLOAD ================= */
  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select an Excel file");
      return;
    }

    try {
      setUploadError("");
      const drugs = await parseDrugExcel(file);

      if (!drugs.length) {
        setUploadError("No drug data found in Excel");
        setDrugList([]);
        return;
      }

      setDrugList(drugs);
      const fullDrugs=await parseDrugExcelFullColumns(file)
      console.log("*********++++++*****",fullDrugs)
      setCompleteDrug(fullDrugs)
    } catch (err) {
      setUploadError("Failed to read Excel file");
      setDrugList([]);
    }
  };

  /*===================request type selection============================== */
  
  const validateDemandTypeSelection = (value) => {

  if (!value || value === "0") return true;

  const [indentTypeId, totalCount, activeCount] =
    value.split("^");

  const total = parseInt(totalCount || "0");
  const active = parseInt(activeCount || "0");

  // check if any OPEN notification exists
  const hasOpenNotification = tableData.some(
    row => row.statusCode !== 50
  );

  /* ================= RULE 1 =================
     Annual Demand (83) → only one allowed
  */
  if (indentTypeId === "83" && total > 0) {
    alert(
      "Notification already raised for Annual Demand.\nNo further Annual Demand Notification allowed."
    );
    return false;
  }

  /* ================= RULE 2 =================
     Supplementary → only one ACTIVE allowed
  */
  if (indentTypeId !== "83" && active > 0) {
    alert(
      "For Supplementary Demand, there could be only one Active Notification."
    );
    return false;
  }

  /* ================= RULE 3 =================
     If Annual is OPEN → block Supplementary
  */
  const annualOpen = tableData.some(
    row =>
      row.statusCode !== 50 &&
      row.indentTypeId === "83"
  );

  if (indentTypeId !== "83" && annualOpen) {
    alert(
      `Annual Demand Notification is Active.\nNo Supplementary Demand allowed until Annual is closed.`
    );
    return false;
  }

  /* ================= RULE 4 =================
     If Supplementary exists → block Annual
  */
  const supplementaryExists = tableData.some(
    row =>
      row.statusCode !== 50 &&
      row.indentTypeId !== "83"
  );

  if (indentTypeId === "83" && supplementaryExists) {
    alert(
      `Supplementary Demand already raised.\nAnnual Demand cannot be generated.`
    );
    return false;
  }

  return true;
};

/*================================(ONSAVE)===================================== */

const handleSave = async (e) => {
  e.preventDefault();

  /* ================= BASIC VALIDATION ================= */

  if (!storeId || storeId === "0") {
    toast.error("Please select Store Name");
    return;
  }

  if (!finYear || finYear === "0") {
    toast.error("Please select Financial Year");
    return;
  }

  if (!demandType || demandType === "0") {
    toast.error("Please select Demand Type");
    return;
  }

  const [indentTypeId, totalCount, activeCount] =
    demandType.split("^");

  const total = parseInt(totalCount || "0");
  const active = parseInt(activeCount || "0");

  /* ================= BUSINESS RULES ================= */

  if (indentTypeId !== "83") {
    const annualActive = demandTypeOptions.find(
      opt => opt.value?.startsWith("83^")
    );

    if (annualActive) {
      const parts = annualActive.value.split("^");

      if (parseInt(parts[1]) > 0 && parseInt(parts[2]) > 0) {
        toast.error(
          `Annual Demand Notification is Active for FY ${finYear}.
No Supplementary Demand allowed until Annual is closed.`
        );
        setDemandType("0");
        return;
      }
    }
  }

  /* ================= WARNING CONFIRM ================= */

  let msgAlert = true;

  if (indentTypeId !== "83") {
    const annualOption = demandTypeOptions.find(
      opt => opt.value?.startsWith("83^")
    );

    if (annualOption) {
      const parts = annualOption.value.split("^");

      if (parseInt(parts[1]) === 0) {
        msgAlert = window.confirm(
          `No Annual Demand Notification for FY ${finYear} exists.
You are generating Supplementary Demand.
After this, Annual Demand cannot be generated!`
        );
      }
    }
  }

  if (!msgAlert) return;

  /* ================= DATE CONSTRAINT ================= */

  if (isDateConstraint) {
    if (!lastDateOfSubmission) {
      toast.error("Last Date of Submission is mandatory");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(lastDateOfSubmission);

    if (selectedDate < today) {
      toast.error(
        "Last Date of Submission should be >= current date"
      );
      return;
    }

    const finEndYear = finYear.split("-")[1];
    const finEndDate = new Date(`03/31/${finEndYear}`);

    if (selectedDate > finEndDate) {
      toast.error(
        "Last Date must be before 31 March of Financial Year"
      );
      return;
    }
  }

  /* ================= PROGRAMME VALIDATION ================= */

  if (selectedProgs.length === 0) {
    toast.error("Please select a Programme from Programme List");
    return;
  }

  /* ================= REMARK VALIDATION ================= */

  if (!remarks.trim()) {
    toast.error("Remarks is mandatory");
    return;
  }

  if (remarks.length > 200) {
    toast.error("Remarks must be <= 200 characters");
    return;
  }

  /* ================= FINAL CONFIRM ================= */

  const conf = window.confirm("You Are Going To Save Records");
  if (!conf) return;

  const conf1 = window.confirm("Are you sure !!!");
  if (!conf1) return;

  /* ================= API CALL ================= */

  try {
    const formData = new FormData();

    formData.append("strStoreId", storeId);
    formData.append("strIndentPeriodValue", finYear);
    formData.append("strReqType", demandType);
    formData.append(
      "strWhetherDateConstraintValue",
      isDateConstraint ? "1" : "0"
    );
    formData.append("strLastDate", lastDateOfSubmission);
    formData.append("strRemarks", remarks);

    selectedProgs.forEach(p =>
      formData.append("programmes", p)
    );

    if (file) {
      formData.append("file", file);
    }

    completeDrug.forEach((drug) => {
      const batch =
        `${drug.drugId}|${drug.drugName}|${drug.rate}|${drug.rateUnitId}`;

      formData.append("dataListBatch", batch);
    });

    // ✅ Loading toast
    const loadingToast = toast.loading(
      "Saving Demand Notification..."
    );

    const response = await saveProjectedDemand(formData);

    toast.dismiss(loadingToast);

    // ✅ Success toast
    toast.success(
      response.message || "Saved Successfully"
    );

    // ✅ Clear form after save
    resetForm();

  } catch (err) {
    console.error(err);

    toast.error(
      err?.response?.data?.message ||
      "Save failed. Please try again."
    );
  }
};



  return (
     <div className="demand-page-wrapper">
      <div className="demand-card">

        <div className="demand-card-header">
          <h2>Demand Notification</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="header-divider" />

        <div className="demand-card-body">

          <section className="form-section">
            <div className="section-header">
              <Package size={16} />
              <span>Location & Period</span>
            </div>

            <div className="section-content grid-2">
              <div className="field-group">
                <label>Store Name *</label>
                <select
                  className="input-control"
                  value={storeId}
                  onChange={(e) => {
                    setStoreId(e.target.value);
                    setIsManualStoreChange(true);
                  }}
                >
                  {storeOptions.map(store => (
                    <option key={store.value} value={store.value}>
                      {store.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label>Financial Year *</label>
                <select
                  className="input-control"
                  value={finYear}
                  onChange={(e) => setFinYear(e.target.value)}
                >
                  {finYearOptions.map(y => (
                    <option key={y.value} value={y.value}>
                      {y.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ✅ ONLY FIX IS HERE */}
            {/* ===== EXISTING REQUEST TABLE ===== */}
<div className="existing-table-section">
  <ExistingRequestTable rows={Array.isArray(tableData) ? tableData : []} financialYear={finYear} storeId={storeId} />
</div>


          </section>

          {/* ===== REQUEST DETAILS ===== */}
          <section className="form-section">
            <div className="section-header">
              <FileText size={16} />
              <span>Request Details</span>
            </div>

            <div className="section-content grid-2">
              <div className="field-group">
                <label>Demand Type *</label>
                  <select
                className="input-control"
                value={demandType}
               onChange={(e) => {
  const selectedValue = e.target.value;

  const isValid = validateDemandTypeSelection(selectedValue);

  if (!isValid) {
    setDemandType("0");
    return;
  }

  setDemandType(selectedValue);

  // Auto checkbox rule (same as JSP)
  const indentTypeId = selectedValue.split("^")[0];

  if (indentTypeId === "83") {
    setIsDateConstraint(true);
  } else {
    setIsDateConstraint(false);
  }
}}

              >
                {demandTypeOptions.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
              </div>

              <div className="checkbox-box">
                <input
                  type="checkbox"
                  id="dateConstraints"
                  checked={isDateConstraint}
                  onChange={(e) => {
                    setIsDateConstraint(e.target.checked);
                    if (!e.target.checked) setLastDateOfSubmission("");
                  }}
                />
                <label htmlFor="dateConstraints">Date Constraints Apply?</label>
              </div>

              {isDateConstraint && (
                <div className="field-group">
                  <label>
                    Last Date of Submission <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    className="input-control"
                    value={lastDateOfSubmission}
                    onChange={(e) => setLastDateOfSubmission(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* ===== FILE UPLOAD ===== */}
            <div className="section-content upload-section">
              <label className="upload-label">
                Upload Drug Excel <span className="required">*</span>
              </label>

              <div
                className={`upload-dropzone ${file ? "has-file" : ""}`}
                onClick={() => document.getElementById("drugExcelInput").click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  if (droppedFile) setFile(droppedFile);
                }}
              >
                <Upload size={22} />
                <p>
                  {file ? <strong>{file.name}</strong> : <>Drag & drop Excel here or <span>browse</span></>}
                </p>
                <small>.xls, .xlsx only</small>

                <input
                  id="drugExcelInput"
                  type="file"
                  accept=".xls,.xlsx"
                  hidden
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <button className="btn btn-upload" onClick={handleUpload}>
                Upload
              </button>
            </div>

            {uploadError && <p className="error-text">{uploadError}</p>}

            {drugList.length > 0 && (
              <div className="section-content">
                <p className="list-title">UPLOADED DRUG LIST ({drugList.length})</p>
                <div className="drug-list-wrapper">
                  <div className="drug-list-header">
                    <div>S.No</div>
                    <div>Drug Name</div>
                  </div>

                  <div className="drug-list-body">
                    {drugList.map((d) => (
                      <div key={d.sNo} className="drug-list-row">
                        <div>{d.sNo}</div>
                        <div>{d.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ===== PROGRAMME SECTION ===== */}
          {showProgrammeSection && (
            <section className="form-section program-mapping-section">
              <div className="section-header">
                <Users size={16} />
                <span>Programme Selection</span>
              </div>

              <div className="section-content">
                <div className="search-wrapper">
                  <Search size={16} className="search-icon" />
                  <input
                    className="input-control"
                    placeholder="Filter available programmes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="selected-tags">
                  {selectedProgs.map(p => (
                    <div key={p} className="tag">
                      {p}
                      <button onClick={() => unmapProgramme(p)}>&times;</button>
                    </div>
                  ))}
                </div>

                <div className="available-list">
                  {filteredAvailable.map(p => (
                    <div
                      key={p}
                      className="available-item"
                      onClick={() => mapProgramme(p)}
                    >
                      {p} <span className="add-btn">+</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ===== REMARKS ===== */}
          <section className="form-section">
            <div className="section-header">
              <ClipboardCheck size={16} />
              <span>Remarks & Justification</span>
            </div>

            <textarea
              className="input-control"
              rows="4"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </section>

          {/* ===== ACTIONS ===== */}
          <footer className="actionsButton">
            <Button variant="danger" leftIcon={Trash2}  onClick={resetForm}>Clear</Button>
            <Button variant="success" leftIcon={Save} onClick={handleSave}>Save</Button>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default DemandNotification;
