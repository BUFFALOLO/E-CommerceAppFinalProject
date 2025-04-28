import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";

function ListAllCustomers() {
    const [customers, setCustomers] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/users`);
          console.log(response.data);
          setCustomers(response.data);
          if (response.data.length === 0) {
            setError("There are no customers.");
          } else {
            setError("");
          };
        } catch (error) {
          console.error("Error listing customers:", error);
          setError("Error listing customers. Please try again.");
          setSuccess("");
        } finally {
          setLoading(false);
        }
      };

    const deleteCustomer = async (id) => {
      try {
        await axios.delete(`${API_BASE_URL}/users/${id}`);
        fetchCustomers();
      } catch (error) {
        console.error("Error deleting customer:", error);
        setError("Error deleting customer. Please try again.");
      }
    };
    
    useEffect(() => {
      fetchCustomers();
    } , []);

    if (loading) { return <p>Loading customers...</p>; }

    return (
      <div>
      { error && <p>{error}</p> }
      { success && <p>{success}</p> }
      <h1>All Customers</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.username}</td>
              <td>{customer.email}</td>
              <td>{customer.name.firstname} {customer.name.lastname}</td>
              <td>
                <button onClick={() => navigate(`/UpdateCustomerForm/${customer.id}`)}>Edit</button>
                <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListAllCustomers;
