import React, { useState, useEffect, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { categoryListState } from "../../recoil/groupState";

import "./GroupMaster.scss";

import SearchActions from "../../components/SearchActions/SearchActions";
import GroupTable from "../../components/Table/GroupTable";
import GroupChart from "../../components/Graph/GroupStatusChart";

import ReportModal from "../Model/ReportModal";
import AddGroupModal from "../Model/AddGroupModal";

import {
  getGroupList,
  getBeforeAddGroup,
  saveGroupData
} from "../../api/groupMasterApi";
import GroupStatusChart from "../../components/Graph/GroupStatusChart";

export default function GroupMasterUI({ onBack }) {
  const setCategoryList = useSetRecoilState(categoryListState);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState(null);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState([]);

  const itemsPerPage = 5;

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

          <GroupTable
            filteredData={filteredData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            data={data}
            setData={setData}
             refreshGroupList={loadGroupList}
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
    </div>
  );
}
