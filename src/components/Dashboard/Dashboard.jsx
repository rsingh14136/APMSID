import React, { useState, useEffect } from "react";
import MenuColumn from "./MenuColumn";
import MenuCards from "./MenuCards";
import { menuData } from "../Dashboard/menuData";
import "../Dashboard/dashboard.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import GroupMasterUI from "../../Pages/GroupMaster/GroupMasterUI";
import DemandNotification from "../../Pages/Services/Demand/DemandNotifications";
import { VIEW_MAP } from "./viewMap";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const [openCard, setOpenCard] = useState(null);
  const [cardView, setCardView] = useState("");

  /* 🔁 Fix scroll jump when view changes */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  const handleMenuClick = (item) => {
    const title = typeof item === "string" ? item : item.title;
    console.log("Clicked menu:", title);

    if (VIEW_MAP[title]) {
      setActiveView(VIEW_MAP[title]);
      setCardView(""); // reset card view when switching page
      setOpenCard(null);
    } else {
      console.warn("No view mapped for:", title);
    }
  };

  const handleCardToggle = (cardTitle) => {
    setOpenCard((prev) => (prev === cardTitle ? null : cardTitle));
  };

  return (
    <>
      <Header />

      <div className="dashboard-main">

        {/* ================= DASHBOARD ================= */}
        {activeView === "dashboard" && (
          <>
            {/* Dashboard Dropdown */}
            <div className="card-dropdown-wrapper">
              <div className="dropdown-with-icon">
                <span className="dropdown-icon">🎨</span>
                <select
                  className="card-dropdown"
                  value={cardView}
                  onChange={(e) => setCardView(e.target.value)}
                >
                  <option value="">Dashboard View</option>
                  <option value="services">Services</option>
                  <option value="admin">Admin</option>
                  <option value="reports">Reports</option>
                </select>
              </div>
            </div>

            {/* Main Dashboard Menu */}
            {!cardView && (
              <div className="dashboard-menu">
                <MenuColumn
                  title="Services"
                  items={menuData.services}
                  type="nested"
                  icon="📋"
                  onItemClick={handleMenuClick}
                  isOpen={openCard === "Services"}
                  toggleOpen={() => handleCardToggle("Services")}
                />

                <MenuColumn
                  title="Admin"
                  items={menuData.admin}
                  type="flat"
                  icon="📄"
                  onItemClick={handleMenuClick}
                  isOpen={openCard === "Admin"}
                  toggleOpen={() => handleCardToggle("Admin")}
                />

                <MenuColumn
                  title="Reports"
                  items={menuData.reports}
                  type="nested"
                  icon="📊"
                  onItemClick={handleMenuClick}
                  isOpen={openCard === "Reports"}
                  toggleOpen={() => handleCardToggle("Reports")}
                />
              </div>
            )}

            {/* Card View */}
            {cardView && (
              <MenuCards
                section={cardView}
                onBack={() => setCardView("")}
                onCardClick={handleMenuClick}
              />
            )}
          </>
        )}

        {/* ================= GROUP MASTER ================= */}
        {activeView === "groupMaster" && (
          <div className="dashboard-content">
            <GroupMasterUI onBack={() => setActiveView("dashboard")} />
          </div>
        )}

        {/* ================= DEMAND NOTIFICATION ================= */}
        {activeView === "demandNotification" && (
          <div className="dashboard-content">
            <DemandNotification onClose={() => setActiveView("dashboard")} />
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}
