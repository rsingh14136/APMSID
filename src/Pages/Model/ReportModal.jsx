import React from "react";
import "../Model/Modal.scss";
import CustomModel from "./CustomModel";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Button from "../../components/Buttons/Button"; // Reusable button
import csvIcon from "../../assets/images/csv.png";
import excelIcon from "../../assets/images/excel.png";
import printIcon from "../../assets/images/printer.png";

export default function ReportModal({ show, onClose, data }) {
  
  // ✅ Helper function to replace empty values with N/A
  const safeValue = (value) => {
    return value === null || value === undefined || value === "" ? "N/A" : value;
  };

  const handleExportExcel = () => {
    if (!data || data.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((row, index) => ({
        "S No": index + 1,
        "Group Name": safeValue(row.name),
        "Category": safeValue(row.category),
        "Status": safeValue(row.status),
        "Created On": safeValue(row.effectivefrom),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "GroupMaster");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "group_master_report.xlsx");
  };

  const handleExportCSV = () => {
    if (!data || data.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((row, index) => ({
        "S No": index + 1,
        "Group Name": safeValue(row.name),
        "Category": safeValue(row.category),
        "Status": safeValue(row.status),
        "Created On": safeValue(row.effectivefrom),
      }))
    );

    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "group_master_report.csv");
  };

  const handlePrint = () => {
    const printContent = document.querySelector(".report-container").innerHTML;
    const newWin = window.open("", "_blank", "width=900,height=600");
    newWin.document.write("<html><head><title>Group Master Report</title></head><body>");
    newWin.document.write(printContent);
    newWin.document.write("</body></html>");
    newWin.document.close();
    newWin.print();
  };

  return (
    <CustomModel
      show={show}
      onClose={onClose}
      width="900px"
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span>Group Master Report</span>

          {/* Buttons using reusable component */}
         <div className="report-actions">
    <img
      src={csvIcon}
      alt="Export CSV"
      title="Export CSV"
      onClick={handleExportCSV}
      className="action-icon"
    />

    <img
      src={excelIcon}
      alt="Export Excel"
      title="Export Excel"
      onClick={handleExportExcel}
      className="action-icon"
    />

    <img
      src={printIcon}
      alt="Print"
      title="Print"
      onClick={handlePrint}
      className="action-icon"
    />
  </div>
        </div>
      }
    >
      <div className="report-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>S No</th>
              <th>Group Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Created On</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">No Records Found</td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{safeValue(row.name)}</td>
                  <td>{safeValue(row.category)}</td>
                  <td >
                    {safeValue(row.status)}
                  </td>
                  <td>{safeValue(row.effectivefrom)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </CustomModel>
  );
}
