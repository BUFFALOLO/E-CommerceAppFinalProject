import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function CategoryDropdown({ selectedCategory, onCategoryChange }) {
    const categories = ['stickers', 'apparel'];

    return (
        <Form.Select 
            aria-label="Select category" 
            value={selectedCategory || ''}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="mb-4"
        >
            <option value="">All Categories</option>
            {categories.map(category => (
                <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
            ))}
        </Form.Select>
    );
}

CategoryDropdown.propTypes = {
    selectedCategory: PropTypes.string,
    onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryDropdown;
