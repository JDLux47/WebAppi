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

    console.log(user)

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
        <h3> Данные </h3>
        <table>
          <thead> Список транзакции </thead>
          <tr>
            <th> Идентификатор </th>
            <th> Тип транзакции </th> <th> Сумма транзакции </th>
            <th> Дата </th>
            <th> Категория </th>
          </tr>
          {transacts.map(({ id, type, sum, date, userId, category }) => (
            <tbody className="Transact" key={id} id={id}>
                {userId == user.id ? 
                <tr>
                <td> {id} </td>
                {type > 0 ? <td>Доход</td> : <td>Расход</td>} <td> {sum} </td>
                <td> {date} </td> <td> {category.name} </td>
                <td>
                  {user.isAuthenticated ? (
                    <button onClick={() => deleteItem({ id })}>Удалить</button>
                  ) : (
                    ""
                  )}
                </td>
              </tr> : ""}
            </tbody>
          ))}
        </table>
      </React.Fragment>
    );
}
export default Transact