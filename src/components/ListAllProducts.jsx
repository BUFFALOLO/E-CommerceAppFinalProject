import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

function ListAllProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
      setError("");
    } catch (error) {
      console.error("Error listing products:", error);
      setError("Error listing products. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error deleting product. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <h1>All Products</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => navigate(`/UpdateProductForm/${product.id}`)}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListAllProducts;
