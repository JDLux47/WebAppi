import React from 'react'
const UserCreate = ({ addUser }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const { value } = e.target.elements.Name
        const value1 = e.target.elements.Balance.value
        const value2 = e.target.elements.Login.value
        const value3 = e.target.elements.Password.value
        const value4 = new Date()
        const user = { Name: value, Balance: value1, Login: value2, Password: value3, DateUpdateBalance: value4  }
        const createUser = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            }
            const response = await fetch("api/user/",

                requestOptions)

            return await response.json()
                .then((data) => {
                    console.log(data)
                    // response.status === 201 && addUser(data)
                    if (response.ok) {
                        addUser(data)
                        e.target.elements.Name.value = ""
                        e.target.elements.Balance.value1 = ""
                        e.target.elements.Login.value2 = ""
                        e.target.elements.Password.value3 = ""
                    }
                },
                    (error) => console.log(error)
                )
        }
        createUser()
    }
    return (
        <React.Fragment>
            <h3>Создание нового пользователя</h3>
            <form onSubmit={handleSubmit}>
                <label className='text-field__label'> Имя: </label>
                <input className='text-field__input' type="text" name="Name" placeholder="Введите имя" />
                <label className='text-field__label'> Логин: </label>
                <input className='text-field__input' type="text" name="Login" placeholder="Введите логин" />
                <label className='text-field__label'> Пароль: </label>
                <input className='text-field__input' type="password" name="Password" placeholder="Введите пароль" />
                <label className='text-field__label'> Баланс: </label>
                <input className='text-field__input' type="text" name="Balance" placeholder="Введите баланс" />
                <br></br> <button type="submit"> Создать </button>
            </form>
        </React.Fragment >
    )
}
export default UserCreate