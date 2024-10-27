import React from 'react';
import Table from "../../../../components/Table";
import Button from "../../../../components/Button";
import styles from "./index.module.css";

function ProductList({ products, onAddStock }) {
  return (
    <div className={styles.productList}>
      <Table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.product_name}</td>
              <td className={styles.quantity}>
                {product.quantity < 10 ? (
                  <span className={styles.lowStock}>{product.quantity}</span>
                ) : (
                  product.quantity
                )}
              </td>
              <td className={styles.price}>{product.price}</td>
              <td>{new Date(product.created_at).toLocaleDateString()}</td>
              <td>
                <div className={styles.actions}>
                  <Button onClick={() => onAddStock(product.id)}>
                    Add Stock
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;