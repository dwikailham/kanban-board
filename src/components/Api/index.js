import axios from "axios";

export const getGroupTodo = () => {
    axios.get("https://todos-project-api.herokuapp.com/todos", {
        headers: {
            Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjQyODYwMTl9.weYLh9Fx6lR09b6sGisklLc3zVosmhvLdt1RWR7LKFg"
        }
    })
    .then(res => res)
    .catch(err => console.log(err))
}

