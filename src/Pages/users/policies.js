import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../store/user/policy";
import "./policies.css";
import {Table, Pagination} from "react-bootstrap"

function Policies(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;

  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);
  const data = useSelector((status) => status.userPolicy);
  //......pagination.......//
  let items = [];
  for (let number = 1; number <= data.totalpages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === data.currentpage}
        onClick={() => handelPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  const handelPagination = (number) => {
    dispatch(getAll({ jwt, pageno: number }));
  };

  return (
    <>
      <div className="page-section p-4">
        <div className="employees chart">
          <h4 className="mb-0">List All Policies</h4>
          <div className="row align-items-center justify-content-between mt-4">
            <div className="col-lg-3 col-12"></div>
            <div className="col-lg-3 col-12"></div>
          </div>
          <div className="responsive mt-4">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-white">S.No.</th>
                  <th className="text-white">Title</th>
                  <th className="text-white">Description</th>
                  <th className="text-white">Attachment</th>
                </tr>
              </thead>
              <tbody>
                {data.isLoading ? (
                  <tr key={0} className="text-center">
                    <td colSpan={8}>Loading...</td>
                  </tr>
                ) : data.allData.length > 0 ? (
                  data.allData.map((result, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      <td>{result.title}</td>
                      <td>{result.description}</td>
                      <td className="d-lg-block d-flex align-items-center">
                        {result.attachment_link ? (
                          <a
                            href={result.attachment_link}
                            className="ms-2 btn btn-success text-white"
                            target="_blank"
                            rel="noreferrer"
                          >
                            View
                          </a>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr key={0}>
                    <td colSpan={8} className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <Pagination>{items}</Pagination>
        </div>
      </div>
    </>
  );
}

export default Policies;
