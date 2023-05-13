import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Select, Form, Button, InputNumber, Space} from "antd";

const {Option} = Select

const TransactCreate = ({ user, addTransact, categories, UpdateTrans, setUpdTrans, setTransacts, transacts}) => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const openForm = () => setOpen(true);
    const [form] = Form.useForm();

    useEffect(() => {

      console.log(JSON.stringify(UpdateTrans));
      if (JSON.stringify(UpdateTrans) !== "{}") {
        openForm(true);
        UpdateTransact();
      }

    }, [UpdateTrans])

//функция загрузки информации о выбранной для изменения транзакции в форму
    const UpdateTransact = () =>{
      
      form.setFieldsValue({
        Sum: UpdateTrans.sum,
        Type: UpdateTrans.type,
        category: UpdateTrans.categoryId,
      });

    }

//функция, которая отправляет PUT-запрос на сервер для изменения транзакции
    const PutTransact = async(e) =>{

      e = form.getFieldValue();

      const valuesum = e.Sum;
      const valuetype = e.Type;
      const valuecategory = e.category;
      const valuedate = UpdateTrans.date;
      const valueuser = user.id;
  
      const transact = { Sum: valuesum, Type: valuetype, CategoryId: valuecategory, Date: valuedate, UserId: valueuser}
  
      console.log("PUT: ", transact);

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transact),
      } 

      return await fetch(`api/transact/${UpdateTrans.id}`, requestOptions)

        .then((response) => response.json())
          .then((data) => {
            console.log(data)
            setTransacts(transacts.map(x => x.id !== data.id ? x : data));
            setUpdTrans({});
            // response.status === 201 && addTransact(data)
                handleCancel();
                e.Sum = "";
                e.Type = "";
          },
            (error) => console.log(error)
      )
    }

    //функция отправки POST запроса на сервер для добавления новой транзакции
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
        
        //функция для создания POST-запроса на сервер
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

    //функция для закрытия окна добавления/изменения
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

        <Modal forceRender title="Добавление транзакции" open={open} footer={null} onCancel={handleCancel}>
            <Form form={form} onFinish={handleSubmit}>

              <Form.Item label="Сумма: " name="Sum" rules={[{ required: true }]}>
                <InputNumber/>
              </Form.Item>

              <Form.Item label="Тип: " name="Type" rules={[{required: true}]}>
                <Select placeholder="Выберите тип транзакции">
                    <Option value={1}>Доход</Option>
                    <Option value={-1}>Расход</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Категория: " name="category" rules={[{required: true}]}>
                <Select placeholder="Выберите категорию">
                        {categories.map(({id, name}) => (
                        // eslint-disable-next-line react/jsx-key
                            <Option key={id} value={id}>{name}</Option>
                        ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit"> Создать </Button>
                    <Button type="primary" onClick={PutTransact}> Изменить </Button>
                    <Button type="primary" htmlType="button" onClick={handleCancel}> Отмена </Button>
                </Space>
              </Form.Item>

            </Form>
        </Modal>

      </React.Fragment>
    );
}
export default TransactCreate