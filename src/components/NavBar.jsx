import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../features/cart/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contexts/AuthContext';
import UserDropdown from './UserDropdown';

function NavigationBar() {
  const cartItems = useSelector(selectCartItems);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const { currentUser } = useAuth();

  return (
    <Navbar expand="lg" className="navbar-custom mb-4">
      <Container>
        <NavLink className="nav-link-custom" to="/">Home</NavLink>
        <NavLink className="nav-link-custom" to="/ProductsMenu">Products</NavLink>
        {/* Removed Order Processing NavLink */}
        <NavLink className="nav-link-custom" to="/order-history">Order History</NavLink>
        <NavLink className="nav-link-custom" to="/CustomersAndAccountsMenu">Customers and Accounts</NavLink>
        <NavLink className="nav-link-custom" to="/cart">
          Cart {itemCount > 0 && (
            <span className="badge bg-primary rounded-pill ms-1">
              {itemCount}
            </span>
          )}
        </NavLink>
        {currentUser ? (
          <UserDropdown />
        ) : null}
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
