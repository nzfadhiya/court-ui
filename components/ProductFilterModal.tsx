"use client";

import { useState } from "react";
import { Modal, Button, Checkbox } from "antd";

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: (selected: string[]) => void;
}

const productOptions = [
  { value: "all", label: "All" },
  { value: "judgement", label: "Judgement" },
  { value: "interim_order", label: "Interim Order" },
  { value: "other", label: "Other" },
];

export default function ProductFilterModal({ open, onClose, onApply }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (value: string) => {
    if (value === "all") {
      setSelected([]);
      return;
    }
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleReset = () => {
    setSelected([]);
  };

  const handleApply = () => {
    onApply(selected);
    onClose();
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
            Product filter
          </span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={380}
      centered
      styles={{ header: { padding: 0, marginBottom: 0 } }}
    >
      <div style={{ padding: "20px 0 8px 0" }}>
        {productOptions.map((opt) => (
          <div
            key={opt.value}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
              cursor: "pointer",
            }}
            onClick={() => toggle(opt.value)}
          >
            <Checkbox
              checked={
                opt.value === "all"
                  ? selected.length === 0
                  : selected.includes(opt.value)
              }
              onChange={() => toggle(opt.value)}
            />
            <span style={{ fontSize: 15 }}>{opt.label}</span>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            marginTop: 32,
          }}
        >
          <Button
            onClick={handleReset}
            style={{
              borderRadius: 20,
              borderColor: "#5B1F46",
              color: "#5B1F46",
              width: 120,
              height: 40,
            }}
          >
            Reset Filter
          </Button>
          <Button
            type="primary"
            onClick={handleApply}
            style={{
              borderRadius: 20,
              background: "#5B1F46",
              borderColor: "#5B1F46",
              width: 100,
              height: 40,
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
}