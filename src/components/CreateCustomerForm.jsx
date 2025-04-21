import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateCustomerForm() {
  const [validated, setValidated] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ 
    email: "",
    username: "",
    password: "placeholder",
    name: {
      firstname: "",
      lastname: ""
    },
    address: {
      city: "",
      street: "",
      number: "",
      zipcode: "",
      geolocation: {
        lat: "",
        long: ""
      }
    },
    phone: "1-570-236-7033" 
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setValidated(true);

    if (!newCustomer.username.trim() || !newCustomer.email.trim() || !newCustomer.name.firstname.trim() || !newCustomer.name.lastname.trim()) {
      setError("All fields must be filled out correctly.");
      setSuccess("");
      return;
    }

    if (form.checkValidity() === false) {
      return;
    }

    await createNewCustomer();
  };

  const createNewCustomer = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, newCustomer);
      setNewCustomer({
        email: "",
        username: "",
        password: "placeholder",
        name: {
          firstname: "",
          lastname: ""
        },
        address: {
          city: "",
          street: "",
          number: "",
          zipcode: "",
          geolocation: {
            lat: "",
            long: ""
          }
        },
        phone: "1-570-236-7033"
      }); 
      setSuccess("Customer created successfully!");
      setError("");
      setValidated(false);
    } catch (error) {
      console.error("Error creating customer:", error);
      setError("Error creating customer. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="mx-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-4" controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter username"
            name="username"
            value={newCustomer.username}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">Provide a valid username</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email address"
            name="email"
            value={newCustomer.email}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">Provide a valid email</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom03">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter first name"
            name="name.firstname"
            value={newCustomer.name.firstname}
            onChange={(e) => setNewCustomer(prev => ({
              ...prev,
              name: {...prev.name, firstname: e.target.value}
            }))}
          />
          <Form.Control.Feedback type="invalid">Provide a valid first name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom04">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter last name"
            name="name.lastname"
            value={newCustomer.name.lastname}
            onChange={(e) => setNewCustomer(prev => ({
              ...prev,
              name: {...prev.name, lastname: e.target.value}
            }))}
          />
          <Form.Control.Feedback type="invalid">Provide a valid last name</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom05">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter street address"
            name="address.street"
            value={newCustomer.address.street}
            onChange={(e) => setNewCustomer(prev => ({
              ...prev,
              address: {...prev.address, street: e.target.value}
            }))}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom06">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            name="address.city"
            value={newCustomer.address.city}
            onChange={(e) => setNewCustomer(prev => ({
              ...prev,
              address: {...prev.address, city: e.target.value}
            }))}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="validationCustom07">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter zipcode"
            name="address.zipcode"
            value={newCustomer.address.zipcode}
            onChange={(e) => setNewCustomer(prev => ({
              ...prev,
              address: {...prev.address, zipcode: e.target.value}
            }))}
          />
        </Form.Group>

        <Button type="submit">Create Customer</Button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </Form>
    </div>
  );
}

export default CreateCustomerForm;
