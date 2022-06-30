import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table } from "antd";
import { PageHeader } from "antd";
import { Button, Modal, Form, Input } from "antd";

import "./admin.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const rootState = useSelector((state) => state);

  const state = rootState.AdminReducer.productList;
  const dispatch = useDispatch();
  const history = useNavigate();

  const logout = () => {
    dispatch({
      type: "logout",
    });
    history("/login");
  };

  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);

  const showModal = (value, type) => {
    if (type === "edit") {
      setEdit(true);
      form.setFieldsValue({
        id: value.id,
        name: value.name,
        price: value.price,
        quantity: value.quantity,
        category: value.category,
      });
      setIsModalVisible(true);
    } else {
      form.setFieldsValue({
        id: state.length + 1,
      });
      setIsModalVisible(true);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    if (edit) {
      const payload = {
        id: values.id,
        name: values.name,
        price: values.price,
        quantity: values.quantity,
        category: values.category,
      };
      dispatch({
        type: "edit_product",
        payload: payload,
      });
      setEdit(false);
    } else {
      const payload = {
        id: state.length + 1,
        name: values.name,
        price: values.price,
        quantity: values.quantity,
        category: values.category,
      };
      dispatch({
        type: "add_product",
        payload: payload,
      });
    }
    handleCancel();
    form.resetFields();
  };

  const deleteProduct = (payload) => {
    dispatch({
      type: "delete_product",
      payload: payload.id,
    });
  };

  const dataSource = state;

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record, "edit")}>Edit {record.name}</a>
          <a onClick={() => deleteProduct(record)}> Delete</a>
        </Space>
      ),
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        extra={[
          <Button key="3" onClick={logout}>
            LogOut
          </Button>,
        ]}
      />
      <Button type="primary" onClick={() => showModal(null, "add")}>
        Open Modal
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Add Item"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: "Please input your product!" }]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            label="Product"
            name="name"
            rules={[{ required: true, message: "Please input your product!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input your quantity!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="category"
            name="category"
            rules={[{ required: true, message: "Please input your category!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
