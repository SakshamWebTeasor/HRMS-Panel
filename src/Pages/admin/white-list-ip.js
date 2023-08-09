import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, getAll, deleteRecord } from "../../store/admin/white-list-ip";
import "./designation.css";
import { Spinner, Table, Button, Form, Modal } from "react-bootstrap";
import TitleCase from "../../helper/title-case";
import { LocaDateFormate } from "../../helper/time-set-localtimezone";
import { useState } from "react";

function WhiteListIP(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;

  const labelRef = useRef();
  const ipRef = useRef();
  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState()

  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);
  const data = useSelector((status) => status.whiteListIP);
  //...submit....//
  const handelSubmit = (e) => {
    e.preventDefault();
    
    dispatch(
      addRecord({
        jwt,
        label: labelRef.current.value,
        ip: ipRef.current.value,
      })
    );
  };
  //... Update submit ...//
  useEffect(() => {
    if (!data.isError) {
      labelRef.current.value = "";
      ipRef.current.value = null;
    }
  }, [data.isError]);

  //delete.....
  const handeldelete = () => {
    dispatch(
      deleteRecord({
        jwt,
        id,
        pageno:
          data.allData.length === 1 && data.currentpage > 1
            ? Number(data.currentpage) - 1
            : data.currentpage,
      })
    );
  };
  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleDeleteShow = (id) => {
    setShowDelete(true);
    setId(id);
  };

  return (
    <>
      <div className="page-section p-4">
        <div className="row">
          <div className="col-xl-4 col-lg-5 col-md-12 col-12">
            <div className="add-departmen chart">
              <h4 className="mb-4">Add New IP Address</h4>
              <Form onSubmit={handelSubmit}>
                <Form.Group className="my-3">
                  <Form.Label>
                    Label <span className="text-danger">*</span>{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    aria-label="Default select example"
                    placeholder="Label"
                    ref={labelRef}
                    required
                  />
                    
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "label" ? (
                            <TitleCase key="err-1" text={err.msg} />
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </span>
                </Form.Group>
                <Form.Group
                  className="my-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    IP <span className="text-danger">*</span>{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    ref={ipRef}
                    placeholder="IP Address (127.10.98)"
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "ip" ? (
                            <TitleCase key="err-2" text={err.msg} />
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </span>
                </Form.Group>
                {data.isSubmitting ? (
                  <Button variant="primary" className="mt-4">
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    &#10240;Save
                  </Button>
                ) : (
                  <Button type="submit" variant="danger" className="mt-4">
                    Save
                  </Button>
                )}
              </Form>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7 col-md-12 col-12">
            <div className="add-departmen chart">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">White List IP</h4>
              </div>
              <div className="responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-white">S.No.</th>
                      <th className="text-white">Label</th>
                      <th className="text-white">IP</th>
                      <th className="text-white">Created&#10240;At</th>
                      <th className="text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.isLoading ? (
                      <tr key={0} className="text-center">
                        <td colSpan={7}>Loading...</td>
                      </tr>
                    ) : data.allData.length > 0 ? (
                      data.allData.map((result, index) => {
                        return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <TitleCase text={result.label} />
                          </td>
                          <td>{result.ip}</td>
                          <td><LocaDateFormate date_arg = {result.created_at}/></td>
                          <td className="d-flex align-items-center">
                              <Button
                                onClick={()=>handleDeleteShow(result._id)}
                                className="btn btn-danger text-white ms-2"
                              >
                                Delete
                              </Button>
                          </td>
                        </tr>
                      )})
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
            </div>
          </div>
        </div>
      </div>
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteClose();
              handeldelete();
            }}
          >
            Yes
          </Button>
          <Button variant="primary" onClick={handleDeleteClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WhiteListIP;
