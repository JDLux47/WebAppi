import React from 'react'
import { category } from '../Category/Category/Category'

const CreateOption = () => {
    return (
        <React.Fragment>
        <select name='category'>
            {category.map(({id, name}) => (
                // eslint-disable-next-line react/jsx-key
                <option value={id}>{name}</option>
        ))}
        </select>
        </React.Fragment>
    )
}

const CreateOptionType = () => {
    return (
        <React.Fragment>
            <select id="Type">
                <option value="1">Доход</option>
                <option value="-1">Расход</option>
            </select>
        </React.Fragment>
    )
}

const TransactCreate = ({ user, addTransact }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const valuesum = e.target.elements.Sum.value
        const valuetype = e.target.elements.Type.value
        const valuecategory = e.target.elements.category.value
        const valueuser = user.id
        const valuedate = new Date()

        const transact = { Sum: valuesum, Type: valuetype, CategoryId: valuecategory, Date: valuedate, UserId: valueuser}
        const createTransact = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transact)
            }   
            const response = await fetch("api/transact/",

                requestOptions)

            return await response.json()
                .then((data) => {
                    console.log(data)
                    // response.status === 201 && addTransact(data)
                    if (response.ok) {
                        addTransact(data)
                        e.target.elements.Sum.valuesum = ""
                        e.target.elements.Type.type = ""
                    }
                },
                    (error) => console.log(error)
                )
        }
        createTransact()
    }
    return (
        <React.Fragment>
            {user.isAuthenticated && user.userRole == "user" ? (
                <>
                    <h3>Создание новой транзакции</h3>
                    <form onSubmit={handleSubmit}>
                    <label className='text-field__label'> Сумма: </label>
                    <input className='text-field__input' type="number" name="Sum" placeholder="Введите Сумму" />
                    <label className='text-field__label'> Тип: </label>
                    <CreateOptionType/> <br />
                    <label className='text-field__label'> Категория: </label>
                    <CreateOption/> <br />
                    <br></br> <button type="submit"> Создать </button>
                    </form>
                </>
            ) : ("")}
        </React.Fragment >
    )
}
export default TransactCreate