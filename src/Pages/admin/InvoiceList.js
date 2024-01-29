import React, { useEffect, useMemo, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ToggleButton } from "primereact/togglebutton";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { deleteInvoice, printThisInvoice } from "../../store/admin/invoice";

function InvoiceList({ invoiceList, setInvoiceList, jwt, setUpdateData }) {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    setInvoices(invoiceList);
  }, [invoiceList]);
  const balanceTemplate = (rowData) => {
    return (
      <span className="font-bold">{formatCurrency(rowData.totalAmount)}</span>
    );
  };

  const balanceGTemplate = (rowData) => {
    return (
      <span className="font-bold">
        {formatCurrency(rowData.grandTotalAmount)}
      </span>
    );
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleDeleteInvoice = async (id) => {
    const response = await deleteInvoice({ jwt, id });
    if (response) {
      setInvoiceList((prevList) => {
        const filteredList = prevList.filter(
          (invoice) => invoice.invoiceNo !== response.invoiceNo
        );
        return [...filteredList];
      });
    }
  };

  const printInvoice = async (id) => {
    const response = await printThisInvoice({ jwt, id });
  };

  const editInvoice = (data) => {
    setUpdateData(data);
  };

  const allowEdit = (rowData) => {
    return (
      <>
        <span
          className="font-bold pointerS"
          onClick={() => {
            printInvoice(rowData._id);
          }}
        >
          Print
        </span>
        &nbsp;
        <span className="font-bold" onClick={() => editInvoice(rowData)}>
          Edit
        </span>
        &nbsp;
        <span
          className="font-bold pointerS"
          onClick={() => {
            handleDeleteInvoice(rowData._id);
          }}
        >
          Delete
        </span>
      </>
    );
  };

  return (
    <div className="invoice-container">
      <h2>Invoice List</h2>
      <div>
        <DataTable
          value={invoices}
          scrollable
          scrollHeight="1100px"
          className="mt-3"
          paginator
          rows={12}
          dataKey="invoiceNo"
        >
          <Column
            field="invoiceNo"
            filterField="invoiceNo"
            header="Invoice No"
            filter
            filterPlaceholder="Search by Invoice No"
            style={{ minWidth: "180px", backgroundColor: "#fff" }}
            frozen={true}
          ></Column>
          <Column
            field="invoiceTitle"
            header="Invoice Title"
            filter
            filterPlaceholder="Search by Invoice Title"
            style={{ minWidth: "140px" }}
          ></Column>
          <Column
            field="invoiceDate"
            header="Invoice Date"
            style={{ minWidth: "150px" }}
          ></Column>
          <Column
            field="dueDate"
            header="Due Date"
            style={{ minWidth: "150px" }}
          ></Column>
          <Column
            field="businessName"
            header="Business Name"
            style={{ minWidth: "150px" }}
          ></Column>
          <Column
            field="clientName"
            header="Client Name"
            style={{ minWidth: "180px" }}
          ></Column>
          <Column
            field="currency"
            header="Currency"
            filter
            filterPlaceholder="Search by Invoice Title"
            style={{ minWidth: "120px" }}
          ></Column>
          <Column
            sortable
            field="totalAmount"
            header="Total Amount"
            style={{ minWidth: "160px" }}
            alignFrozen="right"
          ></Column>
          <Column
            sortable
            field="totalTax"
            header="Total Tax"
            style={{ minWidth: "130px" }}
            alignFrozen="right"
          ></Column>
          <Column
            sortable
            field="grandTotalAmount"
            header="Grand Total Amount"
            body={balanceGTemplate}
            style={{ minWidth: "200px" }}
            alignFrozen="right"
          ></Column>
          <Column
            body={allowEdit}
            header="Actions"
            headerStyle={{ width: "10%", minWidth: "8rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default InvoiceList;
