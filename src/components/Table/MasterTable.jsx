import React from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import "./GroupTable.scss";

export default function MasterTable({
  columns,
  data,
  filteredData,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  onView,
  onEdit,
  onDelete,
  
}) {


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRows = filteredData.slice(indexOfFirst, indexOfLast);

  const total = data.length;
  const activeCount = data.filter(d => d.status === "Active").length;
  const inactiveCount = total - activeCount;

  const createPageNumbers = () => {
    if (totalPages <= 10)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = [];
    pages.push(1);

    if (currentPage > 4) pages.push("...");

    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 3) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pageList = createPageNumbers();

  return (
    <div className="group-table">

      <table>

        {/* HEADER */}
        <thead>
          <tr>
            <th>S No</th>

            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}

            <th className="actions">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>

          {currentRows.length ? (
            currentRows.map((row, i) => (
              <tr key={row.id}>

                <td>{indexOfFirst + i + 1}</td>

                {columns.map((col, index) => (
                  <td key={index}>
                    {col.field === "status" ? (
                      <span className={row.status === "Active" ? "active" : "inactive"}>
                        {row.status}
                      </span>
                    ) : (
                      row[col.field]
                    )}
                  </td>
                ))}

                <td className="action-icons">

                  {onView && (
                    <Eye
                      size={26}
                      className="view"
                      onClick={() => onView(row)}
                    />
                  )}

                  {onEdit && (
                    <FaRegEdit
                      size={26}
                      className="edit"
                      onClick={() => onEdit(row)}
                    />
                  )}

                  {onDelete && (
                    <FaTrashAlt
                      size={26}
                      className="delete"
                      onClick={() => onDelete(row)}
                    />
                  )}

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 2} className="no-results">
                No data found
              </td>
            </tr>
          )}

        </tbody>

      </table>


      {/* FOOTER */}
      <div className="bottom-bar">

        <div className="table-stats">
          <span>Total: <b>{total}</b></span>
          <span className="active-text">Active: <b>{activeCount}</b></span>
          <span className="inactive-text">Inactive: <b>{inactiveCount}</b></span>
        </div>


        <div className="pagination">

          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18}/>
          </button>

          {pageList.map((p, index) =>
            p === "..." ? (
              <span key={index} className="dots">...</span>
            ) : (
              <button
                key={index}
                className={currentPage === p ? "active" : ""}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18}/>
          </button>

        </div>

      </div>

    </div>
  );
}