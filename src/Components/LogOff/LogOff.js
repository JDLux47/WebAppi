import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

//функция для выхода из аккаунта
const LogOff = ({ setUser }) => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

//функция открытия модального окна для подтверждения выхода из аккаунта
  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    showModal();
  }, []);

//функция создания POST-запроса на сервер для выхода из аккаунта
  const logOff = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
    };
    return await fetch("api/account/logoff", requestOptions).then(
      (response) => {

        //устанавливаем вместо пользователя пустоту
        response.status === 200 &&
          setUser({ isAuthenticated: false, userName: "" });
        response.status === 401 ? navigate("/login") : navigate("/");
        setOpen(false);
      }
    );
  };

  //функция отмены выхода из аккаунта (закрытие модального окна)
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      <Modal title="Title" open={open} onOk={logOff} onCancel={handleCancel}>
        <p>Выполнить выход?</p>
      </Modal>
    </>
  );
};
export default LogOff;
