import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageHeader, Button, Col, Row, Card } from "antd";
import { useNavigate } from "react-router-dom";

function CartCheckout() {
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
    history("/");
  };

  const removeToCart = (value) => {
    dispatch({
      type: "remove_cart_item",
      payload: value.id,
    });
  };

  var sum = null;

  cart.forEach((value) => {
    sum += value.price;
  });

  return (
    <div>
      <PageHeader
        title="User Dashboard"
        onBack={() => history("/")}
        extra={[
          <Button key="2">pay :{sum}</Button>,
          <Button key="3" onClick={logout}>
            {islog ? "LogOut" : "login"}
          </Button>,
        ]}
      />{" "}
      <Row>
        {cart.length > 0 ? (
          cart.map((value) => (
            <div className="site-card-border-less-wrapper" key={value.id}>
              <Col span={6}>
                <Card title="Products" bordered={false} style={{ width: 300 }}>
                  <p>Product Name : {value.name}</p>
                  <p>price :{value.price}</p>
                  <Row>
                    <Col span={8}>
                      <Button key="3" onClick={() => removeToCart(value)}>
                        remove
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </div>
          ))
        ) : (
          <div className="site-card-border-less-wrapper">
            <p>Not Found</p>
          </div>
        )}
      </Row>
    </div>
  );
}

export default CartCheckout;
