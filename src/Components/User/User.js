import React, { useEffect } from 'react'
import 'C:/Users/1/Desktop/react-app/src/Style.css'

const User = ({ user, users, setUsers, removeUser }) => {
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
        return await fetch(`api/user/${id}`,
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
            {user.isAuthenticated && user.userRole == "admin" ? (
                <>
                    <h3> Данные </h3>
                    <table>
                        <thead> Список Пользователей </thead>
                        <tbody>
                            <tr><th> Идентификатор </th> <th> Имя </th> <th> Логин </th> <th> Баланс </th><th> Дата </th> </tr>
                            {users.map(({ id, name, balance, login, dateUpdateBalance }) => (
                                <>
                                    {login != "admin" ? (
                                        <tr className="User" key={id} id={id}>
                                            <td> {id} </td> 
                                            <td> {name} </td>
                                            <td> {login} </td>
                                            <td> {balance} </td>
                                            <td> {dateUpdateBalance} </td>
                                            <td> <button onClick={() => deleteItem({id})}> Заблокировать </button> </td>
                                        </tr>
                                    ):("")}
                                </>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : ("")}
        </React.Fragment>
    )
}
export default User