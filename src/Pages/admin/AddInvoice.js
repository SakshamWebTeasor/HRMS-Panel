import React, { useEffect, useState } from "react";
import "./invoice.css"; // Import your CSS file for additional styling if needed
import TitleCase from "../../helper/title-case";
import { addInvoice, editInvoice } from "../../store/admin/invoice";

const AddInvoice = ({ setInvoiceList, jwt, updateData, setUpdateData }) => {
  const dateConverter = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}-${month}-${day}`;
  };

  const generateInvoiceNo = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let invoiceNo = "";
    for (let i = 0; i < 3; i++) {
      invoiceNo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const timestamp = Date.now();
    const pattern = "ACEGIKMOQSUWY"; // Your desired pattern
    const timestampString = timestamp.toString();
    const uniqueString = Array.from(
      timestampString,
      (char) => pattern[parseInt(char)]
    );
    return invoiceNo + uniqueString.join("");
  };

  const InitialData = {
    invoiceNo: generateInvoiceNo(),
    invoiceTitle: "",
    invoiceDate: dateConverter(Date.now()),
    dueDate: dateConverter(Date.now()),
    businessName: "",
    businessAddress: {
      address: "",
      state: "",
      country: "",
      pincode: "",
    },
    clientName: "",
    currency: "",
    items: [
      {
        projectName: "",
        quantity: 1,
        amount: 1.0,
        description: "",
      },
    ],
    tax: [
      {
        taxName: "",
        taxRate: 0,
      },
    ],
    totalTax: 0,
    totalAmount: 1,
    grandTotalAmount: 1,
    attachments: [],
    additionalInfo: "",
    contactDetails: "",
    saveAsDraft: false,
  };

  const [invoiceData, setInvoiceData] = useState(InitialData);

  const [lastDueData, setLastDueData] = useState(null);

  const refetch = () => {
    setInvoiceData((prevData) => {
      return { ...prevData, invoiceNo: generateInvoiceNo() };
    });
  };

  const handleInputChange = (field, value) => {
    const fields = field.split(".");
    setInvoiceData({
      ...invoiceData,
      [fields[0]]: fields[1]
        ? {
            ...invoiceData[fields[0]],
            [fields[1]]: value,
          }
        : value,
    });
  };

  const handleItemChange = (index, field, value, x) => {
    if (x === "tax") {
      const newTax = [...invoiceData.tax];
      let changeInTax = field == "taxRate";
      value = changeInTax ? parseInt(value) : value;
      if (!isNaN(value)) value = value < 0 ? 0 : value;
      const prevTax = newTax[index];
      newTax[index] = {
        ...newTax[index],
        [field]: value,
      };
      let taxValue = value;
      if (field == "taxName") {
        changeInTax = true;
        switch (newTax[index].taxName) {
          case "GST":
            newTax[index].taxRate = 18;
            taxValue = 18;
            break;
          case "HST":
            newTax[index].taxRate = 13;
            taxValue = 13;
            break;
          case "TAX":
            newTax[index].taxRate = 10;
            taxValue = 10;
            break;
          case "VAT":
            newTax[index].taxRate = 5;
            taxValue = 5;
            break;
          case "SST":
            newTax[index].taxRate = 5;
            taxValue = 5;
            break;
          case "PPN":
            newTax[index].taxRate = 10;
            taxValue = 10;
            break;
          case "IGST":
            newTax[index].taxRate = 18;
            taxValue = 18;
            break;
          default:
            newTax[index].taxRate = 0;
            taxValue = 0;
            break;
        }
      }
      setInvoiceData({
        ...invoiceData,
        tax: newTax,
        totalTax: changeInTax
          ? invoiceData.totalTax - prevTax.taxRate + taxValue
          : invoiceData.totalTax,
      });
      return;
    }
    const newItems = [...invoiceData.items];
    let prevAmount = 0;
    let changeInAmount = false;
    if (field == "quantity" || field == "amount") {
      if (value < 1) value = 1;
      changeInAmount = true;
      const prevItem = newItems[index];
      prevAmount = prevItem.amount * prevItem.quantity;
    }
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    const newAmount = newItems[index].amount * newItems[index].quantity;
    setInvoiceData({
      ...invoiceData,
      items: newItems,
      totalAmount: changeInAmount
        ? invoiceData.totalAmount - prevAmount + newAmount
        : invoiceData.totalAmount,
    });
  };

  const handleAddItem = (x) => {
    if (x === "tax") {
      const defaultTax = {
        taxName: "",
        taxRate: 0.0,
      };
      setInvoiceData({
        ...invoiceData,
        tax: [...invoiceData.tax, { ...defaultTax }],
        totalTax: invoiceData.totalTax + defaultTax.taxRate,
      });
      return;
    }
    const defaultValue = {
      projectName: "",
      quantity: 1,
      amount: 1.0,
      description: "",
    };
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { ...defaultValue }],
      totalAmount:
        invoiceData.totalAmount + defaultValue.amount * defaultValue.quantity,
    });
  };

  const handleRemoveItem = (index, x) => {
    if (x === "tax") {
      const newTax = [...invoiceData.tax];
      const taxTotalToDecrease = newTax[index].taxRate;
      newTax.splice(index, 1);
      setInvoiceData({
        ...invoiceData,
        tax: newTax,
        totalTax: invoiceData.totalTax - taxTotalToDecrease,
      });
      return;
    }
    const newItems = [...invoiceData.items];
    const amountToDecrease = newItems[index].amount * newItems[index].quantity;
    newItems.splice(index, 1);
    setInvoiceData({
      ...invoiceData,
      items: newItems,
      totalAmount: invoiceData.totalAmount - amountToDecrease,
    });
  };

  const handleCreateInvoice = async () => {
    const response = await addInvoice({ invoiceData, jwt });
    if (response) {
      setInvoiceData(InitialData);
      setInvoiceList((prevList) => {
        const filteredList =
          prevList.length > 0
            ? prevList.filter(
                (invoice) => invoice.invoiceNo !== response.invoiceNo
              )
            : [];
        return [...filteredList, response];
      });
    }
  };

  const handleEditInvoice = async () => {
    const response = await editInvoice({ invoiceData, jwt });
    if (response) {
      setUpdateData(null);
      setInvoiceList((prevList) => {
        const indexToUpdate = prevList.findIndex(
          (invoice) => invoice.invoiceNo === response.invoiceNo
        );
        if (indexToUpdate !== -1) {
          prevList[indexToUpdate] = response;
        } else {
          console.log("Element not found");
        }
        return prevList;
      });
    }
  };

  useEffect(() => {
    if (updateData) {
      setInvoiceData(updateData);
      setLastDueData(updateData.dueDate);
    } else if (updateData == null) {
      setInvoiceData(InitialData);
      setLastDueData(null);
    }
  }, [updateData]);

  useEffect(() => {
    if (invoiceData.totalTax) {
      setInvoiceData((prevAmount) => {
        return {
          ...prevAmount,
          grandTotalAmount:
            prevAmount.totalAmount +
            (prevAmount.totalAmount * prevAmount.totalTax) / 100,
        };
      });
    }
  }, [invoiceData.totalTax]);

  return (
    <div className="invoice-container heightFix">
      <h2>{updateData ? "Edit Invoice" : "Add Invoice"}</h2>
      {updateData ? (
        <></>
      ) : (
        <div className="projects mb d-flex justify-content-end">
          <button onClick={() => refetch()}>Generate Unique Code</button>
        </div>
      )}
      {/* General Information */}
      <div className="general-info">
        <div className="mb-3 mt-4 d-flex justify-content-between">
          <span>Unique Invoice Code:</span>
          <strong>
            <TitleCase text={invoiceData.invoiceNo} />
          </strong>
        </div>
        <div>
          <label>Invoice Title</label>
          <input
            type="text"
            value={invoiceData.invoiceTitle}
            onChange={(e) => handleInputChange("invoiceTitle", e.target.value)}
          />
        </div>
        <div className="total-amount d-flex justify-content-between mb-4">
          <span>Invoice Date:</span>
          <strong>{invoiceData.invoiceDate}</strong>
        </div>
        {updateData ? (
          <div className="total-amount d-flex justify-content-between mb-4">
            <span>Last Due Date:</span>
            <strong>{lastDueData}</strong>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          <label>{updateData ? "Your New Due Date*" : "Due Date*"}</label>
          <input
            type="date"
            value={invoiceData.dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
          />
        </div>
      </div>

      {/* Business Information */}
      <div className="business-info">
        <div>
          <label>Business Name</label>
          <input
            type="text"
            value={invoiceData.businessName}
            onChange={(e) => handleInputChange("businessName", e.target.value)}
          />
        </div>
        <div className="address-info">
          <label>Business Address</label>
          <div className="address-fields">
            {Object.keys(invoiceData.businessAddress).map((key, index) => (
              <div key={index} className="w-100">
                <input
                  type={key === "pincode" ? "number" : "text"}
                  value={invoiceData.businessAddress[key]}
                  onChange={(e) =>
                    handleInputChange(`businessAddress.${key}`, e.target.value)
                  }
                  placeholder={key}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Information */}
      <div className="client-info">
        <label>Client Name</label>
        <input
          type="text"
          value={invoiceData.clientName}
          onChange={(e) => handleInputChange("clientName", e.target.value)}
        />
      </div>

      {/* Currency Information */}
      <div className="currency-info">
        <label>Currency</label>
        <select
          className="form-control form-select"
          value={invoiceData.currency}
          onChange={(e) => handleInputChange("currency", e.target.value)}
        >
          <option value="USD">United States Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="GBP">British Pound Sterling (GBP)</option>
          <option value="JPY">Japanese Yen (JPY)</option>
          <option value="CHF">Swiss Franc (CHF)</option>
          <option value="CAD">Canadian Dollar (CAD)</option>
          <option value="AUD">Australian Dollar (AUD)</option>
          <option value="INR">Indian Rupee (INR)</option>
          <option value="CNY">Chinese Yuan (CNY)</option>
          <option value="ZAR">South African Rand (ZAR)</option>
          <option value="BRL">Brazilian Real (BRL)</option>
          <option value="RUB">Russian Ruble (RUB)</option>
          <option value="AED">Arab Emirates Dirham (AED)</option>
        </select>
      </div>

      {/* Projects */}
      <div className="projects">
        <h2>Projects</h2>
        {invoiceData.items.map((item, index) => (
          <div key={index} className="project-info">
            <label>Project Name</label>
            <input
              type="text"
              value={item.projectName}
              onChange={(e) =>
                handleItemChange(index, "projectName", e.target.value)
              }
            />
            <label>Quantity</label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
            />
            <label>Amount</label>
            <input
              type="number"
              value={item.amount}
              onChange={(e) =>
                handleItemChange(index, "amount", e.target.value)
              }
            />
            <label>Description</label>
            <input
              type="text"
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
            />
            <button onClick={() => handleRemoveItem(index)}>Remove Item</button>
          </div>
        ))}
        <div className="d-flex justify-content-end">
          <button onClick={handleAddItem} className="mt-2">
            Add Project
          </button>
        </div>
      </div>

      <div className="total-amount d-flex justify-content-between mb-4">
        <span>Total Amount:</span>
        <strong>{invoiceData.totalAmount}</strong>
      </div>

      <div className="projects">
        <h3>Taxes</h3>
        {invoiceData.tax.map((item, index) => (
          <div key={index} className="project-info">
            <label>Tax Name</label>
            {/* <input
              type="text"
              value={item.taxName}
              onChange={(e) =>
                handleItemChange(index, "taxName", e.target.value, "tax")
              }
            /> */}
            <select
              className="form-control form-select mb15"
              value={item.taxName}
              onChange={(e) =>
                handleItemChange(index, "taxName", e.target.value, "tax")
              }
            >
              <option value="">custom tax</option>
              <option value="None">None</option>
              <option value="GST">GST</option>
              <option value="IGST">IGST</option>
              <option value="VAT">VAT</option>
              <option value="PPN">PPN</option>
              <option value="SST">SST</option>
              <option value="HST">HST</option>
              <option value="TAX">TAX</option>
            </select>
            {item.taxName !== "None" &&
              item.taxName !== "GST" &&
              item.taxName !== "IGST" &&
              item.taxName !== "VAT" &&
              item.taxName !== "PPN" &&
              item.taxName !== "SST" &&
              item.taxName !== "HST" &&
              item.taxName !== "TAX" && (
                <input
                  type="text"
                  placeholder="Enter custom tax name"
                  value={item.taxName}
                  onChange={(e) =>
                    handleItemChange(index, "taxName", e.target.value, "tax")
                  }
                />
              )}
            <label>Rate (in %)</label>
            <input
              type="number"
              disabled={
                item.taxName.includes("GST") ||
                item.taxName.includes("HST") ||
                item.taxName.includes("TAX") ||
                item.taxName.includes("VAT") ||
                item.taxName.includes("SST") ||
                item.taxName.includes("PPN") ||
                item.taxName.includes("IGST") ||
                item.taxName.includes("None")
              }
              value={item.taxRate}
              onChange={(e) =>
                handleItemChange(index, "taxRate", e.target.value, "tax")
              }
            />
            {index !== 0 && <button onClick={() => handleRemoveItem(index, "tax")}>
              Remove This Tax
            </button>}
          </div>
        ))}
        <div className="d-flex justify-content-end">
          <button onClick={() => handleAddItem("tax")} className="mt-2">
            Add More Tax Varieties
          </button>
        </div>
      </div>

      <div className="total-amount d-flex justify-content-between mb-4">
        <span>Total Tax Rate:</span>
        <strong>{invoiceData.totalTax}</strong>
      </div>

      <div className="total-amount d-flex justify-content-between mb-4">
        <span>Grand Total Amount:</span>
        <strong>{invoiceData.grandTotalAmount}</strong>
      </div>

      {/* Additional Information */}
      <div className="additional-info">
        <label>Additional Info</label>
        <input
          type="text"
          value={invoiceData.additionalInfo}
          onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
        />
      </div>

      {/* Contact Details */}
      <div className="contact-details">
        <label>Contact Details</label>
        <input
          type="text"
          value={invoiceData.contactDetails}
          onChange={(e) => handleInputChange("contactDetails", e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-end projects">
        <button
          onClick={() =>
            updateData ? handleEditInvoice() : handleCreateInvoice()
          }
        >
          {updateData ? "Update Invoice" : "Create Invoice"}
        </button>
      </div>
    </div>
  );
};

export default AddInvoice;
