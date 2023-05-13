import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

const Register = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  //функция для отправки POST-запроса на сервер. Для регистрации нового пользователя
  const register = async (formValues) => {
    console.log("Success:", formValues)
    //var {name, login, password, balance, passwordConfirm } = document.forms[0];
    // console.log(email.value, password.value)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formValues.name,
        login: formValues.login,
        password: formValues.password,
        balance: formValues.balance,
        passwordConfirm: formValues.passwordConfirm,
      }),
    };  
    return await fetch(
      "api/account/register",
      requestOptions
    )
      .then((response) => {
        // console.log(response.status)
        
        //устанавливаем пользователя, который только что был зарегистрирован
        response.status === 200 &&
          setUser({ isAuthenticated: true, login: formValues.login, name: formValues.name, password: formValues.password, balance: formValues.balance, dateUpdateBalance: formValues.dateUpdateBalance});
        return response.json();
      })
      .then(
        (data) => {
          if (
            typeof data !== "undefined" &&
            typeof data.login !== "undefined"
          ) {
            console.log("Пользователь: ", user)
            setUser({ isAuthenticated: true, login: data.login, id: data.id, name: data.name, userRole: data.userRole, password: data.password, balance: data.balance, dateUpdateBalance: data.dateUpdateBalance });
            navigate("/");
            console.log("Пользователь2: ", user)
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
          <h3>Регистрация</h3>
          <Form
            onFinish={register}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinishFailed={renderErrorMessage}
            autoComplete="off"
          >
            <Form.Item
              label="ФИО: "
              name="name"
              rules={[
                { required: true, message: "Please input your name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Логин: "
              name="login"
              rules={[
                { required: true, message: "Please input your login!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Баланс: "
              name="balance"
              rules={[
                { required: true, message: "Please input your balance!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Пароль: "
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Подтвердите пароль: "
              name="passwordConfirm"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit"> Зарегистрироваться </Button>
            </Form.Item>
            </Form>
        </>
          )}
          </>
  );
};
export default Register;