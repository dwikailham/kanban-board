import React, { useState, useEffect } from 'react'
import CardItem from '../CardItem'
import axios from 'axios'


export default function CardGroup() {

    const [groupTodo, setGroupTodo] = useState([])

    function getGroupTodo() {
        axios.get("https://todos-project-api.herokuapp.com/todos", {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjQyODYwMTl9.weYLh9Fx6lR09b6sGisklLc3zVosmhvLdt1RWR7LKFg"
            }
        })
            .then(res => setGroupTodo(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getGroupTodo()
    }, [])


    return (
        <div className='flex flex-wrap'>
            {
                groupTodo.map((el, i) => (
                    <CardItem colorCard={el.title} idTodoGroup={el.id} titleGroup={el.title} description={el.description} />
                ))
            }
        </div>
    )
}
