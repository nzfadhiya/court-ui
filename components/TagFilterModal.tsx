"use client";

import { Modal, Checkbox, Button } from "antd";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const tags = [
  {
    name: "Subscription Pending",
    color: "#8AAFC4",
  },
  {
    name: "Nakul",
    color: "#98B18F",
  },
  {
    name: "Follow up case for Details",
    color: "#D28E7E",
  },
  {
    name: "Add Case",
    color: "#B5A390",
  },
  {
    name: "Aadhaar Verified",
    color: "#C8AB52",
  },
  {
    name: "Autopay Concern",
    color: "#A89CC6",
  },
  {
    name: "Background Check for Case",
    color: "#8EA2B7",
  },
  {
    name: "Call Back",
    color: "#D7A3A3",
  },
  {
    name: "Case Added",
    color: "#B0B7C3",
  },
  {
    name: "Gouri",
    color: "#7FAE9F",
  },
];

export default function TagFilterModal({
  open,
  onClose,
}: Props) {
  const [selectedTags, setSelectedTags] =
    useState<string[]>(["Add Case"]);

  const handleChange = (
    tagName: string
  ) => {
    if (
      selectedTags.includes(tagName)
    ) {
      setSelectedTags(
        selectedTags.filter(
          (t) => t !== tagName
        )
      );
    } else {
      setSelectedTags([
        ...selectedTags,
        tagName,
      ]);
    }
  };

  return (
    <Modal
      title="Tags Quick Filter"
      open={open}
      onCancel={onClose}
      footer={null}
      width={360}
      centered
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {tags.map((tag) => (
          <div
            key={tag.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Checkbox
              checked={selectedTags.includes(
                tag.name
              )}
              onChange={() =>
                handleChange(tag.name)
              }
            />

            <span
              style={{
                background:
                  tag.color,
                color: "#fff",
                padding:
                  "4px 12px",
                borderRadius: 16,
                fontSize: 13,
              }}
            >
              {tag.name}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent:
            "flex-end",
          gap: 10,
          marginTop: 30,
        }}
      >
        <Button
          style={{
            borderRadius: 20,
            color: "#5B1F46",
            borderColor:
              "#5B1F46",
          }}
        >
          Reset Filter
        </Button>

        <Button
          type="primary"
          style={{
            borderRadius: 20,
            background:
              "#5B1F46",
            borderColor:
              "#5B1F46",
          }}
        >
          Apply
        </Button>
      </div>
    </Modal>
  );
}