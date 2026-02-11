import React from "react";

export default function IsometricBar(props) {
  const { x, y, width, height, fill, onClick } = props;

  const depth = 14; // 3D depth

  return (
    <g onClick={onClick} style={{ cursor: "pointer" }}>
      {/* SIDE FACE */}
      <polygon
        points={`
          ${x + width},${y}
          ${x + width + depth},${y - depth}
          ${x + width + depth},${y + height - depth}
          ${x + width},${y + height}
        `}
        fill="#00000025"
      />

      {/* TOP FACE */}
      <polygon
        points={`
          ${x},${y}
          ${x + depth},${y - depth}
          ${x + width + depth},${y - depth}
          ${x + width},${y}
        `}
        fill="#ffffff55"
      />

      {/* FRONT FACE */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={6}
        fill={fill}
      />
    </g>
  );
}
