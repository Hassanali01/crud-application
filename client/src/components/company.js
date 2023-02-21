import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useFormik } from "formik";
import { ValidationSchema } from "./ValidationSchema";
import axios from "axios";
import { Link } from "react-router-dom";

const initailValue = {
  companyName: "",
  companyCeo: "",
  phoneNo: "",
  country: "",
  registrationNo: "",
  city: "",
  address: "",
  postalCode: "",
  landLineNo:""
};

const Company = () => {
  const [show, setShow] = useState(false);
  const [companies,setCompanies] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { values, touched, handleChange, handleBlur, errors, handleSubmit } =
    useFormik({
      initialValues: initailValue,
      validationSchema: ValidationSchema,
      onSubmit:async (values,action) => {
        try {
          const addedUser = await axios.post(
            `/companies/addcompany`,
            {
              companyName:values.companyName,
              companyCeo:values.companyCeo,
              phoneNo:values.phoneNo,
              registrationNo:values.registrationNo,
              country:values.country,
              city:values.city,
              landLineNo:values.landLineNo,
              postalCode:values.postalCode,
              address:values.postalCode
            }
          );
          action.resetForm()
  
          handleClose();
        
     
        } catch (err) {
          console.log(err);
        }
        // setDepartment("")
        // setRole("")
        // setDescription("")
        // setCompanyDetails("");
      }
      
  })
  const getCompany = async () => {
    try {
      const company = await axios.get(`companies/`);
      const res = company.data;
      console.log("addedCompany", res);
      setCompanies(res.companies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getCompany()
   

  },[])
    
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ marginTop: "5%", width: "70%" }}>
        <Card.Body>
          <h2>Company Details</h2>
          <Button onClick={handleShow}>Add Company</Button>
        
          <hr></hr>

          {/* ////////////////////Company Details Modal/////////////////////////// */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Company Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <label htmlFor="companyName">Company Name:</label>
                  <br></br>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="company name..."
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.companyName && touched.companyName ? (
                    <p style={{ color: "red" }}>{errors.companyName}</p>
                  ) : null}
                </Col>
                <Col>
                  <label htmlFor="companyCeo">Company Ceo:</label>
                  <br></br>
                  <input
                    type="text"
                    name="companyCeo"
                    placeholder="company CEO..."
                    value={values.companyCeo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="registrationNo">Registration No:</label>
                  <br></br>
                  <input
                    type="text"
                    name="registrationNo"
                    placeholder="registration no..."
                    value={values.registrationNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Col>
                <Col>
                  <label htmlFor="phoneNo">Phone No:</label>
                  <br></br>
                  <input
                    type="text"
                    name="phoneNo"
                    placeholder="phone no..."
                    value={values.phoneNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 11);
                    }}
                  />
                  {errors.phoneNo && touched.phoneNo ? (
                    <p style={{ color: "red" }}>{errors.phoneNo}</p>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="country">Country:</label>
                  <br></br>
                  <input
                    type="text"
                    name="country"
                    placeholder="country..."
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.country && touched.country ? (
                    <p style={{ color: "red" }}>{errors.country}</p>
                  ) : null}
                </Col>
                <Col>
                  <label htmlFor="city">City:</label>
                  <br></br>
                  <input
                    type="text"
                    name="city"
                    placeholder="city..."
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.city && touched.city ? (
                    <p style={{ color: "red" }}>{errors.city}</p>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="address">Address:</label>
                  <br></br>
                  <input
                    type="text"
                    name="address"
                    placeholder="address..."
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Col>
                <Col>
                  <label htmlFor="postalCode">Postal code:</label>
                  <br></br>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="postalCode..."
                    value={values.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Col>
              </Row>
              <Row>
            
                <Col>
                  <label htmlFor="landLineNo">LandLine No:</label>
                  <br></br>
                  <input
                    type="number"
                    name="landLineNo"
                    placeholder="landLine no..."
                    value={values.landLineNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                 
                </Col>
            
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

          {/* //////////////////////Created company Card/////////////////// */}
          
          <Container>
            <Row>
              {companies.map((d,i)=>{
                return(
                  <>
                   <Col xs="12" xl="3" lg="4" md="6" sm="6">
                              <Card>
                                <Card.Title
                                  className="id"
                                  style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    marginBottom: "0",
                                    marginTop: "3%",
                                  }}
                                >
                                  Company
                                </Card.Title>
                                <hr></hr>
                                <Card.Body>
                                  <Card.Text
                                    style={{ justifyContent: "center" }}
                                  >
                                      <span style={{ fontWeight: "bold" }}>Name:&nbsp;
                                    </span>
                                    {d.companyName}
                                  </Card.Text>
                                  <Card.Text
                                    style={{ justifyContent: "center" }}
                                  >
                                    <span style={{ fontWeight: "bold" }}>
                                      CEO:&nbsp;
                                    </span>
                                    {d.companyCeo}
                                  </Card.Text>
                                  {/* <Button onClick={modalShow} >Details</Button> */}
                                  <div className="col-auto float-end ms-auto ">
                                    <a
                                      className="btn add-btn "
                                      data-bs-toggle="modal"
                                      data-bs-target="#add_employee"

                                      // onClick={handleShow}
                                    >
                                      <i class="fa-solid fa-circle-info">
                                        <Link
                                          to="/companyDetails"
                                          state={{ companies: d }}
                                          style={{
                                            color: "white",
                                            textDecoration: "none",
                                            border:"0.5px solid #1795a6",
                                            
                                            background:'#1795a6',
                                            borderRadius:"5px",
                                            padding:'4px'
                                      
                                          }}
                                        >
                                          {" "}
                                          &nbsp;Details
                                        </Link>
                                      </i>
                                    </a>
                                  </div>
                                  {/* <div className='d-flex justify-content-center align-items-center'><p className="px-2 text-center buttoncolor rounded" style={{ width: '70%' }}>Add Employee</p></div> */}
                                </Card.Body>
                              </Card>
                              </Col>

                  </>
                )

              })}
            </Row>
          </Container>



        </Card.Body>
      </Card>
    </div>
  );
};
export default Company;
