import React, { useState } from "react";
import "./MenuColumn.scss";

export default function MenuColumn({ title, items, type, icon, onItemClick, isOpen, toggleOpen }) {
  const [activeChild, setActiveChild] = useState(null);
  const [openSubIndex, setOpenSubIndex] = useState(null);

  const handleClick = (item) => {
    if (onItemClick) onItemClick(item);
  };

  return (
    <div className="menu-card">
      {/* Card Header */}
      <div className="menu-header" onClick={toggleOpen}>
        <div className="menu-title">
          <span className="menu-icon">{icon}</span>
          <span>{title}</span>
          <span className="arrow">{isOpen ? "▾" : "▸"}</span>
        </div>
      </div>

      {/* Card Content */}
      {isOpen && (
        <ul className="menu-list">
          {/* Flat type */}
          {type === "flat" &&
            items.map((item, i) => (
              <li
                key={i}
                className={`menu-item ${activeChild === i ? "active" : ""}`}
                onClick={() => {
                  setActiveChild(i);
                  handleClick(item);
                }}
              >
                {typeof item === "string" ? item : item.title}
              </li>
            ))}

          {/* Nested type */}
          {type === "nested" &&
            items.map((menu, i) => (
              <li key={i} className="menu-group">
                <div
                  className={`submenu-title ${openSubIndex === i ? "open" : ""}`}
                  onClick={() =>
                    setOpenSubIndex(openSubIndex === i ? null : i)
                  }
                >
                  <span>{menu.title}</span>
                  <span className="arrow">{openSubIndex === i ? "▾" : "▸"}</span>
                </div>

                {openSubIndex === i && (
                  <ul className="submenu">
                    {menu.children.map((child, j) => (
                      <li
                        key={j}
                        className={`submenu-item ${activeChild === `${i}-${j}` ? "active" : ""}`}
                        onClick={() => {
                          setActiveChild(`${i}-${j}`);
                          handleClick(child);
                        }}
                      >
                        {typeof child === "string" ? child : child.title}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
