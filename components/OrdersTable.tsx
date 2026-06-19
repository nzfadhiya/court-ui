"use client";

import AssignClerkModal from "./AssignClerkModal";
import { useState, useEffect } from "react"; // ADDED useEffect
import { Table, Button, Select, Modal, Tabs } from "antd";
import TagModal from "./TagModal";
import {
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  CloudUploadOutlined,
  CopyOutlined,
} from "@ant-design/icons";

const allData = [
  {
    key: "1",
    user: "Soji Abraham",
    court: "Court Complex, Kunnamkulam",
    district: "Thrissur",
    product: "Judgement #584854",
    price: "₹3,500",
    status: "Cancelled",
    days: "",
    hasAssign: true,
    orderDetails: {
      orderId: "2298",
      trackingId: "EL767335963IN",
      paymentCompleted: "27 Feb 2026 01:54 PM",
      orderPlaced: "27 Feb 2026 02:01 PM",
      assigned: "3 Mar 2026 05:35 PM",
      applied: "26 Mar 2026 10:45 AM",
      dispatched: "28 Feb 2026 01:54 PM",
      delivered: "30 Mar 2026 06:03 PM",
      caseNumber: "OS/300179/2024",
      legalName: "Soji Abraham",
      name: "Soji Abraham",
      email: "sojiabraham@gmail.com",
      phone: "919495862301",
      deliveryFeedback: "",
      issue: "N/A",
      address: {
        pincode: "654321",
        addressLine1: "67/67A flat no D 1st floor",
        addressLine2: "attaniyathu road vennala",
        city: "Kochi",
        district: "Ernakulam",
        state: "Kerala",
        country: "India",
      },
      products: [
        {
          label: "Product 1",
          type: "judgement",
          orderDate: "attaniyathu road vennal-27 Feb 2026",
          file: "N/A",
        },
      ],
      digioDocuments: [
        {
          label: "eSign 1",
          digioId: "DID26022713594426B625QRGSUK5WP37",
          status: "Completed",
          signedDocument: "View Signed Document",
          auditLog: "View Audit Log",
        },
      ],
    },
  },
  {
    key: "2",
    user: "Shaman",
    court: "District Court Thrissur",
    district: "Thrissur",
    product: "Interim Order #487565",
    price: "₹150",
    status: "Order Placed",
    days: "03 days since payment",
    hasAssign: true,
    orderDetails: {
      orderId: "2299",
      trackingId: "EL767335964IN",
      paymentCompleted: "28 Feb 2026 10:00 AM",
      orderPlaced: "28 Feb 2026 10:05 AM",
      assigned: "4 Mar 2026 09:00 AM",
      applied: "27 Mar 2026 11:00 AM",
      dispatched: "28 Feb 2026 10:00 AM",
      delivered: "31 Mar 2026 07:00 AM",
      caseNumber: "OS/300180/2024",
      legalName: "Shaman",
      name: "Shaman",
      email: "shaman@gmail.com",
      phone: "919495862302",
      deliveryFeedback: "",
      issue: "N/A",
      address: {
        pincode: "680001",
        addressLine1: "12/B 2nd floor, MG Road",
        addressLine2: "Near Railway Station",
        city: "Thrissur",
        district: "Thrissur",
        state: "Kerala",
        country: "India",
      },
      products: [
        {
          label: "Product 1",
          type: "interim order",
          orderDate: "MG Road, Thrissur-28 Feb 2026",
          file: "N/A",
        },
      ],
      digioDocuments: [
        {
          label: "eSign 1",
          digioId: "DID26022713594426B625QRGSUK5WP37",
          status: "Completed",
          signedDocument: "View Signed Document",
          auditLog: "View Audit Log",
        },
      ],
    },
  },
  {
    key: "3",
    user: "Gopalan",
    court: "District Court Thrissur",
    district: "Thrissur",
    product: "Other #2500",
    price: "₹2,500",
    status: "Payment Completed",
    days: "11 days since payment",
    hasAssign: true,
    orderDetails: {
      orderId: "2300",
      trackingId: "EL767335965IN",
      paymentCompleted: "1 Mar 2026 02:00 PM",
      orderPlaced: "1 Mar 2026 02:10 PM",
      assigned: "5 Mar 2026 10:00 AM",
      applied: "28 Mar 2026 12:00 PM",
      dispatched: "1 Mar 2026 02:00 PM",
      delivered: "1 Apr 2026 08:00 AM",
      caseNumber: "OS/300181/2024",
      legalName: "Gopalan",
      name: "Gopalan",
      email: "gopalan@gmail.com",
      phone: "919495862303",
      deliveryFeedback: "",
      issue: "N/A",
      address: {
        pincode: "680002",
        addressLine1: "45/C, Near Bus Stand",
        addressLine2: "Palakkad Road",
        city: "Thrissur",
        district: "Thrissur",
        state: "Kerala",
        country: "India",
      },
      products: [
        {
          label: "Product 1",
          type: "other",
          orderDate: "Palakkad Road, Thrissur-1 Mar 2026",
          file: "N/A",
        },
      ],
      digioDocuments: [
        {
          label: "eSign 1",
          digioId: "DID26022713594426B625QRGSUK5WP38",
          status: "Completed",
          signedDocument: "View Signed Document",
          auditLog: "View Audit Log",
        },
      ],
    },
  },
];

// ADDED: filter event emitter so Header can push filters here
type FilterState = {
  district: string | undefined;
  courtEstablishment: string | undefined;
  product: string;
  testUsers: boolean;
};

const filterListeners: Array<(f: FilterState) => void> = [];

export function emitFilter(filters: FilterState) {
  filterListeners.forEach((cb) => cb(filters));
}

const detailRowStyle: React.CSSProperties = {
  display: "flex",
  marginBottom: 10,
  fontSize: 14,
};

const labelStyle: React.CSSProperties = {
  fontWeight: 600,
  minWidth: 180,
  marginRight: 12,
  whiteSpace: "nowrap",
  color: "#333",
};

const valueStyle: React.CSSProperties = {
  fontWeight: 400,
  color: "#333",
};

const infoRowStyle: React.CSSProperties = {
  display: "flex",
  marginBottom: 8,
  fontSize: 14,
};

const infoLabelStyle: React.CSSProperties = {
  color: "#666",
  minWidth: 160,
  fontWeight: 400,
};

const infoValueStyle: React.CSSProperties = {
  color: "#111",
  fontWeight: 500,
};

export default function OrdersTable() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [viewingRecord, setViewingRecord] = useState<any>(null);
  const [assignOpen, setAssignOpen] = useState(false);

  // ADDED: active filter state
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    district: undefined,
    courtEstablishment: undefined,
    product: "all",
    testUsers: true,
  });

  // ADDED: subscribe to filter events from Header
  useEffect(() => {
    filterListeners.push(setActiveFilters);
    return () => {
      const i = filterListeners.indexOf(setActiveFilters);
      if (i > -1) filterListeners.splice(i, 1);
    };
  }, []);

  // ADDED: apply filters to data
  const data = allData.filter((row) => {
    if (
      activeFilters.district &&
      row.district.toLowerCase() !== activeFilters.district.toLowerCase()
    )
      return false;
    if (
      activeFilters.courtEstablishment === "district_court" &&
      !row.court.toLowerCase().includes("district court")
    )
      return false;
    if (
      activeFilters.courtEstablishment === "court_complex" &&
      !row.court.toLowerCase().includes("court complex")
    )
      return false;
    if (
      activeFilters.courtEstablishment === "jfcm" &&
      !row.court.toLowerCase().includes("jfcm")
    )
      return false;
    // REPLACE the product filter condition in the data.filter():

if (activeFilters.product !== "all") {
  const productMap: Record<string, string> = {
    judgement: "judgement",
    interim_order: "interim order",
    other: "other",
  };
  const keyword = productMap[activeFilters.product] ?? activeFilters.product;
  if (!row.product.toLowerCase().includes(keyword)) return false;
}
    return true;
  });

  const columns = [
    {
      title: "#",
      width: 50,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "USER INFO",
      width: 240,
      render: (record: any) => (
        <div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{record.user}</div>
          <div style={{ color: "#666" }}>+91 80861 65790</div>
          <div style={{ color: "#666" }}>OP/000251/2026</div>
          <Button size="small" className="copy-btn" style={{ marginTop: 10 }}>
            Copy Address
          </Button>
        </div>
      ),
    },
    {
      title: "COURT COMPLEX",
      width: 200,
      render: (record: any) => (
        <>
          <div style={{ fontWeight: 600 }}>{record.court}</div>
          <div style={{ color: "#888", marginTop: 4 }}>{record.district}</div>
        </>
      ),
    },
    {
      title: "PRODUCTS",
      width: 180,
      render: (record: any) => (
        <>
          <div style={{ fontWeight: 600 }}>{record.product}</div>
          <div style={{ color: "#666", marginTop: 4 }}>{record.price}</div>
        </>
      ),
    },
    {
      title: "ORDER DATE",
      width: 140,
      render: () => (
        <>
          <div>7 Feb 2026</div>
          <div style={{ color: "#888", fontSize: 12 }}>12:57 PM</div>
        </>
      ),
    },
    {
      title: "STATUS",
      width: 250,
      render: (record: any) => (
        <>
          <Select
            defaultValue="Update Status"
            style={{ width: 170 }}
            options={[
              { value: "placed", label: "Order Placed" },
              { value: "cancelled", label: "Cancelled" },
              { value: "completed", label: "Payment Completed" },
            ]}
          />
          <div style={{ marginTop: 10 }}>
            <span
              className={
                record.status === "Cancelled"
                  ? "status-cancelled"
                  : record.status === "Payment Completed"
                  ? "status-completed"
                  : "status-placed"
              }
            >
              {record.status}
            </span>
          </div>
          {record.days && (
            <div style={{ color: "#FF6A00", marginTop: 8, fontSize: 12, fontWeight: 500 }}>
              {record.days}
            </div>
          )}
        </>
      ),
    },
    {
      title: "ORDER DETAILS / E-SIGN",
      width: 220,
      render: (record: any) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button
            className="action-btn"
            onClick={() => {
              setViewingRecord(record);
              setDetailsOpen(true);
            }}
          >
            View
          </Button>
          <Button className="action-btn">E-sign</Button>
        </div>
      ),
    },
    {
      title: "TAGS / NOTE",
      width: 280,
      render: () => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Select placeholder="Choose Tag" style={{ width: 120 }} />
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => setTagModalOpen(true)}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <span className="tag tag-blue">Subscription Pending</span>
            <span className="tag tag-brown">Add Case</span>
            <span className="tag tag-yellow">Aadhaar Verified</span>
            <span className="tag tag-green">Gouri</span>
          </div>
        </div>
      ),
    },
    {
      title: "CLERK",
      width: 220,
      render: (record: any) => (
        <>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Shabarinath</div>
          <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
            <EditOutlined />
            <DeleteOutlined />
            <ShareAltOutlined
              style={{ cursor: "default", color: "#999" }}
            />
          </div>
          {record.hasAssign && (
            <Button
              size="small"
              className="assign-btn"
              onClick={() => setAssignOpen(true)}
            >
              Assign
            </Button>
          )}
        </>
      ),
    },
    {
      title: "ECOPY",
      width: 160,
      render: () => (
        <Button
          icon={<CloudUploadOutlined />}
          style={{
            background: "#5B1F46",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            height: 36,
            paddingInline: 16,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          Upload
        </Button>
      ),
    },
  ];

  const od = viewingRecord?.orderDetails;

  return (
    <>
      <div
        style={{
          width: "calc(100vw - 170px)",
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #E5E5E5",
          overflow: "hidden",
          marginTop: 20,
        }}
      >
        <Table
          rowClassName={() => "custom-row"}
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 3, showSizeChanger: false }}
          scroll={{ x: 1800 }}
        />
      </div>

      <Modal
        title={<span style={{ fontSize: 18, fontWeight: 700 }}>Order Details</span>}
        open={detailsOpen}
        footer={null}
        onCancel={() => {
          setDetailsOpen(false);
          setViewingRecord(null);
        }}
        width={760}
      >
        {od && (
          <div style={{ paddingTop: 8 }}>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Order ID:</span>
              <span style={valueStyle}>{od.orderId}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Tracking ID:</span>
              <span style={valueStyle}>{od.trackingId}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Payment completed:</span>
              <span style={valueStyle}>{od.paymentCompleted}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Order placed:</span>
              <span style={valueStyle}>{od.orderPlaced}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Assigned:</span>
              <span style={valueStyle}>{od.assigned}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Applied:</span>
              <span style={valueStyle}>{od.applied}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Dispatched:</span>
              <span style={valueStyle}>{od.dispatched}</span>
            </div>
            <div style={detailRowStyle}>
              <span style={labelStyle}>Delivered:</span>
              <span style={valueStyle}>{od.delivered}</span>
            </div>

            <div style={{ marginTop: 24 }}>
              <Tabs
                defaultActiveKey="case"
                items={[
                  {
                    key: "case",
                    label: "Case & Customer Details",
                    children: (
                      <div style={{ background: "#f5f5f5", borderRadius: 8, padding: "16px 20px" }}>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>Case Number:</span>
                          <span style={infoValueStyle}>{od.caseNumber}</span>
                        </div>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>Legal Name:</span>
                          <span style={infoValueStyle}>{od.legalName}</span>
                        </div>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>Name:</span>
                          <span style={infoValueStyle}>{od.name}</span>
                        </div>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>Email:</span>
                          <span style={infoValueStyle}>{od.email}</span>
                        </div>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>Phone:</span>
                          <span style={infoValueStyle}>{od.phone}</span>
                        </div>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>Delivery Feedback:</span>
                          <span style={infoValueStyle}>{od.deliveryFeedback || ""}</span>
                        </div>
                        <div style={{ fontSize: 14, color: "#333", marginTop: 4 }}>
                          • Issue: {od.issue}
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "address",
                    label: "Address",
                    children: (
                      <div style={{ background: "#f5f5f5", borderRadius: 8, padding: "16px 20px" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                          <Button icon={<CopyOutlined />} size="small" style={{ fontSize: 12 }}>
                            Copy Address
                          </Button>
                        </div>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>Pincode:</span>
                          <span style={infoValueStyle}>{od.address.pincode}</span>
                        </div>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>Address Line 1:</span>
                          <span style={infoValueStyle}>{od.address.addressLine1}</span>
                        </div>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>Address Line 2:</span>
                          <span style={infoValueStyle}>{od.address.addressLine2}</span>
                        </div>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>City:</span>
                          <span style={infoValueStyle}>{od.address.city}</span>
                        </div>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>District:</span>
                          <span style={infoValueStyle}>{od.address.district}</span>
                        </div>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>State:</span>
                          <span style={infoValueStyle}>{od.address.state}</span>
                        </div>
                        <div style={infoRowStyle}>
                          <span style={infoLabelStyle}>Country:</span>
                          <span style={infoValueStyle}>{od.address.country}</span>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "products",
                    label: "Products",
                    children: (
                      <div>
                        {od.products.map((p: any, i: number) => (
                          <div
                            key={i}
                            style={{
                              background: "#f5f5f5",
                              borderRadius: 8,
                              padding: "16px 20px",
                              marginBottom: 12,
                            }}
                          >
                            <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 14 }}>
                              {p.label}
                            </div>
                            <div style={infoRowStyle}>
                              <span style={infoLabelStyle}>Type:</span>
                              <span style={infoValueStyle}>{p.type}</span>
                            </div>
                            <div style={infoRowStyle}>
                              <span style={infoLabelStyle}>Order Date:</span>
                              <span style={infoValueStyle}>{p.orderDate}</span>
                            </div>
                            <div style={infoRowStyle}>
                              <span style={infoLabelStyle}>File:</span>
                              <span
                                style={{
                                  color: p.file === "N/A" ? "#999" : "#1677ff",
                                  fontWeight: 500,
                                  fontSize: 14,
                                  textDecoration: "underline",
                                }}
                              >
                                {p.file}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ),
                  },
                  {
                    key: "digio",
                    label: "Digio eSign Documents",
                    children: (
                      <div>
                        {od.digioDocuments.length === 0 ? (
                          <div
                            style={{
                              background: "#f5f5f5",
                              borderRadius: 8,
                              padding: "16px 20px",
                              color: "#666",
                              fontSize: 14,
                            }}
                          >
                            No eSign documents found.
                          </div>
                        ) : (
                          od.digioDocuments.map((doc: any, i: number) => (
                            <div
                              key={i}
                              style={{
                                background: "#f5f5f5",
                                borderRadius: 8,
                                padding: "16px 20px",
                                marginBottom: 12,
                              }}
                            >
                              <div style={{ fontWeight: 600, marginBottom: 10, fontSize: 14 }}>
                                {doc.label}
                              </div>
                              <div style={infoRowStyle}>
                                <span style={infoLabelStyle}>Digio ID:</span>
                                <span style={{ ...infoValueStyle, wordBreak: "break-all" }}>
                                  {doc.digioId}
                                </span>
                              </div>
                              <div style={infoRowStyle}>
                                <span style={infoLabelStyle}>Status:</span>
                                <span style={{ fontWeight: 700, color: "#333", fontSize: 14 }}>
                                  {doc.status}
                                </span>
                              </div>
                              <div style={infoRowStyle}>
                                <span style={infoLabelStyle}>Signed Document:</span>
                                <span
                                  style={{
                                    color: "#1677ff",
                                    cursor: "pointer",
                                    fontWeight: 500,
                                    fontSize: 14,
                                    textDecoration: "underline",
                                  }}
                                >
                                  {doc.signedDocument}
                                </span>
                              </div>
                              <div style={infoRowStyle}>
                                <span style={infoLabelStyle}>Audit Log:</span>
                                <span
                                  style={{
                                    color: "#1677ff",
                                    cursor: "pointer",
                                    fontWeight: 500,
                                    fontSize: 14,
                                    textDecoration: "underline",
                                  }}
                                >
                                  {doc.auditLog}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        )}
      </Modal>

      <TagModal open={tagModalOpen} onClose={() => setTagModalOpen(false)} />
      <AssignClerkModal open={assignOpen} onClose={() => setAssignOpen(false)} />
    </>
  );
}