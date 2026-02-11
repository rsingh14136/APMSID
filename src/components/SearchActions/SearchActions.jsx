import React from "react";
import { Search, Plus, FileText } from "lucide-react";

import "../SearchActions/SearchActions.scss";
import Button from "../Buttons/Button";

export default function SearchActions({ search, setSearch, onReportClick, onAddClick }) {
  return (
    <div className="search-actions">
      {/* Search Box */}
      <div className="input-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search groups or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Action Buttons */}
      <div className="buttons">
        <Button
          variant="primary"
          size="md"
          leftIcon={FileText}
          onClick={onReportClick}
        >
          Report
        </Button>

        <Button
          variant="info"
          size="md"
          leftIcon={Plus}
          onClick={onAddClick}
        >
          Add Group
        </Button>
      </div>
    </div>
  );
}
