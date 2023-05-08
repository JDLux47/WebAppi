import React, { useState } from "react";
import { category } from '../Category/Category/Category'
import { useNavigate } from "react-router-dom";
import { Modal, Select, Form, Button, InputNumber, Space} from "antd";

const {Option} = Select

const TransactCreate = ({ user, addTransact }) => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const openForm = () => setOpen(true);

    const handleSubmit = (e) => {
        console.log("Clicked submit button");

        const valuesum = e.Sum
        const valuetype = e.Type
        const valuecategory = e.category
        const valueuser = user.id
        const valuedate = new Date()

        user.balance += valuesum * valuetype

        const transact = { Sum: valuesum, Type: valuetype, CategoryId: valuecategory, Date: valuedate, UserId: valueuser}

        console.log(transact);

        const createTransact = async () => {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transact),
            }   

            const response = await fetch("api/transact/", requestOptions)

            return await response.json().then(
                (data) => {
                    console.log(data);
                    // response.status === 201 && addTransact(data)
                    if (response.ok) {
                        addTransact(data);
                        e.Sum = "";
                        e.Type = "";
                    }
                },
                    (error) => console.log(error)
                )
        }
        createTransact(), handleCancel()
    }

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
        navigate("/transact");
    };

    return (
      <React.Fragment>

        <br/>
        <h1> Данные </h1>
        {user.isAuthenticated && user.userRole == "user" ? (
          <Button type="primary" onClick={openForm} style={{setposition: 'relative'}} > Добавить </Button>
        ) : ("")} 

        <Modal title="Добавление транзакции" open={open} footer={null} onCancel={handleCancel}>
            <Form onFinish={handleSubmit}>

              <Form.Item label="Сумма: " name="Sum" rules={[{ required: true }]}>
                <InputNumber/>
              </Form.Item>

              <Form.Item label="Тип: " name="Type" rules={[{required: true}]}>
                <Select placeholder="Выберите тип транзакции">
                    <Option value="1">Доход</Option>
                    <Option value="-1">Расход</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Категория: " name="category" rules={[{required: true}]}>
                <Select placeholder="Выберите категорию">
                        {category.map(({id, name}) => (
                        // eslint-disable-next-line react/jsx-key
                            <Option key={id} value={id}>{name}</Option>
                        ))}
                </Select>
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