import React from "react";
import { Card } from "antd";
import "./user.css";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, notification } from "antd";
import { PageHeader, Button } from "antd";
import { useNavigate } from "react-router-dom";

function UserDashBoard() {
  var state = useSelector((state) => state.AdminReducer.productList);
  const cart = useSelector((state) => state.CartReducer.item);
  const islog = useSelector((state) => state.AuthReducer.isLoginSuccess);

  const dispatch = useDispatch();
  const history = useNavigate();
  const logout = () => {
    if (islog) {
      dispatch({
        type: "logout",
      });
    }
    history("/login");
  };
  const addToCart = (value) => {
    dispatch({
      type: "add_to_card",
      payload: value,
    });
  };
  const removeToCart = (value) => {
    dispatch({
      type: "remove_cart_item",
      payload: value.id,
    });
  };

  const checkout = () => {
    if (islog) {
      history("/Cart");
    } else {
      notification.open({
        message: "Login",
        description: "You Needs To login First",
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    }
  };
  return (
    <div>
      <PageHeader
        title="User Dashboard"
        extra={[
          <Button key="2" onClick={checkout}>
            Checkout {cart.length}
          </Button>,

          <Button key="3" onClick={logout}>
            {islog ? "LogOut" : "login"}
          </Button>,
        ]}
      />{" "}
      <Row>
        {state.map((value) => (
          <div className="site-card-border-less-wrapper" key={value.id}>
            <Col span={6}>
              <Card title="Products" bordered={false} style={{ width: 300 }}>
                <p>Product Name : {value.name}</p>
                <p>price :{value.price}</p>
                <p>remaining quantity :{value.quantity}</p>
                <Row>
                  <Col span={8}>
                    <Button key="3" onClick={() => removeToCart(value)}>
                      -
                    </Button>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <p>
                      {cart.filter((state) => state.id === value.id).length}
                    </p>
                  </Col>
                  <Col span={8}>
                    {" "}
                    {cart.filter((state) => state.id === value.id).length ===
                    value.quantity ? null : (
                      <Button key="3" onClick={() => addToCart(value)}>
                        +
                      </Button>
                    )}
                  </Col>
                </Row>
              </Card>
            </Col>
          </div>
        ))}
      </Row>
    </div>
  );
}

export default UserDashBoard;
