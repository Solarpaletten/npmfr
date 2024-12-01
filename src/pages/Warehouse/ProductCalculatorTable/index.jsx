import React, { useState, useEffect } from "react";
import Select from "../../../components/Select";
import Field from "../../../components/Field";
import Button from "../../../components/Button";
import { useProduct } from "../../../contexts/ProductContext";
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";

const ProductCalculatorTable = ({ setData, loading, data }) => {
  const initialRow = {
    product_name: "",
    unit: "",
    code: "",
    quantity: 0,
    priceExclVAT: 0,
    vatRate: 0,
  };
  const { products, loading: productsLoading } = useProduct();
  const [rows, setRows] = useState([initialRow]);

  const handleEdit = (index, field, value) => {
    setRows((prevRows) => {
      return prevRows.map((row, i) => {
        if (i !== index) return row;

        if (field === "product_name") {
          const selectedProduct = products.find(
            ({ id }) => id.toString() === value
          );

          return {
            ...row,
            product_name: value,
            code: selectedProduct?.code || "",
            unit: selectedProduct?.unit || "",
          };
        }

        return {
          ...row,
          [field]: ["quantity", "priceExclVAT", "vatRate"].includes(field)
            ? parseFloat(value) || 0
            : value,
        };
      });
    });
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        product_name: "",
        unit: "",
        code: "",
        quantity: 0,
        priceExclVAT: 0,
        vatRate: 0,
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const calculateRowVAT = (priceExclVAT, vatRate) =>
    (priceExclVAT * vatRate) / 100;

  const calculateRowTotal = (priceExclVAT, vatRate) =>
    priceExclVAT + calculateRowVAT(priceExclVAT, vatRate);

  const totalExclVAT = rows.reduce(
    (sum, row) => sum + row.quantity * row.priceExclVAT,
    0
  );

  const totalVAT = rows.reduce(
    (sum, row) =>
      sum + row.quantity * calculateRowVAT(row.priceExclVAT, row.vatRate),
    0
  );

  const totalInclVAT = totalExclVAT + totalVAT;

  useEffect(() => {
    if (data?.products) setRows(data.products);
  }, [data.products]);

  useEffect(() => {
    setData({
      ...data,
      total_amount: totalInclVAT.toFixed(2),
      vat_amount: totalVAT.toFixed(2),
      vat_rate:
        totalVAT > 0 ? ((totalVAT / totalExclVAT) * 100).toFixed(2) : "0",
      products: rows,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalExclVAT, totalVAT, totalInclVAT, rows, data]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Product name</th>
            <th>Code</th>
            <th>Measurement unit</th>
            <th>Quantity</th>
            <th>Price excl. VAT</th>
            <th>VAT rate %</th>
            <th>Price incl. VAT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Select
                  name="product_name"
                  value={row.product_name}
                  onChange={(e) =>
                    handleEdit(index, "product_name", e.target.value)
                  }
                  options={[
                    { value: "", label: "-- select option --" },
                    ...products.map(({ id, name }) => ({
                      value: id,
                      label: name,
                    })),
                  ]}
                  disabled={loading || productsLoading}
                  required
                />
              </td>
              <td>
                <Field
                  type="text"
                  value={row.code}
                  onChange={(e) => handleEdit(index, "code", e.target.value)}
                  disabled
                />
              </td>
              <td>
                <Field
                  type="text"
                  value={row.unit}
                  onChange={(e) => handleEdit(index, "unit", e.target.value)}
                  disabled
                />
              </td>
              <td>
                <Field
                  type="number"
                  value={row.quantity}
                  onChange={(e) =>
                    handleEdit(index, "quantity", e.target.value)
                  }
                />
              </td>
              <td>
                <Field
                  type="number"
                  value={row.priceExclVAT}
                  onChange={(e) =>
                    handleEdit(index, "priceExclVAT", e.target.value)
                  }
                />
              </td>
              <td>
                <Field
                  type="number"
                  value={row.vatRate}
                  onChange={(e) => handleEdit(index, "vatRate", e.target.value)}
                />
              </td>
              <td>
                {(
                  row.quantity *
                  calculateRowTotal(row.priceExclVAT, row.vatRate)
                ).toFixed(2)}
              </td>
              <td>
                <Button
                  variant="danger"
                  icon={faTrashCan}
                  onClick={() => handleDeleteRow(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button icon={faPlus} onClick={handleAddRow}>
        Add product
      </Button>

      <div>
        <div>Total excl. VAT: {totalExclVAT.toFixed(2)}</div>
        <div>Total VAT: {totalVAT.toFixed(2)}</div>
        <div>Total incl. VAT: {totalInclVAT.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCalculatorTable;
