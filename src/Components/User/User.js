import React, { useEffect } from 'react'
import './Style.css'

const User = ({ users, setUsers, removeUser, getUser }) => {
    useEffect(() => {
        const getUsers = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/user/", requestOptions)

                .then(response => response.json())
                .then(
                    (data) => {
                        console.log('Users:', data)
                        setUsers(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getUsers()
    }, [setUsers])

    const deleteItem = async ({ id }) => {
        const requestOptions = {
            method: 'DELETE'
        }
        return await fetch(`https://localhost:7218/api/user/${id}`,
            requestOptions)

            .then((response) => {
                if (response.ok) {
                    removeUser(id);
                }
            },
                (error) => console.log(error)
            )
    }

    return (
        <React.Fragment>
            <h3> Данные </h3>
            <table>
                <thead> Список Пользователей </thead>
                <tr><th> Идентификатор </th> <th> Имя </th> <th> Сумма транзакции : дата </th>  </tr>
                {users.map(({ id, name, balance, login, password, dateUpdateBalance, sumLimiter, transact }) => (
                    <tbody className="User" key={id} id={id}>
                        <tr>
                            <td> {id} </td> <td> {name} </td>
                            <td>
                            {transact.map(({ id, type, iD_Category, sum, date, iD_User }) => (
                                <div className="Transact" key={id} id={id} >
                                    {sum}  рублей : {date}
                                </div>
                            ))}
                            </td>
                            <td> <button onClick={(e) => deleteItem({id})}> Удалить </button> </td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </React.Fragment>
    )
}
export default User