import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Card, Container, Row, Col, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import CategoryDropdown from './CategoryDropdown';
import Register from './Register';
import { NavLink } from 'react-router-dom';

function Home() {
    const dispatch = useDispatch();
    const divStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

    const imgStyles = {
        maxWidth: '30%',
        height: 'auto',
        marginTop: '2rem',
        borderRadius: '8px'
    }

    const [selectedCategory, setSelectedCategory] = useState('');
    const [showRegister, setShowRegister] = useState(false);

    const fetchProducts = async () => {
        let q;
        const productsCollection = collection(db, 'products');
        if (selectedCategory) {
            q = query(productsCollection, where('category', '==', selectedCategory.toLowerCase()));
        } else {
            q = query(productsCollection);
        }
        const querySnapshot = await getDocs(q);
        const products = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() });
        });
        return products;
    };

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: fetchProducts,
        keepPreviousData: true,
    });

    return (
        <div style={divStyles}>
            <h1 className="my-5 display-3">Implementing CI/CD Pipeline for React E-Commerce App</h1>
            <p className="lead">Completed by Lauren Farrell</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <Button 
                    variant="success" 
                    onClick={() => setShowRegister(!showRegister)}
                >
                    {showRegister ? 'Hide Register' : 'Register'}
                </Button>
                <NavLink 
                    to="/login" 
                    className="btn btn-primary"
                    style={{ height: '38px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    Login
                </NavLink>
            </div>

            {showRegister && <Register />}

            <img 
                src="/src/assets/photo.jpg" 
                alt="E-Commerce Illustration" 
                style={imgStyles}
            />

            <Container className="mt-5">
                <h2 className="mb-4">Our Products</h2>
                <CategoryDropdown 
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
                {isLoading && <Spinner animation="border" />}
                {error && <Alert variant="danger">Error loading products: {error.message}</Alert>}
                {products && (
                    <Row>
                        {products.map(product => (
                            <Col key={product.id} md={4} className="mb-4">
                                <Card className="h-100">
                                    <Card.Img 
                                        variant="top" 
                                        src={product.imageURL} 
                                        style={{ height: '200px', objectFit: 'contain' }} 
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            {product.category}
                                        </Card.Subtitle>
                                        <Card.Text className="flex-grow-1">
                                            {product.description}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5>${product.price}</h5>
                                        </div>
                                        <Button 
                                            variant="primary" 
                                            className="mt-3"
                                            onClick={() => dispatch(addItem(product))}
                                        >
                                            Add to Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    )
}

export default Home;
