import React, { useEffect } from 'react'
import 'C:/Users/1/Desktop/react-app/src/Style.css'

const Transact = ({ user, transacts, setTransacts, removeTransact }) => {
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

    return (
      <React.Fragment>
        <br/>
        {user.isAuthenticated ? (
          <>
            {user.userRole == "user" ? (
              <>
                <h3> Данные </h3>
                <table>
                  <thead> Список транзакции </thead>
                  <tbody>
                    <tr>
                      <th> Идентификатор </th>
                      <th> Тип транзакции </th> <th> Сумма транзакции </th>
                      <th> Дата </th>
                      <th> Категория </th>
                    </tr>
                    {transacts.map(({ id, type, sum, date, userId, category }) => (
                        <>
                          {userId == user.id ? 
                            <tr className="Transact" key={id} id={id}>
                              <td> {id} </td>
                              {type > 0 ? <td>Доход</td> : <td>Расход</td>} <td> {sum} </td>
                              <td> {date} </td> <td> {category.name} </td>
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