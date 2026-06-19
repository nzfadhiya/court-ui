"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import OrderTabs from "../components/OrderTabs";
import OrdersTable from "../components/OrdersTable";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
  style={{
    flex: 1,
    background: "#F7F7F7",
    minHeight: "100vh",
  }}
>
        <Header />

        <div
  style={{
    padding: "0 32px 32px 32px",
  }}
>
          <OrderTabs />

          <div style={{ marginTop: "20px" }}>
            <OrdersTable />
          </div>
        </div>
      </div>
    </div>
  );
}