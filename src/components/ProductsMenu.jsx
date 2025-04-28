import React from "react";
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductsMenu() {
    return (
        <div className="m-5">
            <h1 className="display-6 mb-4">Products Menu</h1>
            <ul>
                <li className="list-unstyled"><NavLink to="/CreateProductForm">Add Product</NavLink></li>
                <li className="list-unstyled"><NavLink to="/ListAllProducts">View Products</NavLink></li>
            </ul>
        </div>
    )
}

export default ProductsMenu;