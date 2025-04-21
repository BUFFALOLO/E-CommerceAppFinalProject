import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import notFoundImage from '../assets/error.jpg';
import './styles.css';

function NotFound() {
  return (
    <Container className="bg-light text-center mt-5 p-5 grid-container">


      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Image src={notFoundImage} fluid className="mb-4" />
          <h1 className="text-danger">404 - Page Not Found</h1>
          <p className="lead mb-4 text-dark">The page you are looking for does not exist.</p>
          <NavLink to="/">
            <Button size="lg" className="w-100 w-md-auto">
              Go to Homepage
            </Button>
          </NavLink>
        </Col>
      </Row>

    </Container>
  );
}

export default NotFound;
