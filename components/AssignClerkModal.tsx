"use client";

import { useState } from "react";
import { Modal, Button, Checkbox, Select, Avatar } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import AddClerkModal from "./AddClerkModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const initialClerks = [
  { id: "1", name: "Shaman" },
  { id: "2", name: "Shaman" },
  { id: "3", name: "Shaman" },
];

export default function AssignClerkModal({ open, onClose }: Props) {
  const [clerks, setClerks] = useState(initialClerks);
  const [selectedClerks, setSelectedClerks] = useState<string[]>([]);
  const [addClerkOpen, setAddClerkOpen] = useState(false);
  const [chosenClerk, setChosenClerk] = useState<string | undefined>(undefined);

  const toggleClerk = (id: string) => {
    setSelectedClerks((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleAddClerk = (clerk: { name: string; phone: string; clerkId: string }) => {
    const newClerk = { id: String(clerks.length + 1), name: clerk.name };
    setClerks((prev) => [...prev, newClerk]);
    setAddClerkOpen(false);
  };

  return (
    <>
      <Modal
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#2B031D",
              margin: "-20px -24px 0 -24px",
              padding: "14px 24px",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>
              Assign Clerk
            </span>
            <Button
              icon={<PlusOutlined />}
              size="small"
              onClick={() => setAddClerkOpen(true)}
              style={{
                background: "#5B1F46",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              Add New
            </Button>
          </div>
        }
        open={open}
        onCancel={onClose}
        footer={null}
        width={460}
        centered
        styles={{ header: { padding: 0, marginBottom: 0 } }}
      >
        <div style={{ padding: "20px 0 0 0" }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
            Assign Authorized Personnel
          </div>
          <div style={{ color: "#666", fontSize: 13, marginBottom: 20 }}>
            Select the person who is authorized to collect CTC document.
          </div>

          {/* Clerk List */}
          <div style={{ marginBottom: 20 }}>
            {clerks.map((clerk) => (
              <div
                key={clerk.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <Checkbox
                  checked={selectedClerks.includes(clerk.id)}
                  onChange={() => toggleClerk(clerk.id)}
                />
                <img
  src="/Mask group.png"
  alt={clerk.name}
  style={{
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
  }}
/>
                <span style={{ fontWeight: 500, fontSize: 14 }}>{clerk.name}</span>
              </div>
            ))}
          </div>

          {/* More Clerks */}
          <div style={{ marginBottom: 30 }}>
            <div style={{ fontSize: 13, color: "#333", marginBottom: 8, fontWeight: 500 }}>
              More Clerks
            </div>
            <Select
              placeholder="Choose Clerks"
              value={chosenClerk}
              onChange={(val) => setChosenClerk(val)}
              style={{ width: "100%" }}
              options={clerks.map((c) => ({ value: c.id, label: c.name }))}
            />
          </div>

          {/* Footer Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
            }}
          >
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
              style={{
                borderRadius: 20,
                background: "#5B1F46",
                borderColor: "#5B1F46",
                width: 160,
              }}
            >
              Assign Personnel
            </Button>
          </div>
        </div>
      </Modal>

      <AddClerkModal
        open={addClerkOpen}
        onClose={() => setAddClerkOpen(false)}
        onAdd={handleAddClerk}
      />
    </>
  );
}