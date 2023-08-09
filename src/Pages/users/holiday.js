import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../store/user/holiday";
import "./holiday.css";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import ReadMoreReadLess from "../../helper/readMoreReadLess";
import TitleCase from "../../helper/title-case";

function Holiday(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;
  
  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);
  const data = useSelector((status) => status.userHoliday);
  
  //......pagination.......//
  const handelPagination = (number) => {
    dispatch(getAll({ jwt, pageno: number}));
  };
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

  //.......//
  
  return (
    <>
      <div className="page-section p-4">
        
            <div className="add-departmen chart">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">List All Holidays</h4>
              </div>
              <div className="responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-white">S.No.</th>
                      <th className="text-white"> Name </th>
                      <th className="text-white">Description</th>
                      <th className="text-white">Date</th>
                      <th className="text-white">Total Days</th>
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
                          <td>{(index + 1)}</td>
                          
                          <td><TitleCase text={result.name}/></td>
                          <td><ReadMoreReadLess text={result.description} limit={60}/></td>
                          <td>{result.start_date?result.start_date.slice(0, 10):"n/a"} To {result.end_date?result.end_date.slice(0, 10):'n/a'}</td>
                          <td>{result.end_date && result.start_date?((( new Date(result.end_date)).getTime()- (new Date(result.start_date)).getTime()) / (1000 * 3600 * 24))+1:"n/a"}</td>
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

export default Holiday;
