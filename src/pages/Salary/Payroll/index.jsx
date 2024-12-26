import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Page from "../../../components/Page";
import Toolbar from "../../../components/Toolbar";
import Button from "../../../components/Button";
import SearchField from "../../../components/SearchField";
import { Table, Row, Cell } from "../../../components/Table";
import AddForm from "./AddForm";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";
import { useAuthenticatedApi } from "../../../utils/api";
import columns from "./columns";
import {
  faTrashCan,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Payroll = () => {
  const api = useAuthenticatedApi();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selected, setSelected] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.get("/payroll");
      setData(data);
    } catch (error) {
      setError("Failed to fetch payroll");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Page loading={loading} error={error}>
      <h1>Payroll management</h1>

      <Toolbar>
        <Button icon={faPlus} onClick={() => setShowAddForm(true)}>
          Add new record
        </Button>
        <SearchField searchTerm={""} setSearchTerm={""} disabled />
      </Toolbar>

      <Table columns={columns} loading={loading} hasCheckboxes={false}>
        {data.map((employee) => (
          <Row key={employee.id}>
            <Cell>{employee.employee_name || "-"}</Cell>
            <Cell>
              {new Date(employee.period_start).toLocaleDateString() || "-"}
            </Cell>
            <Cell>
              {new Date(employee.period_end).toLocaleDateString() || "-"}
            </Cell>
            <Cell>{employee.base_salary || "-"}</Cell>
            <Cell>{employee.bonus || "-"}</Cell>
            <Cell>{employee.net_salary || "-"}</Cell>
            <Cell>{employee.payment_status || "-"}</Cell>
            <Cell align="right">
              <Button
                icon={faPenToSquare}
                onClick={() => {
                  setShowEditForm(true);
                  setSelected(employee);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                icon={faTrashCan}
                onClick={() => {
                  setShowDeleteForm(true);
                  setSelected(employee);
                }}
              >
                Delete
              </Button>
            </Cell>
          </Row>
        ))}
      </Table>

      {showAddForm &&
        createPortal(
          <AddForm onShowForm={setShowAddForm} requery={fetchData} />,
          document.body
        )}
      {showDeleteForm &&
        createPortal(
          <DeleteForm
            selected={selected}
            onShowForm={setShowDeleteForm}
            requery={fetchData}
          />,
          document.body
        )}
      {showEditForm &&
        createPortal(
          <EditForm
            selected={selected}
            onShowForm={setShowEditForm}
            requery={fetchData}
          />,
          document.body
        )}
    </Page>
  );
};

export default Payroll;