import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`/users/${id}`);

        setCustomer(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching customer:', err);
        setError('Failed to fetch customer details');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="m-5">
      <h2>Customer Details</h2>
      {customer && (
        <div>
          <p><strong>Name:</strong> {customer.name.firstname} {customer.name.lastname}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
        </div>
      )}
    </div>
  );
}

export default CustomerDetails;
