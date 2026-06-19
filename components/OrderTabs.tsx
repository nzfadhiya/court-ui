"use client";

export default function OrderTabs() {
  const tabs = [
    "Orders (121)",
    "Clerks (40)",
    "Courts (32)",
    "Districts (14)",
    "Eligible Users (11)",
  ];

  return (
    <div
  style={{
    display: "flex",
    width: "594px",
    height: "40px",
    background: "#2B031D",
    borderRadius: "32px",
    padding: "4px",
  }}
>
      {tabs.map((tab, index) => (
        <button
          key={index}
          style={{
            background: index === 0 ? "white" : "transparent",
            color: index === 0 ? "black" : "white",
            border: "none",
            borderRadius: "20px",
            padding: "10px 18px",
            cursor: "pointer",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}