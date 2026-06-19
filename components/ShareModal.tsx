"use client";

import { Drawer, Button } from "antd";
import { CopyOutlined, CloseOutlined, LinkOutlined } from "@ant-design/icons";

interface Props {
  open: boolean;
  onClose: () => void;
}

const orderDetails = {
  applicant: "Laisamma George (Petitioner)",
  caseNumber: "WA 233/2024",
  caseName: "Laisamma George & Other  vs  State Of Kerala & Others",
  cnrNumber: "KLHC010922112023",
  courtEstablishment: "JFCM 1 District Court Thrissur",
  documentType: "Certified True Copy - Judgment",
  orderNumber: "1/2026",
  orderDate: "22-Feb-2026",
};

const fields = [
  { label: "APPLICANT", key: "applicant" },
  { label: "CASE NUMBER", key: "caseNumber" },
  { label: "CASE NAME", key: "caseName" },
  { label: "CNR NUMBER", key: "cnrNumber" },
  { label: "COURT ESTABLISHMENT", key: "courtEstablishment" },
  { label: "DOCUMENT TYPE", key: "documentType" },
  { label: "ORDER NUMBER", key: "orderNumber" },
  { label: "ORDER DATE", key: "orderDate" },
];

export default function ShareModal({ open, onClose }: Props) {
  const handleCopy = () => {
    const text = fields
      .map((f) => `${f.label}: ${orderDetails[f.key as keyof typeof orderDetails]}`)
      .join("\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <Drawer
      title={
        <span style={{ fontSize: 16, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>
          Share
        </span>
      }
      placement="right"
      open={open}
      onClose={onClose}
      size="large"
      closeIcon={<CloseOutlined />}
      styles={{
        header: {
          borderBottom: "1px solid #f0f0f0",
          padding: "16px 24px",
        },
        body: {
          padding: "24px",
          background: "#f7f7f7",
        },
      }}
    >
      {/* Order Details Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: "24px 28px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 700, color: "#111" }}>
            Order Details
          </span>

          <Button
            icon={<CopyOutlined style={{ fontSize: 13 }} />}
            size="small"
            onClick={handleCopy}
            style={{
              borderRadius: 8,
              fontSize: 13,
              height: 32,
              paddingInline: 12,
              display: "flex",
              alignItems: "center",
              gap: 4,
              border: "1px solid #d9d9d9",
              color: "#333",
            }}
          >
            Copy Details
          </Button>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {fields.map(({ label, key }) => (
            <div key={key}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 11,
                  lineHeight: "130%",
                  color: "#818181",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: 3,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: "130%",
                  color: "#111",
                }}
              >
                {orderDetails[key as keyof typeof orderDetails]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
}