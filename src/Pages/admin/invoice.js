import React, { useEffect, useState } from "react";
import AddInvoice from "./AddInvoice.js"; // Import your AddInvoice component
import InvoiceList from "./InvoiceList.js"; // Import your InvoiceList component
import {
  fetchAllInvoice,
  fetchCurrencyUnit,
} from "../../store/admin/invoice.js";

function Invoice(props) {
  const jwt = props.jwt;
  const [updateData, setUpdateData] = useState(null);
  const [currencyExchange, setCurrencyExchange] = useState({
    mainCurrencyCode: "",
    currencies: [],
  });
  const [invoiceList, setInvoiceList] = useState([]);

  const fetchExistingInvoice = async (unit) => {
    const response = await fetchAllInvoice({ jwt,unit });
    setInvoiceList(response);
  };
  const fetchCurrencyExchangeUnit = async (unit) => {
    const response = await fetchCurrencyUnit(unit);
    setCurrencyExchange((prevVal) => ({
      currencies: response.currencies,
      mainCurrencyCode: response.mainCurrencyCode, 
    }));
  };
  useEffect(() => {
    fetchCurrencyExchangeUnit();
    fetchExistingInvoice();
  }, []);
  useEffect(() => {
    fetchCurrencyExchangeUnit(currencyExchange.mainCurrencyCode);
    fetchExistingInvoice(currencyExchange.mainCurrencyCode);
  },[currencyExchange.mainCurrencyCode])
  return (
    <div className="page-section p-4">
      <div className="row">
        <div className="col-xl-4 col-lg-5 col-md-12 col-12">
          <AddInvoice
            setInvoiceList={setInvoiceList}
            jwt={jwt}
            updateData={updateData}
            setUpdateData={setUpdateData}
            currencyExchange={currencyExchange}
          />
        </div>
        <div className="col-xl-8 col-lg-7 col-md-12 col-12">
          <InvoiceList
            invoiceList={invoiceList}
            setInvoiceList={setInvoiceList}
            jwt={jwt}
            setUpdateData={setUpdateData}
            currencyExchange={currencyExchange}
            setCurrencyExchange={setCurrencyExchange}
          />
        </div>
      </div>
    </div>
  );
}

export default Invoice;
