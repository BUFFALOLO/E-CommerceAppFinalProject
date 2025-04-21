import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductForm() {
  const [validated, setValidated] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "", 
    price: "", 
    description: "",
    image: "", 
    category: "electronics"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setValidated(true);

    if (!newProduct.title.trim() || !newProduct.price.trim()) {
      setError("All fields must be filled out correctly.");
      setSuccess("");
      return;
    }

    if (form.checkValidity() === false) {
      return;
    }

    await createNewProduct();
  };

  const createNewProduct = async () => {
    try {
      await addDoc(collection(db, "products"), {
        title: newProduct.title,
        price: parseFloat(newProduct.price),
        description: newProduct.description,
        image: newProduct.image || null, 
        category: newProduct.category
      });
      setNewProduct({ 
        title: "", 
        price: "", 
        description: "",
        image: "", 
        category: "electronics"
      }); 
      setSuccess("Product created successfully!");
      setError("");
      setValidated(false);
    } catch (error) {
      console.error("Error creating product:", error); 
      setError(`Error creating product: ${error.message}`); 
      setSuccess("");
    }
  };

  return (
    <Form className="mx-5" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-4" md="4" controlId="validationCustom01">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter product title"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
          />
        <Form.Control.Feedback type="invalid">
            Please provide a valid product title.
        </Form.Control.Feedback>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" md="4" controlId="validationCustom01">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter product price"
            pattern="[0-9]+(\.[0-9]{1,2})?"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        <Form.Control.Feedback type="invalid">
            Please provide a valid decimal number for a price.
        </Form.Control.Feedback>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" md="4" controlId="validationCustom02">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-4" md="4" controlId="validationCustom03">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product image URL"
            name="image"
            value={newProduct.image}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button type="submit">Create Product</Button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
    </Form>
  );
}

export default ProductForm;
