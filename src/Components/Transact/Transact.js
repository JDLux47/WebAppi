import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import 'C:/Users/1/Desktop/react-app/src/Style.css'

const Transact = ({ user, transacts, setTransacts, removeTransact }) => {

  const navigate = useNavigate();

  const [transacts2, setSorted] = useState([])
  console.log('TR2:', transacts2)
  console.log('TR:', transacts)

    useEffect(() => {

        const getTransacts = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/transact/", requestOptions)

                .then(response => response.json())
                .then(
                    (data) => {
                        console.log('Transacts:', data)
                        setTransacts(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getTransacts()

    }, [setTransacts])

    const deleteItem = async ({ id }) => {
        const requestOptions = {
            method: 'DELETE'
        }
        return await fetch(`api/transact/${id}`,
            requestOptions)

            .then((response) => {
                if (response.ok) {
                    removeTransact(id);
                }
            },
                (error) => console.log(error)
            )
    }

    const SortBySum = () => {

      transacts.sort(function(a, b) {
        return parseFloat(a.sum) - parseFloat(b.sum);
      });

      setSorted(transacts)
      navigate("/transact");
    }

    const SortByType = () => {

      transacts.sort(function(a, b) {
        return parseFloat(a.type) - parseFloat(b.type);
      });

      setSorted(transacts)
      navigate("/transact");
    }

    const SortByCategory = () => {

      transacts.sort(function(a, b) {
        return parseFloat(a.categoryId) - parseFloat(b.categoryId);
      });

      setSorted(transacts)
      navigate("/transact");
    }

    return (
      <React.Fragment>

        {user.isAuthenticated ? (
          <>
            {user.userRole == "user" ? (
              <>
              <a> </a>
                <Dropdown dropdownRender={() => (
                  <>
                  <Space direction='vertical'>
                    <Button type='primary' onClick={SortBySum}> Сортировать по сумме </Button>
                    <Button type='primary' onClick={SortByType}> Сортировать по типу </Button>
                    <Button type='primary' onClick={SortByCategory}> Сортировать по категории </Button>
                  </Space>
                  </>
                )} placement="bottomLeft" arrow={{pointAtCenter: true}}>
                  <Button>Сортировать</Button>
                </Dropdown>
                

                <table>
                  <thead> Список транзакции </thead>
                  <tbody>
                    <tr>
                      <th> Тип транзакции </th> <th> Сумма транзакции </th>
                      <th> Дата </th>
                      <th> Категория </th>
                    </tr>
                    {transacts.map(({ id, type, sum, date, userId, category }) => (
                        <>
                          {userId == user.id ? 
                            <tr className="Transact" key={id} id={id}>
                              {type > 0 ? <td>Доход</td> : <td>Расход</td>} <td> {sum} </td>
                              <td> {date = date.slice(0, 10)} </td> <td> {category.name} </td>
                              <td>
                                  <button onClick={() => deleteItem({ id })}>Удалить</button>
                              </td>
                            </tr> 
                          : ""}
                        </>
                    ))}
                  </tbody>
                </table>
              </>
            ) : ("")}
          </>
        ) : ("Для отображения данных неободимо авторизазоваться!")}
      </React.Fragment>
    );
}
export default Transact