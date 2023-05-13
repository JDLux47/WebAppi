import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button, Input, Space} from "antd";


const TransactCreate = ({ user, addCategory }) => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const openForm = () => setOpen(true);

    //функция для создания новой категории 
    const handleSubmit = (e) => {
        console.log("Clicked submit button");

        const valuename = e.Name

        const category = { Name: valuename}

        console.log(category);
  //функция для отправки POST-запроса для добавления новой категории 
        const createTransact = async () => {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(category),
            }   

            const response = await fetch("api/category/", requestOptions)

            return await response.json().then(
                (data) => {
                    console.log(data);
                    // response.status === 201 && addTransact(data)
                    if (response.ok) {
                        addCategory(data);
                        e.Name = "";
                    }
                },
                    (error) => console.log(error)
                )
        }
        createTransact(), handleCancel()
    }
    
//функция отмены выхода из аккаунта (закрытие модального окна)
    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
        navigate("/transact");
    };

    return (
      <React.Fragment>
        <a> </a>
        {user.isAuthenticated && user.userRole == "user" ? (
          <Button type="primary" onClick={openForm} > Новая категория </Button>
        ) : ("")} 

        <Modal title="Добавление категории" open={open} footer={null} onCancel={handleCancel}>
            <Form onFinish={handleSubmit}>

              <Form.Item label="Название: " name="Name" rules={[{ required: true }]}>
                <Input/>
              </Form.Item>

              <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit"> Создать </Button>
                    <Button type="primary" htmlType="button" onClick={handleCancel}> Отмена </Button>
                </Space>
              </Form.Item>

            </Form>
        </Modal>
      </React.Fragment>
    );
}
export default TransactCreate