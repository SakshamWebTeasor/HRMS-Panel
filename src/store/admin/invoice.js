// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import TokenExpiredError from "../checkingToken";
const env = require("../../env.json");
const notify = (x, iserror = false) =>
  iserror
    ? toast.error(x, { theme: "colored" })
    : toast.success(x, { theme: "colored" });

export const fetchAllInvoice = async (data) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: data.jwt,
  };
  let url = env.ADMIN_API_URL + "invoice";
  let option = {
    method: "GET",
    mode: "cors",
    headers: header,
  };
  try {
    const response = await (await fetch(url, option)).json();
    if (response.status === "success") {
      return response.data;
    } else if (response.status === "token_expire") {
      TokenExpiredError();
      return false;
    } else {
      for (const element of response.errors) {
        notify(element.msg, true);
      }
      return false;
    }
  } catch (error) {
    notify("no invoices found", true);
    console.log(error);
    return false;
  }
};

export const deleteInvoice = async (data) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: data.jwt,
  };
  let url = env.ADMIN_API_URL + `invoice/${data.id}`;
  let option = {
    method: "DELETE",
    mode: "cors",
    headers: header,
  };
  try {
    const response = await (await fetch(url, option)).json();
    if (response.status === "deleted successfully") {
      notify(response.status);
      return response.data;
    } else if (response.status === "token_expire") {
      TokenExpiredError();
      return false;
    } else {
      for (const element of response.errors) {
        notify(element.msg, true);
      }
      return false;
    }
  } catch (error) {
    notify("no such invoice found to delete", true);
    console.log(error);
    return false;
  }
};

export const printThisInvoice = async (data) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: data.jwt,
  };
  let url = env.ADMIN_API_URL + `invoice/pdf/${data.id}`;
  let option = {
    method: "GET",
    mode: "cors",
    headers: header,
  };
  try {
    const response = await fetch(url, option)
    return response
  } catch (error) {
    notify("no such invoice found to delete", true);
    console.log(error);
    return false;
  }
};

export const fetchThisInvoice = async (data) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: data.jwt,
  };
  let url = env.ADMIN_API_URL + `invoice/${data.id}`;
  let option = {
    method: "GET",
    mode: "cors",
    headers: header,
  };
  try {
    const response = await (await fetch(url, option)).json();
    if (response.status === "success") {
      return response.data;
    } else if (response.status === "token_expire") {
      TokenExpiredError();
      return false;
    } else {
      for (const element of response.errors) {
        notify(element.msg, true);
      }
      return false;
    }
  } catch (error) {
    notify("no such invoice found", true);
    console.log(error);
    return false;
  }
};

export const addInvoice = async (data) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: data.jwt,
  };
  let url = env.ADMIN_API_URL + `invoice`;
  let option = {
    method: "POST",
    mode: "cors",
    headers: header,
    body: JSON.stringify(data.invoiceData),
  };
  try {
    const response = await (await fetch(url, option)).json();
    if (response.status === "successfull") {
      notify(`Added Successfully`);
      return response.data;
    } else if (response.status === "token_expire") {
      TokenExpiredError();
      return false;
    } else {
      for (const element of response.errors) {
        notify(element.msg, true);
      }
      return false;
    }
  } catch (error) {
    notify("Someting Wrong !", true);
    console.log(error);
    return false;
  }
};

export const editInvoice = async (data) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: data.jwt,
  };
  let url = env.ADMIN_API_URL + `invoice/${data.invoiceData._id}`;
  let option = {
    method: "PUT",
    mode: "cors",
    headers: header,
    body: JSON.stringify(data.invoiceData),
  };
  try {
    const response = await (await fetch(url, option)).json();
    if (response.status === "updated successfully") {
      notify(response.status);
      return response.data;
    } else if (response.status === "token_expire") {
      TokenExpiredError();
      return false;
    } else {
      for (const element of response.errors) {
        notify(element.msg, true);
      }
      return false;
    }
  } catch (error) {
    notify("Someting Wrong !", true);
    console.log(error);
    return false;
  }
};
