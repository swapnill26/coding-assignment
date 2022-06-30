import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AuthConstant } from "../../_constants/constants";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const islog = useSelector((state) => state.AuthReducer);

  const onFinish = (values) => {
    if (values.username === "swapnil" && values.password === "swapnil") {
      let payload = {
        isLoginSuccess: true,
        isAdmin: true,
      };
      dispatch({
        type: AuthConstant.LOGIN_SUCCESS,
        payload: payload,
      });
      history("/AdminDashboard");
    } else if (values.username === "swapnil" && values.password === "Patil") {
      let payload = {
        isLoginSuccess: true,
        isAdmin: false,
      };
      dispatch({
        type: AuthConstant.LOGIN_SUCCESS,
        payload: payload,
      });
      history("/");
    } else {
      notification.open({
        message: "Login Fail",
        description: "Check username and Password",
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (islog.isLoginSuccess) {
      islog.isAdmin ? history("/AdminDashboard") : history("/");
    }
  }, [islog.isLoginSuccess]);
  return (
    <div style={{ marginTop: "100px" }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
