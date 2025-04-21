import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Button, Card, ListGroup, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function OrderHistory() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) {
        setOrders([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null,
        }));
        setOrders(fetchedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(`Failed to load order history: ${err.message || 'Please try again.'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="container my-4">
      <h2>Order History</h2>
      {loading && <p>Loading orders...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && orders.length === 0 && <p>No orders found.</p>}
      {orders.map(order => (
        <Card key={order.id} className="mb-3">
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Order ID:</strong> {order.id}<br />
                <strong>Date:</strong> {order.createdAt ? order.createdAt.toLocaleString() : 'N/A'}<br />
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </div>
              <Button
                variant="primary"
                onClick={() => toggleExpand(order.id)}
                aria-controls={`order-details-${order.id}`}
                aria-expanded={expandedOrderId === order.id}
              >
                {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
              </Button>
            </div>
          </Card.Header>
          <Collapse in={expandedOrderId === order.id}>
            <div id={`order-details-${order.id}`}>
              <ListGroup variant="flush">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <ListGroup.Item key={index}>
                      {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No items found in this order.</ListGroup.Item>
                )}
              </ListGroup>
              <Card.Footer>
                <strong>Total Price: </strong>${order.total.toFixed(2)}
              </Card.Footer>
            </div>
          </Collapse>
        </Card>
      ))}
    </div>
  );
}

export default OrderHistory;
