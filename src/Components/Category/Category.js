import { useEffect, useState } from 'react'
import React from 'react'
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const Category = ({ user, categories, setCategories, removeCategory }) => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const openForm = () => setOpen(true);

    useEffect(() => {

        //функция для получения категорий с помощью метода GET на сервере
        const getCategories = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/category/", requestOptions)

                .then(response => response.json())
                .then((data) => {
                        console.log('Categories:', data)
                        setCategories(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getCategories()
    }, [setCategories])

    //функция для удаления категории с помощью метода DELETE на сервере
    const deleteItem = async ({ id }) => {
        const requestOptions = {
            method: 'DELETE'
        }
        return await fetch(`api/category/${id}`,
            requestOptions)

            .then((response) => {
                if (response.ok) {
                    removeCategory(id);
                }
            },
                (error) => console.log(error)
            )
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
          <Button type="primary" onClick={openForm} > Категории </Button>
        ) : ("")} 

        <Modal title="Ваши категории" open={open} footer={null} onCancel={handleCancel}>
                <table>
                  <thead> Список категорий </thead>
                  <tbody>
                    {categories.map(({ id, name }) => (
                        <>
                            <tr className="Category" key={id} id={id}>
                                <td> {name} </td>
                                <td>
                                    <button onClick={() => deleteItem({ id })}>Удалить</button>
                                </td>
                            </tr> 
                        </>
                    ))}
                  </tbody>
                </table>
        </Modal>

        </React.Fragment>
      );
}
export default Category