import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecord, getOne, getAll, updateRecord, deleteRecord } from "../../store/admin/leave-type";
import "./designation.css";
import { Spinner, Modal, Table, Button, Form } from "react-bootstrap";
import TitleCase from "../../helper/title-case";

function LeaveType(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;

  const nameref = useRef();
  const noOfLeaveRef = useRef();
  const typeRef = useRef();
  const editname = useRef();
  const edittypeRef = useRef();
  const editnoOfLeaveRef = useRef();
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const data = useSelector((status) => status.leaveType);
  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);

  //... create leave....//
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addRecord({
        jwt,
        name: nameref.current.value,
        type: typeRef.current.value,
        noOfLeaves: noOfLeaveRef.current.value,
      })
    );
    
  };
  //... update leave ....//
  useEffect(() => {
    if (!data.isError) {
      setShow(false);
      nameref.current.value = "";
      typeRef.current.value = "";
      noOfLeaveRef.current.value = null;
      }
  }, [data.isError]);

  const update = (e) => {
    e.preventDefault();
    dispatch(
      updateRecord({
        jwt,
        id: data.singledata[0]._id,
        name: editname.current.value,
        type: edittypeRef.current.value,
        noOfLeaves: editnoOfLeaveRef.current.value,
      })
    );
  };

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

  //edite...//
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (_id) => {
    setShow(true);
    dispatch(getOne(_id));
  };
 //...delete..//
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
              <h4 className="mb-4">Add New Leave Type</h4>
              <Form onSubmit={handelSubmit}>
                <Form.Group className="my-3">
                  <Form.Label>
                    Leave Title <span className="text-danger">*</span>{" "}
                  </Form.Label>
                  <Form.Control
                    name="title"
                    type="text"
                    placeholder="Title"
                    ref={nameref}
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "name" ? (
                            <TitleCase key="editerr-1" text={err.msg} />
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
                    Leave Type <span className="text-danger">*</span>{" "}
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    ref={typeRef}
                    required
                  >
                    <option value={""}>select</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </Form.Select>
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "type" ? (
                            <TitleCase key="editerr-2" text={err.msg} />
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
                    Total Days <span className="text-danger">*</span>{" "}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    ref={noOfLeaveRef}
                    min={1}
                    max={365}
                    placeholder="Days"
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "total" ? (
                            <TitleCase key="editerr-3" text={err.msg} />
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
                <h4 className="mb-0">List All Leave Types</h4>
              </div>

              <div className="responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-white">S.No.</th>
                      <th className="text-white">Name</th>
                      <th className="text-white">Type</th>
                      <th className="text-white">Total&#10240;Days</th>
                      <th className="text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.isLoading ? (
                      <tr key={0} className="text-center">
                        <td colSpan={6}>Loading...</td>
                      </tr>
                    ) : data.allData.length > 0 ? (
                      data.allData.map((result, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {result.name.charAt(0).toUpperCase() +
                              result.name.slice(1)}
                          </td>
                          <td>
                            {result.type.charAt(0).toUpperCase() +
                              result.type.slice(1)}
                          </td>
                          <td>{result.total}</td>
                          <td className="d-lg-block d-flex align-items-center">
                            <Button
                              onClick={() => {
                                handleShow(result._id);
                              }}
                              className="btn btn-warning text-white"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              className="ms-2"
                              onClick={() => {
                                handleDeleteShow(result._id);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                          
                        </tr>
                      ))
                    ) : (
                      <tr key={0}>
                        <td colSpan={6} className="text-center">
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Leave Type </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={update}>
            <Form.Group className="my-3">
              <Form.Label>
                Leave Title <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                aria-label="Default select example"
                ref={editname}
                placeholder="Title"
                defaultValue={
                  data.singledata.length > 0 ? data.singledata[0].name : ""
                }
                required
              ></Form.Control>
              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                      err.param === "name" ? (
                        <TitleCase key="editerr-1" text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Leave Type <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={edittypeRef}
                required
                defaultValue={
                  data.singledata.length > 0 ? data.singledata[0].type : ""
                }
              >
                <option value={""}>select</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </Form.Select>
              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                      err.param === "type" ? (
                        <TitleCase key="editerr-2" text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Total Days<span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="number"
                ref={editnoOfLeaveRef}
                defaultValue={
                  data.singledata.length > 0 ? data.singledata[0].total : ""
                }
                min={1}
                max={365}
                required
                placeholder="Days"
              />
              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                      err.param === "total" ? (
                        <TitleCase key="editerr-3" text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            {data.isEditSubmitting ? (
              <Button variant="danger" className="mt-4">
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                &#10240;Update
              </Button>
            ) : (
              <Button type="submit" variant="danger" className="mt-4">
                Update
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
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

export default LeaveType;
