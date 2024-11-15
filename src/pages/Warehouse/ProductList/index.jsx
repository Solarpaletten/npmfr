import React, { useState, useEffect } from "react";
import Page from "../../../components/Page";
import SearchField from "../../../components/SearchField";
import { Table, Row, Cell } from "../../../components/Table";
import { useAuthenticatedApi } from "../../../utils/api";
import columns from "./columns";

import styles from "./index.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "name", order: "ASC" });

  const api = useAuthenticatedApi();

  useEffect(() => {
    fetchProducts({ searchTerm, ...sort });
  }, [searchTerm, sort]);

  const fetchProducts = async ({ searchTerm, sort, order }) => {
    setProductsLoading(true);
    setError(null);

    try {
      const data = await api.get("/products", {
        search: searchTerm,
        sort,
        order,
      });

      setProducts(data);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setProductsLoading(false);
    }
  };

  return (
    <Page loading={false} error={error}>
      <h1>Products</h1>

      <div className={styles.toolbar}>
        <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <Table
        columns={columns}
        initialOrder={sort}
        sort={setSort}
        loading={productsLoading}
      >
        {products.map((product) => (
          <Row key={product.id}>
            <Cell>{product.name || "-"}</Cell>
            <Cell>{product.code || "-"}</Cell>
            <Cell>{product.category || "-"}</Cell>
            <Cell>{product.unit || "-"}</Cell>
            <Cell>{product.vat_rate || "-"}</Cell>
            <Cell>{product.brand || "-"}</Cell>
            <Cell>{product.price_purchase || "-"}</Cell>
            <Cell>{product.price_sale || "-"}</Cell>
            <Cell>{product.min_quantity || "-"}</Cell>
            <Cell>{product.description || "-"}</Cell>
            <Cell align="right"></Cell>
          </Row>
        ))}
      </Table>
    </Page>
  );
};

export default Products;
