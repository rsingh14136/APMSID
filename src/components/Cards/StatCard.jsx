import React from "react";
import "../Cards/StatCard.scss";
import { Users } from "lucide-react";

export default function StatCard({ data }) {
  const total = data.length;
  const active = data.filter(d => d.status === "Active").length;
  const inactive = total - active;

  return (
    <div className="stats-cards">
      <div className="card blue">
        <Users size={40} />
        <div>
          <h2>Total Groups</h2>
          <p>{total}</p>
        </div>
      </div>

      <div className="card green">
        <Users size={40} />
        <div>
          <h2>Active</h2>
          <p>{active}</p>
        </div>
      </div>

      <div className="card red">
        <Users size={40} />
        <div>
          <h2>Inactive</h2>
          <p>{inactive}</p>
        </div>
      </div>
    </div>
  );
}
