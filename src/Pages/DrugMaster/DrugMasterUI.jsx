import React, { useEffect, useState } from "react";
import "../GroupMaster/GroupMaster.scss";

import SearchActions from "../../components/SearchActions/SearchActions";
import MasterTable from "../../components/Table/MasterTable";

import {
  getDrugList,
  getDrugListByGroup,
  getDrugListByStatus,
  getDrugListByApprove,
  getDrugListByCat
} from "../../api/drugMasterApi";
import GroupDetailsModal from "../Model/GroupDetailsModal";
import DrugMasterDetailModal from "../Model/DrugMasterDetailModal";

export default function DrugMasterUI({ onBack }) {

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("0");
  const [groupName, setGroupName] = useState("");
  const [recordStatus, setRecordStatus] = useState("1");
  const [approveType, setApproveType] = useState("");

  const [groupList, setGroupList] = useState([]);
  const [approveTypeList, setApproveTypeList] = useState([]);
  const [drugList, setDrugList] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
      const [showModal, setShowModal] = useState(false);
      const[tableResponse,setTableResponse]=useState([]);

  const itemsPerPage = 5;

  const drugColumns = [
    { header: "Group Name", field: "groupName" },
    { header: "Drug Code", field: "drugCode" },
    { header: "Drug Name", field: "drugName" },
    { header: "Disease", field: "disease" },
    { header: "Drug Type", field: "drugType" },
    { header: "Specification", field: "specificationType" }
    
  ];

  // ===============================
  // Load initial data
  // ===============================
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {

      const res = await getDrugList();

      console.log("Drug List",  res.groupList);

      setDrugList(res.groupList || []);

      // create unique group dropdown
   const groups = [
  ...new Map(
    res.groupList.map(item => [
      item.strGroupId,
      {
        strGroupId: item.strGroupId,
        strGroupName: item.strGroupName
      }
    ])
  ).values()
];
setGroupList(groups);
console.log("=======>>>>",res.approvedType[0]);
  const approveTypes = [
  ...new Map(
    res.approvedType.map(item => [
      item.strApprovalType,
      {
        strApprovalType: item.strApprovalType,
        strApprovedTypeName: item.strApprovedTypeName
      }
    ])
  ).values()
];

setApproveTypeList(approveTypes);
 const tableRes = await getDrugListByCat(category, recordStatus);

 console.log("tableRes==>>",tableRes)
 setTableResponse(tableRes);

    const tableData = (tableRes || []).map(item => ({
       drugId: item.drugId,
  groupId: item.groupId,
      groupName: item.groupName,
      drugCode: item.drugCode,
      drugName: item.drugName,
      disease: item.disease,
      drugType: item.drugType,
      specificationType: item.specificationType
    }));

    setDrugList(tableData);


    } catch (error) {
      console.error("Error loading drug list", error);
    }
  };

  
 const handleCategoryChange = async (value) => {
  setCategory(value);

  try {
    const res = await getDrugListByCat(value, recordStatus);

     const tableData = (res || []).map(item => ({
       drugId: item.drugId,
  groupId: item.groupId,
      groupName: item.groupName,
      drugCode: item.drugCode,
      drugName: item.drugName,
      disease: item.disease,
      drugType: item.drugType,
      specificationType: item.specificationType
    }));

    setDrugList(tableData);

  } catch (err) {
    console.error(err);
  }
};

const handleGroupChange = async (value) => {
  setGroupName(value);

  try {
    const res = await getDrugListByGroup(value, category, recordStatus);

    const tableData = (res || []).map(item => ({
       drugId: item.drugId,
  groupId: item.groupId,
      groupName: item.groupName,
      drugCode: item.drugCode,
      drugName: item.drugName,
      disease: item.disease,
      drugType: item.drugType,
      specificationType: item.specificationType
    }));

    setDrugList(tableData);

  } catch (err) {
    console.error(err);
  }
};

const handleStatusChange = async (value) => {
  setRecordStatus(value);

  try {
    const res = await getDrugListByStatus(value, groupName, category);

    const tableData = (res || []).map(item => ({
       drugId: item.drugId,
  groupId: item.groupId,
      groupName: item.groupName,
      drugCode: item.drugCode,
      drugName: item.drugName,
      disease: item.disease,
      drugType: item.drugType,
      specificationType: item.specificationType
    }));

    setDrugList(tableData);
    setCurrentPage(1);

  } catch (err) {
    console.error(err);
  }
};
  
const handleApproveChange = async (value) => {
  setApproveType(value);

  try {
    const res = await getDrugListByApprove(
      value,
      groupName,
      category,
      recordStatus
    );

    const tableData = (res || []).map(item => ({
       drugId: item.drugId,
  groupId: item.groupId,
      groupName: item.groupName,
      drugCode: item.drugCode,
      drugName: item.drugName,
      disease: item.disease,
      drugType: item.drugType,
      specificationType: item.specificationType
    }));

    setDrugList(tableData);
    setCurrentPage(1);

  } catch (err) {
    console.error(err);
  }
};
  
 const handleRowClick = (row) => {
       setSelectedRow({
    drugId: row.drugId,
    groupId: row.groupId,
    groupName: row.groupName
  });

      setShowModal(true);
    };
  

  // ===============================
  // Search Filter
  // ===============================
  const filteredData = drugList.filter(
    (d) =>
      d.drugName?.toLowerCase().includes(search.toLowerCase()) ||
      d.groupName?.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="group-master">

      <main className="group-container">

        <div className="group-card">

          <button className="close-btn" onClick={onBack}>
            Close
          </button>

          <h1 className="group-title">
            Drug Master
          </h1>

          {/* ================= Filters ================= */}

          <div className="filter-row">

            <div className="filter-field">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="0">All</option>
                <option value="1">Drug</option>
                <option value="2">Surgical</option>
                <option value="3">Sutures</option>
              </select>
            </div>

            <div className="filter-field">
              <label>Group Name</label>
              <select
                value={groupName}
                onChange={(e) => handleGroupChange(e.target.value)}
              >
                <option value="">All Group</option>

                {groupList.map((g) => (
                  <option key={g.strGroupId} value={g.strGroupId}>
                    {g.strGroupName}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label>Record Status</label>
              <select
                value={recordStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </select>
            </div>

         <div className="filter-field">
  <label>Approve Type</label>

  <select
    value={approveType}
    onChange={(e) => handleApproveChange(e.target.value)}
  >
    <option value="">Select Approve Type</option>

    {approveTypeList.map(item => (
      <option key={item.strApprovalType} value={item.strApprovalType}>
        {item.strApprovedTypeName}
      </option>
    ))}
  </select>
</div>

          </div>

          {/* ================= Search ================= */}

          <SearchActions
            search={search}
            setSearch={setSearch}
            tableData={drugList}
          />

          {/* ================= Table ================= */}

          <MasterTable
            columns={drugColumns}
            data={drugList}
            filteredData={filteredData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
              onView={handleRowClick}
            
          />
           <DrugMasterDetailModal
  show={showModal}
  onClose={() => setShowModal(false)}
  drugId={selectedRow?.drugId}
  groupId={selectedRow?.groupId}
  groupName={selectedRow?.groupName}
/>

        </div>

      </main>

    </div>
  );
}