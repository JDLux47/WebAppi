import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'C:/Users/1/Desktop/react-app/src/Style.css';
import { Button, Checkbox, Form, Input } from "antd";

const LogIn = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const logIn = async (formValues) => {
    console.log("Success:", formValues)
    // console.log(email.value, password.value)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Login: formValues.login,
        Password: formValues.password,
        Rememberme: formValues.remember,
      }),
    };
    return await fetch("api/account/login", requestOptions)
      .then((response) => {
        // console.log(response.status)

        response.status === 200 &&
          setUser({ isAuthenticated: true, login: "", id: "", userRole: ""});
        return response.json();
      })
      .then(
        (data) => {
          if (
            typeof data !== "undefined" &&
            typeof data.login !== "undefined"
          ) {
            setUser({ isAuthenticated: true, login: data.login, id: data.id, userRole: data.userRole});
            navigate("/");
          }
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setErrorMessages(data.error);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>);
  return (
    <>
      {user.isAuthenticated ? (
        <h3>Пользователь {user.login} успешно вошел в систему</h3>
      ) : (
        <>
          <h3>Вход</h3>

          <Form
            onFinish={logIn}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinishFailed={renderErrorMessage}
            autoComplete="off"
          >
            <Form.Item
              label="Login"
              name="login"
              rules={[
                { required: true, message: "Please input your login!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
              {renderErrorMessage()}
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};
export default LogIn;
