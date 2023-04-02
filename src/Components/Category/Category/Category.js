import { useEffect } from 'react'

export let category = [{}]

const Category = () => {
    useEffect(() => {
        const getCategories = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/category/", requestOptions)

                .then(response => response.json())
                .then((data) => {
                        console.log('Categories:', data)
                        category = data
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getCategories()
    })
}
export default Category