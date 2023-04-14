import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const register = async (event) => {
    event.preventDefault();
    var {Name, Login, Password, Balance, PasswordConfirm } = document.forms[0];
    // console.log(email.value, password.value)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: Name.value,
        login: Login.value,
        password: Password.value,
        balance: Balance.value,
        passwordConfirm: PasswordConfirm.value,
      }),
    };  
    return await fetch(
      "api/account/register",
      requestOptions
    )
      .then((response) => {
        // console.log(response.status)

        response.status === 200 &&
          setUser({ isAuthenticated: true, login: Login.value});
        return response.json();
      })
      .then(
        (data) => {
          if (
            typeof data !== "undefined" &&
            typeof data.login !== "undefined"
          ) {
            setUser({ isAuthenticated: true, login: data.login });
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
          <h3>Регистрация</h3>
          <form onSubmit={register}>
                <label className='text-field__label'> Имя: </label>
                <input className='text-field__input' type="text" name="Name" placeholder="Введите имя" />
                <label className='text-field__label'> Логин: </label>
                <input className='text-field__input' type="text" name="Login" placeholder="Введите логин" />
                <label className='text-field__label'> Ваш начальный баланс: </label>
                <input className='text-field__input' type="text" name="Balance" placeholder="Введите баланс" />
                <label className='text-field__label'> Пароль: </label>
                <input className='text-field__input' type="password" name="Password" placeholder="Введите пароль" />
                <label className='text-field__label'> Подтвердите пароль: </label>
                <input className='text-field__input' type="password" name="PasswordConfirm" placeholder="Подтвердите пароль" />
                <br></br> <button type="submit"> Зарегистрироваться </button>
          </form>
          {renderErrorMessage()}
        </>
          )}
          </>
  );
};
export default Register;