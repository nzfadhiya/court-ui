"use client";

import { Modal, Input, Button } from "antd";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAddTag: (tag: { name: string; color: string }) => void;
}

const colors = [
  "#6F91A7",
  "#8CA88A",
  "#CC8674",
  "#A99783",
  "#C7A64A",
  "#9D90B8",
  "#71879A",
  "#C28B8A",
  "#A4ADB5",
  "#7EA9A3",
  "#5B1F46",
];

export default function CreateTagModal({ open, onClose, onAddTag }: Props) {
  const [tagName, setTagName] = useState("");
  const [selectedColor, setSelectedColor] =
    useState("#6F91A7");
    const handleAdd = () => {
  if (!tagName) return;
  onAddTag({ name: tagName, color: selectedColor });
  setTagName("");
  setSelectedColor("#6F91A7");
};

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={onClose}
      width={650}
      centered
      closeIcon={
        <span
          style={{
            fontSize: 28,
          }}
        >
          ×
        </span>
      }
    >
      <div
        style={{
          padding: "10px 8px",
        }}
      >
        <h2
          style={{
            marginBottom: 4,
            fontWeight: 700,
          }}
        >
          Support Tags
        </h2>

        <div
          style={{
            color: "#888",
            marginBottom: 28,
          }}
        >
          Create new tags here
        </div>

        {/* Tag Name */}
        <div
          style={{
            marginBottom: 20,
          }}
        >
          <div
            style={{
              marginBottom: 8,
              fontWeight: 500,
              color: "#666",
            }}
          >
            New Tag Name
          </div>

          <Input
            placeholder="Enter Tag Name"
            value={tagName}
            onChange={(e) =>
              setTagName(e.target.value)
            }
            style={{
              width: 250,
              height: 42,
            }}
          />
        </div>

        {/* Colors */}
        <div
          style={{
            marginBottom: 25,
          }}
        >
          <div
            style={{
              marginBottom: 12,
              fontWeight: 500,
              color: "#666",
            }}
          >
            Choose Tag Color
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {colors.map((color) => (
              <div
                key={color}
                onClick={() =>
                  setSelectedColor(color)
                }
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: color,
                  cursor: "pointer",
                  border:
                    selectedColor === color
                      ? "3px solid #000"
                      : "2px solid transparent",
                }}
              />
            ))}
          </div>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #eee",
            margin: "20px 0",
          }}
        />

        {/* Preview */}
        <div
          style={{
            marginBottom: 80,
          }}
        >
          <div
            style={{
              marginBottom: 12,
              color: "#666",
              fontWeight: 500,
            }}
          >
            Preview
          </div>

          {tagName && (
            <span
              style={{
                background: selectedColor,
                color: "#fff",
                padding: "6px 14px",
                borderRadius: 16,
                fontSize: 14,
              }}
            >
              {tagName}
            </span>
          )}
        </div>

        {/* Footer Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 14,
          }}
        >
          <Button
            disabled={!tagName}
            type="primary"
            onClick={handleAdd}
            style={{
              width: 180,
              borderRadius: 20,
              background: "#5B1F46",
              borderColor: "#5B1F46",
            }}
          >
            Add Tag
          </Button>
        </div>
      </div>
    </Modal>
  );
}