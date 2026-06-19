"use client";

import { useState } from "react";
import { Modal, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  TagsOutlined,
} from "@ant-design/icons";

import CreateTagModal from "./CreateTagModal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const initialTags = [
  { name: "Subscription Pending", color: "#8AAFC4" },
  { name: "Nakul", color: "#98B18F" },
  { name: "Follow up case for Details", color: "#D28E7E" },
  { name: "Add Case", color: "#B5A390" },
  { name: "Aadhaar Verified", color: "#C8AB52" },
  { name: "Autopay Concern", color: "#A89CC6" },
  { name: "Background Check for Case", color: "#8EA2B7" },
  { name: "Call Back", color: "#D7A3A3" },
  { name: "Case Added", color: "#5D8ED8" },
  { name: "Gouri", color: "#7FAE9F" },
];

export default function TagModal({ open, onClose }: Props) {
  const [createOpen, setCreateOpen] = useState(false);
  const [tags, setTags] = useState(initialTags);

  const handleAddTag = (newTag: { name: string; color: string }) => {
    setTags((prev) => [...prev, newTag]);
    setCreateOpen(false);
  };

  const handleDelete = (tagName: string) => {
    setTags((prev) => prev.filter((t) => t.name !== tagName));
  };

  return (
    <>
      <Modal
        title={
          <span style={{ fontSize: 18, fontWeight: 600 }}>
            Choose Tag
          </span>
        }
        open={open}
        onCancel={onClose}
        footer={null}
        width={520}
      >
        <Button
          icon={<TagsOutlined />}
          onClick={() => setCreateOpen(true)}
          style={{
            marginBottom: 20,
            height: 52,
            width: 230,
            borderRadius: 12,
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          Create New Tag
        </Button>

        <div style={{ borderBottom: "1px solid #E5E5E5", marginBottom: 20 }} />

        <div style={{ maxHeight: 320, overflowY: "auto" }}>
          {tags.map((tag) => (
            <div
              key={tag.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  background: tag.color,
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                {tag.name}
              </span>

              <div style={{ display: "flex", gap: 12 }}>
                <EditOutlined
                  style={{ fontSize: 18, color: "#4B3048", cursor: "pointer" }}
                />
                <DeleteOutlined
                  style={{ fontSize: 18, color: "#4B3048", cursor: "pointer" }}
                  onClick={() => handleDelete(tag.name)}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 30 }}>
          <h4 style={{ color: "#666", marginBottom: 12 }}>Address format</h4>
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 20,
              width: 240,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <strong>Laisamma George</strong>
            <p style={{ marginTop: 10 }}>
              67/67A flat no D 1st floor, attaniyathu road vennala, Kochi,
              Kerala, 654321
              <br />
              +91 9876543210
            </p>
          </div>
        </div>
      </Modal>

      <CreateTagModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onAddTag={handleAddTag}
      />
    </>
  );
}