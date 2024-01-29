import React, { useEffect, useState } from "react";
import AddInvoice from "./AddInvoice.js"; // Import your AddInvoice component
import InvoiceList from "./InvoiceList.js"; // Import your InvoiceList component
import { fetchAllInvoice } from "../../store/admin/invoice.js";

function Invoice(props) {
  const jwt = props.jwt;
  const [updateData, setUpdateData] = useState(null);
  const [invoiceList, setInvoiceList] = useState([
    // {
    //   invoiceNo: "0FECOAMASMAIGCCA",
    //   invoiceTitle: "Consequuntur delectu",
    //   invoiceDate: "2024-1-24",
    //   dueDate: "1972-09-13",
    //   businessName: "Excepteur commodi do",
    //   businessAddress: {
    //     address: "Minus eligendi asper",
    //     state: "Deserunt similique a",
    //     country: "Est enim nostrud est",
    //     pincode: "2",
    //   },
    //   clientName: "Aliquam architecto p",
    //   currency: "Est pariatur Enim r",
    //   items: [
    //     {
    //       projectName: "Molestias est vel vo",
    //       quantity: "21",
    //       amount: "37",
    //       description: "Consectetur tempore",
    //     },
    //     {
    //       projectName: "Inventore consequatu",
    //       quantity: "7",
    //       amount: "22",
    //       description: "In optio earum reru",
    //     },
    //   ],
    //   totalAmount: 931,
    //   attachments: [],
    //   additionalInfo: "Iure sit aliquam qu",
    //   contactDetails: "Nemo officia dicta v",
    //   saveAsDraft: false,
    // },
    // {
    //   invoiceNo: "RRBCOAMASMCICOSS",
    //   invoiceTitle: "Quo eiusmod ab animi",
    //   invoiceDate: "2024-1-24",
    //   dueDate: "1996-10-18",
    //   businessName: "Doloremque ipsa non",
    //   businessAddress: {
    //     address: "Optio eaque est con",
    //     state: "Quia in itaque aperi",
    //     country: "Dolores unde modi es",
    //     pincode: "78",
    //   },
    //   clientName: "Dolorem quam animi ",
    //   currency: "Tempora officia corp",
    //   items: [
    //     {
    //       projectName: "Ut est reprehenderit",
    //       quantity: "68",
    //       amount: "87",
    //       description: "Consequat Cillum al",
    //     },
    //     {
    //       projectName: "Excepturi qui volupt",
    //       quantity: "90",
    //       amount: "48",
    //       description: "Consequatur Tempori",
    //     },
    //     {
    //       projectName: "Ad non placeat dolo",
    //       quantity: "44",
    //       amount: "90",
    //       description: "Ut aut quia laborum",
    //     },
    //   ],
    //   totalAmount: 14196,
    //   attachments: [],
    //   additionalInfo: "Qui corporis ut hic ",
    //   contactDetails: "Nostrum quis eaque s",
    //   saveAsDraft: false,
    // },
    // {
    //   invoiceNo: "X2PCOAMASMEAGMKS",
    //   invoiceTitle: "Pariatur Sint simil",
    //   invoiceDate: "2024-1-24",
    //   dueDate: "1997-03-06",
    //   businessName: "Assumenda natus ulla",
    //   businessAddress: {
    //     address: "Do proident ipsum ",
    //     state: "Soluta beatae qui pa",
    //     country: "Ut voluptatem autem ",
    //     pincode: "54",
    //   },
    //   clientName: "Ut duis nemo quisqua",
    //   currency: "Ratione distinctio ",
    //   items: [
    //     {
    //       projectName: "In blanditiis beatae",
    //       quantity: "68",
    //       amount: "43",
    //       description: "Omnis autem necessit",
    //     },
    //   ],
    //   totalAmount: 2924,
    //   attachments: [],
    //   additionalInfo: "Temporibus eiusmod m",
    //   contactDetails: "Dignissimos facere q",
    //   saveAsDraft: false,
    // },
    // {
    //   invoiceNo: "FBACOAMASOOIEAAG",
    //   invoiceTitle: "Sequi aut harum dolo",
    //   invoiceDate: "2024-1-24",
    //   dueDate: "2010-11-07",
    //   businessName: "Exercitationem offic",
    //   businessAddress: {
    //     address: "Reiciendis ut labore",
    //     state: "Ut omnis eum qui con",
    //     country: "Duis quam sit dolor",
    //     pincode: "71",
    //   },
    //   clientName: "Adipisicing necessit",
    //   currency: "EUR",
    //   items: [
    //     {
    //       projectName: "Dolore aliquam quis ",
    //       quantity: "4",
    //       amount: "87",
    //       description: "Atque sunt omnis si",
    //     },
    //     {
    //       projectName: "Aut voluptatem ipsum",
    //       quantity: "65",
    //       amount: "84",
    //       description: "Possimus repellendu",
    //     },
    //   ],
    //   totalAmount: 5808,
    //   attachments: [],
    //   additionalInfo: "Cupiditate sapiente ",
    //   contactDetails: "Ut sapiente rerum es",
    //   saveAsDraft: false,
    // },
    // {
    //   invoiceNo: "EZRCOAMASOQCKEEM",
    //   invoiceTitle: "Sit magnam quod dign",
    //   invoiceDate: "2024-1-24",
    //   dueDate: "2018-09-01",
    //   businessName: "Ducimus culpa quos ",
    //   businessAddress: {
    //     address: "Sunt aliquid animi",
    //     state: "Maiores architecto o",
    //     country: "Dolor deleniti eum q",
    //     pincode: "56",
    //   },
    //   clientName: "Quibusdam recusandae",
    //   currency: "ZAR",
    //   items: [
    //     {
    //       projectName: "Sit recusandae Cup",
    //       quantity: "37",
    //       amount: "68",
    //       description: "Ipsum voluptatum am",
    //     },
    //   ],
    //   totalAmount: 2516,
    //   attachments: [],
    //   additionalInfo: "Cillum necessitatibu",
    //   contactDetails: "Temporibus eos qui v",
    //   saveAsDraft: false,
    // },
  ]);

  const fetchExistingInvoice = async () => {
    const response = await fetchAllInvoice({ jwt });
    setInvoiceList(response);
  };
  useEffect(() => {
    fetchExistingInvoice();
  }, []);
  return (
    <div className="page-section p-4">
      <div className="row">
        <div className="col-xl-4 col-lg-5 col-md-12 col-12">
          <AddInvoice setInvoiceList={setInvoiceList} jwt={jwt} updateData={updateData} setUpdateData={setUpdateData}/>
        </div>
        <div className="col-xl-8 col-lg-7 col-md-12 col-12">
          <InvoiceList invoiceList={invoiceList} setInvoiceList={setInvoiceList} jwt={jwt} setUpdateData={setUpdateData}/>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
