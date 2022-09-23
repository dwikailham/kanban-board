import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardGroup from '../CardGroup'


export default function Content() {

    const [todos, setTodos] = useState([]);

    return (
        <div>
            <CardGroup />
        </div>
    )
}
