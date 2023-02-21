import React,{useState,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Card, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import { departmentValidation } from "./ValidationSchema";
import axios from "axios";
const initialValue={
  department:'',
  role:'',
  description:'',
}
const CompanyDetails = () => {
    const [disabledField,setDisabledField]= useState(true)
    const [show, setShow] = useState(false);
    const [getDepartments, setAddedDepartments] = useState([]);
    const [update, setUpdate] = useState(false);
    var item = useLocation();
    console.log("item", item);
    var companyData = item.state.companies;
    // var setUpdateParent = item.state.upDateParent
    {
      console.log("companyData", companyData);
    }
    const [data, setData] = useState({
      _id: companyData._id,
      companyName: companyData.companyName,
      companyCeo: companyData.companyCeo,
      phoneNo: companyData.phoneNo,
      landLineNo: companyData.landLineNo,
      registrationNo: companyData.registrationNo,
      city: companyData.city,
      country: companyData.country,
      postalCode: companyData.postalCode,
      address: companyData.address,
    });

    const disabledHanlder=()=>{
        setDisabledField(false)
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {values,touched,handleChange,handleSubmit,handleBlur,errors} = useFormik({
      initialValues:initialValue,
      validationSchema:departmentValidation,
      onSubmit:async (values,action) => {
        try {
          const addedUser = await axios.post(
            `/departments/`,
            {
              name: values.department,
              role: values.role,
              description: values.description,
              company: data._id,
            }
          );
          action.resetForm()
  
          handleClose();
          setUpdate(!update)
   
        } catch (err) {
          console.log(err);
        }
   
      }
      
    })
    const handleSubmit1 = async () => {
      // e.preventDefault();
      // const url = `${data._id}`;
  
      try {
        const updateUser = await axios
          .put(`/companies/`, {
            _id: data._id,
            companyName: data.companyName,
            companyCeo: data.companyCeo,
            phoneNo: data.phoneNo,
            landLineNo: data.landLineNo,
            registrationNo: data.registrationNo,
            city: data.city,
            country: data.country,
            postalCode: data.postalCode,
            address: data.address,
          
          })
          .then((user) => {
            console.log("updateUser", user.data.updateData);
            data.companyName = user.data.updateData.companyName;
       
            data.companyCeo = user.data.updateData.companyCeo;
            data.phoneNo = user.data.updateData.phoneNo;
            data.city = user.data.updateData.city;
            data.country = user.data.updateData.country;
            data.registrationNo = user.data.updateData.registrationNo;
            data.landLineNo = user.data.updateData.landLineNo;
            data.address = user.data.updateData.address;
            data.postalCode = user.data.updateData.postalCode;
          
          });
  
   
      } catch (error) {
        console.log("error2", error);
  
      }
    };
    const handleInput = (e) => {
      let name, value;
  
      console.log(e);
      name = e.target.name;
      value = e.target.value;
      setData({ ...data, [name]: value });
    };

    const Department = async () => {
      try {
        const department = await axios.get(`/departments/${data._id}`);
        const res = department.data;
        console.log("addedDepartment", res);
        setAddedDepartments(res.departments);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      Department();
      document.title = "Details";
    }, [update]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ marginTop: "5%", width: "70%" }}>
        <Card.Body>
            <h2>Company Details</h2>
            <Button onClick={disabledHanlder}>Edit</Button>
            <Button style={{marginLeft:'4%'}} onClick={()=>{handleSubmit1();
            setDisabledField(true)
            }}>Save</Button>
            <hr></hr>
            <Row>
                <Col>
                  <label htmlFor="companyName">Company Name:</label>
                  <br></br>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="company name..."
                    value={data.companyName}
                    onChange={handleInput}
                    style={{marginTop:'1%'}}
                    disabled={disabledField}
              
                  />
          
                </Col>
                <Col>
                  <label htmlFor="companyCeo">Company Ceo:</label>
                  <br></br>
                  <input
                    type="text"
                    name="companyCeo"
                    placeholder="company CEO..."
                    value={data.companyCeo}
                    style={{marginTop:'1%'}}
                    onChange={handleInput}
                    disabled={disabledField}
                  />
                </Col>
                <Col>
                  <label htmlFor="registrationNo">Registration No:</label>
                  <br></br>
                  <input
                    type="text"
                    name="registrationNo"
                    placeholder="registration no..."
                    value={data.registrationNo}
                    onChange={handleInput}
                    style={{marginTop:'1%'}}
                    disabled={disabledField}
                  />
                </Col>
              </Row>
              <Row>
                
                <Col>
                  <label htmlFor="phoneNo"  style={{marginTop:'1%'}}>Phone No:</label>
                  <br></br>
                  <input
                    type="text"
                    name="phoneNo"
                    placeholder="phone no..."
                    value={data.phoneNo}
                    onChange={handleInput}
                    style={{marginTop:'1%'}}
                    disabled={disabledField}
                  />
                
                </Col>
                <Col>
                  <label htmlFor="country"  style={{marginTop:'1%'}}>Country:</label>
                  <br></br>
                  <input
                    type="text"
                    name="country"
                    placeholder="country..."
                    value={data.country}
                    onChange={handleInput}
                    style={{marginTop:'1%'}}
                    disabled={disabledField}
                  />
               
                </Col>
                <Col>
                  <label htmlFor="city"  style={{marginTop:'1%'}}>City:</label>
                  <br></br>
                  <input
                    type="text"
                    name="city"
                    value={data.city}
                    placeholder="city..."
                    onChange={handleInput}
                    style={{marginTop:'1%'}}
                    disabled={disabledField}
                  
                  />
             
                </Col>
              </Row>
              
              <Row>
                <Col>
                  <label htmlFor="address"  style={{marginTop:'1%'}}>Address:</label>
                  <br></br>
                  <input
                    type="text"
                    name="address"
                    value={data.address}
                    placeholder="address..."
                    onChange={handleInput}
                    style={{marginTop:'1%'}}
                    disabled={disabledField}
                 
                  />
                </Col>
                <Col>
                  <label htmlFor="postalCode"  style={{marginTop:'1%'}}>Postal code:</label>
                  <br></br>
                  <input
                    type="text"
                    name="postalCode"
                    value={data.postalCode}
                    placeholder="postalCode..."
                    style={{marginTop:'1%'}}
                    onChange={handleInput}
                    disabled={disabledField}
                  />
                </Col>
                <Col>
                  <label htmlFor="landLineNo"  style={{marginTop:'1%'}}>LandLine No:</label>
                  <br></br>
                  <input
                    type="text"
                    name="landLineNo"
                    value={data.landLineNo}
                    placeholder="landLine no..."
                    onChange={handleInput}
                    style={{marginTop:'1%'}}
                    disabled={disabledField}
                  />
                 
                </Col>
              </Row>
              
              <hr style={{marginTop:"8%"}}></hr>

              <h3>Departments</h3>
              <Button onClick={handleShow}>Add Departments</Button>
              <hr></hr>



              {/* ////////////////Add Department Model////////////// */}

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Departments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Department Name:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="department name"
                        name="department"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        
                      
                        autoFocus
                      />
                      {errors.name && touched.name ? (<p style={{color:'white'}}>{errors.name}</p>):null}
                 
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput2"
                    >
                      <Form.Label>Role:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Role"
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                   
                  
                 
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label> Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    
              
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button style={{ background: "grey" }} onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
             
                  >
                    Add
                  </Button>
                </Modal.Footer>
              </Modal>
              <Container>
        <Row>
          {getDepartments.map((d,i)=>{
            return (
                            
              <div key={d._id}>
              
              
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
                      Department
                    </Card.Title>
                    <hr></hr>
                    <Card.Body>
                      <Card.Text
                        style={{ justifyContent: "center" }}
                       
                      >
                        <span style={{ fontWeight: "bold" }}>
                          Name:&nbsp;
                        </span>
                        {d.name}
                      </Card.Text>
                      <Card.Text
                        style={{ justifyContent: "center" }}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          Role:&nbsp;
                        </span>
                        {d.role}
                      </Card.Text>
                      <Card.Text
                        style={{ justifyContent: "center" }}
                      >
                        <span style={{ fontWeight: "bold" }}>
                          Description:&nbsp;
                        </span>
                        {d.description}
                      </Card.Text>
                      <div>
 

                        <Button
                          onClick={async () => {
                            await axios
                              .delete(
                                `/departments/${d._id}`
                              )
                              .then(() => {
                                setUpdate(!update);
                              });
                          }}
                        >
                          Delete
                        </Button>
                      
                      </div>
                      </Card.Body>
                      </Card>
                      </Col>
                      </div>
)
          }
          )}
        </Row>
      </Container>
        </Card.Body>
      </Card>
    </div>

     
  );
};
export default CompanyDetails