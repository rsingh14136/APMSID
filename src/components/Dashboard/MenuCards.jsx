import React, { useState } from "react";
import { menuData } from "../Dashboard/menuData";
import "./menuCards.scss";

import demandImg from "../../../src/assets/images/demand.png";
import reciveImg from "../../../src/assets/images/recive.png";
import returnImg from "../../../src/assets/images/return.jpg";
import issueImg from "../../../src/assets/images/issueitem.png";
import inventoryMag from "../../../src/assets/images/inventryMang.jpg";



// Top-level images
const cardImages = {
  Demand: demandImg,
  Receive: reciveImg,
  Return: returnImg,
  Issue: issueImg,
  "Inventory Management": inventoryMag
};

export default function MenuCards({ section, onBack, onCardClick }) {
  const [activeGroup, setActiveGroup] = useState(null);

  let cards = [];

  if (section === "services") {
    cards = !activeGroup
      ? menuData.services.map(s => s.title)
      : menuData.services.find(s => s.title === activeGroup)?.children || [];
  }

  if (section === "reports") {
    cards = !activeGroup
      ? menuData.reports.map(r => r.title)
      : menuData.reports.find(r => r.title === activeGroup)?.children || [];
  }

  if (section === "admin") {
    cards = menuData.admin;
  }

  return (
    <div className="menu-cards-page">
      <button
        className="back-btn"
        onClick={() => {
          if (activeGroup) setActiveGroup(null);
          else onBack();
        }}
      >
        ← Back
      </button>

      <div className="menu-card-grid">
        {cards.map((item, i) => {
          // ✅ Normalize item: support string OR object {title, image}
          const cardObj =
            typeof item === "string"
              ? { title: item, image: cardImages[item] }
              : item;

          const label = cardObj.title;
          const imgSrc = cardObj.image;

          return (
            <div key={i} className="menu-card-wrapper">
              <div
                className="menu-action-card image-card"
                onClick={() => {
                  if (
                    (section === "services" || section === "reports") &&
                    !activeGroup
                  ) {
                    setActiveGroup(label);
                  } else {
                    onCardClick(label);
                  }
                }}
              >
                {imgSrc ? (
                  <img src={imgSrc} alt={label} />
                ) : (
                  // ✅ No image → text inside card
                  <span className="card-text">{label}</span>
                )}
              </div>

              {/* ✅ Image present → label below card */}
              {imgSrc && <div className="card-label">{label}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
