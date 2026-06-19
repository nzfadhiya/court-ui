"use client";

import { useState } from "react";
import { Modal, Input, Button, Select } from "antd";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (clerk: { name: string; phone: string; clerkId: string }) => void;
}

export default function AddClerkModal({ open, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [clerkId, setClerkId] = useState("");

  const handleAdd = () => {
    if (!name || !phone || !clerkId) return;
    onAdd({ name, phone, clerkId });
    setName("");
    setPhone("");
    setClerkId("");
  };

  return (
    <Modal
      title={
        <div
          style={{
            background: "#1a1a1a",
            margin: "-20px -24px 0 -24px",
            padding: "14px 24px",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>
            Add clerk
          </span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
      centered
      styles={{ header: { padding: 0, marginBottom: 0 } }}
    >
      <div style={{ padding: "20px 0 0 0" }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
          Add Clerk
        </div>
        <div style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>
          Add a new authorized person by providing details.
        </div>

        {/* Name + Phone Row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <Input
              placeholder="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ height: 42 }}
            />
          </div>

          {/* FIXED: replaced addonBefore with Space.Compact */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                border: "1px solid #d9d9d9",
                borderRadius: 6,
                overflow: "hidden",
                height: 42,
              }}
            >
              <Select
                defaultValue="+91"
                style={{ width: 90, height: 42 }}
                variant="borderless"
                options={[
                  {
                    value: "+91",
                    label: (
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <img
                          src="https://flagcdn.com/w20/in.png"
                          alt="IN"
                          style={{ width: 18, height: 12, objectFit: "cover", borderRadius: 2 }}
                        />
                        +91
                      </span>
                    ),
                  },
                  {
                    value: "+1",
                    label: (
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <img
                          src="https://flagcdn.com/w20/us.png"
                          alt="US"
                          style={{ width: 18, height: 12, objectFit: "cover", borderRadius: 2 }}
                        />
                        +1
                      </span>
                    ),
                  },
                ]}
              />
              <div
                style={{
                  width: 1,
                  background: "#d9d9d9",
                  margin: "8px 0",
                }}
              />
              <Input
                placeholder="Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                variant="borderless"
                style={{ flex: 1, height: 42 }}
              />
            </div>
          </div>
        </div>

        {/* Clerk ID */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: "#333", marginBottom: 6, fontWeight: 500 }}>
            Clerk ID *
          </div>
          <Input
            placeholder="Enter Clerk ID"
            value={clerkId}
            onChange={(e) => setClerkId(e.target.value)}
            style={{ height: 42 }}
          />
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button
            onClick={onClose}
            style={{
              borderRadius: 20,
              borderColor: "#5B1F46",
              color: "#5B1F46",
              width: 90,
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            disabled={!name || !phone || !clerkId}
            onClick={handleAdd}
            style={{
              borderRadius: 20,
              background: "#5B1F46",
              borderColor: "#5B1F46",
              width: 120,
            }}
          >
            Add & Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}