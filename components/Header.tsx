"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Select,
  Drawer,
  Checkbox,
} from "antd";

import {
  ShareAltOutlined,
  FilterOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import ProductFilterModal from "./ProductFilterModal";
import TagFilterModal from "./TagFilterModal";
import { emitFilter } from "./OrdersTable";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [tagFilterOpen, setTagFilterOpen] = useState(false);
  const [productFilterOpen, setProductFilterOpen] = useState(false);

  const [district, setDistrict] = useState<string | undefined>(undefined);
  const [courtEstablishment, setCourtEstablishment] = useState<string | undefined>(undefined);
  const [product, setProduct] = useState<string>("all");
  const [testUsers, setTestUsers] = useState(true);
  const [productFilterSelected, setProductFilterSelected] = useState<string[]>([]); // ADDED

  const handleReset = () => {
    setDistrict(undefined);
    setCourtEstablishment(undefined);
    setProduct("all");
    setTestUsers(true);
    emitFilter({ district: undefined, courtEstablishment: undefined, product: "all", testUsers: true });
  };

  const handleApply = () => {
    emitFilter({ district, courtEstablishment, product, testUsers });
    setOpen(false);
  };

  const handleProductFilterApply = (selected: string[]) => {
  setProductFilterSelected(selected);
  const productValue = selected.length === 0 ? "all" : selected[0];
  emitFilter({ district, courtEstablishment, product: productValue, testUsers });
};

  return (
    <>
      <div
        style={{
          padding: "24px 38px 8px 38px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Left Section */}
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Certified True Copy (47834)
          </h1>

          <p
            style={{
              marginTop: "4px",
              color: "#666",
              fontSize: "14px",
            }}
          >
            Manage Your CTC Orders Here
          </p>
        </div>

        {/* Right Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "flex-end",
          }}
        >
          {/* Top Row */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <Button
              icon={<ShareAltOutlined />}
              style={{ width: 40, height: 40 }}
            />

            <Button
              icon={<FilterOutlined />}
              style={{ width: 40, height: 40 }}
              onClick={() => setOpen(true)}
            />

            {/* ADDED: Product Filter Button */}
            <Button
              icon={<AppstoreOutlined />}
              style={{ width: 40, height: 40 }}
              onClick={() => setProductFilterOpen(true)}
            />

            <Input.Search
              placeholder="Search"
              style={{ width: 230, height: 40 }}
            />
          </div>

          {/* Bottom Row */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                color: "#888",
                marginBottom: "2px",
              }}
            >
              Types
            </span>

            <Select
              defaultValue="orders"
              style={{ width: 110 }}
              options={[{ value: "orders", label: "ORDERS" }]}
            />
          </div>
        </div>
      </div>

      {/* Filter Drawer */}
      <Drawer
        title={
          <span style={{ fontSize: "20px", fontWeight: 700 }}>
            Filter Users
          </span>
        }
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        size="large"
      >
        <div style={{ marginTop: 10 }}>
          {/* District */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ marginBottom: 6, color: "#333", fontSize: 14, fontWeight: 500 }}>
              District
            </div>
            <Select
              placeholder="Choose District"
              value={district}
              onChange={(val) => setDistrict(val)}
              style={{ width: "100%", height: 42 }}
              options={[
                { value: "thrissur", label: "Thrissur" },
                { value: "ernakulam", label: "Ernakulam" },
                { value: "palakkad", label: "Palakkad" },
              ]}
            />
          </div>

          {/* Court Establishment */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ marginBottom: 6, color: "#333", fontSize: 14, fontWeight: 500 }}>
              Court Establishment
            </div>
            <Select
              placeholder="Choose Court Establishment"
              value={courtEstablishment}
              onChange={(val) => setCourtEstablishment(val)}
              style={{ width: "100%", height: 42 }}
              options={[
                { value: "district_court", label: "District Court" },
                { value: "court_complex", label: "Court Complex" },
                { value: "jfcm", label: "JFCM" },
              ]}
            />
          </div>

          {/* Product */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ marginBottom: 6, color: "#333", fontSize: 14, fontWeight: 500 }}>
              Product
            </div>
            <Select
              value={product}
              onChange={(val) => setProduct(val)}
              style={{ width: "100%", height: 42 }}
              options={[
                { value: "all", label: "All" },
                { value: "judgement", label: "Judgement" },
                { value: "interim_order", label: "Interim Order" },
                { value: "other", label: "Other" },
              ]}
            />
          </div>

          {/* Test Users Checkbox */}
          <Checkbox
            checked={testUsers}
            onChange={(e) => setTestUsers(e.target.checked)}
            style={{ fontWeight: 600 }}
          >
            Test Users
          </Checkbox>

          {/* Bottom Buttons */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 24,
              right: 24,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={handleReset}
              style={{
                width: 130,
                height: 40,
                borderRadius: 20,
                borderColor: "#5B1F46",
                color: "#5B1F46",
              }}
            >
              Reset Filter
            </Button>

            <Button
              type="primary"
              onClick={handleApply}
              style={{
                width: 170,
                height: 40,
                borderRadius: 20,
                background: "#5B1F46",
                borderColor: "#5B1F46",
              }}
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </Drawer>

      <TagFilterModal
        open={tagFilterOpen}
        onClose={() => setTagFilterOpen(false)}
      />

      <ProductFilterModal
        open={productFilterOpen}
        onClose={() => setProductFilterOpen(false)}
        onApply={handleProductFilterApply}
      />
    </>
  );
}
