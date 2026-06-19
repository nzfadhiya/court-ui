"use client";
import {
  AppstoreOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  FileTextOutlined,
  InboxOutlined,
  ShopOutlined,
  EllipsisOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "113px",
        height: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Active Indicator */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "170px",
          width: "4px",
          height: "30px",
          background: "#F4C430",
          borderRadius: "0 4px 4px 0",
        }}
      />

      {/* Logo Area */}
      <div
        style={{
          width: "100%",
          height: "90px",
          background: "#3b0d2d",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/Navigation panel.svg"
          alt="Court Click Logo"
          style={{
            width: 98,
            height: 113,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Menu Icons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "42px",
          marginTop: "50px",
        }}
      >
        <AppstoreOutlined
          style={{
            fontSize: 22,
            color: "#fff",
          }}
        />

        <TeamOutlined
          style={{
            fontSize: 22,
            color: "#fff",
          }}
        />

        <UsergroupAddOutlined
          style={{
            fontSize: 22,
            color: "#F4C430",
          }}
        />

        <FileTextOutlined
          style={{
            fontSize: 22,
            color: "#fff",
          }}
        />

        <InboxOutlined
          style={{
            fontSize: 22,
            color: "#fff",
          }}
        />

        <ShopOutlined
          style={{
            fontSize: 22,
            color: "#fff",
          }}
        />

        <EllipsisOutlined
          style={{
            fontSize: 22,
            color: "#fff",
          }}
        />
      </div>

      {/* Bottom Profile */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#D9D9D9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserOutlined
          style={{
            color: "#666",
            fontSize: 20,
          }}
        />
      </div>
    </div>
  );
}