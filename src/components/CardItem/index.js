import React, { useEffect, useState } from 'react'
import { Progress } from 'antd';
import axios from 'axios'
import ModalClick from '../Modal';

export default function CardItem({ colorCard, titleGroup, description, idTodoGroup }) {
    const [itemTodo, setItemTodo] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const color =
    {
        "Task 1": { border: "#EB2F96", bg: "#FFF9FB" },
        "Task 2": { border: "#7B61FF", bg: "#FCFAFD" },
        "Task 3": { border: "#2F54EB", bg: "#F7FAFF" },
        "Task 4": { border: "#52C41A", bg: "#F8FEF1" }
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function getTodoItem() {
        axios.get(`https://todos-project-api.herokuapp.com/todos/${idTodoGroup}/items`, {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjQyODYwMTl9.weYLh9Fx6lR09b6sGisklLc3zVosmhvLdt1RWR7LKFg"
            }
        })
            .then(res => setItemTodo(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTodoItem()
    }, [idTodoGroup])

    return (
        <div className='mb-3'>
            <div className={`border-2 rounded-md w-[306px] h-auto p-2 mr-3`} style={{ borderColor: color[colorCard]?.border || 'black', background: color[colorCard]?.bg }}>
                <h3 className={`text-sm border-2 inline-block py-1 px-2 rounded-md`} style={{ borderColor: color[colorCard]?.border || 'black', color: color[colorCard] || 'black' }}>
                    {titleGroup}
                </h3>
                <h3 className="my-1 text-sm text-black font-bold">{description}</h3>
                {
                    itemTodo.length > 0 ?
                        itemTodo.map((el, i) => (
                            <div className="bg-white border-2 border-gray-200 font-bold p-3 rounded-lg mt-2">
                                <h3>{el.name}</h3>
                                <div className="flex justify-between mt-5">
                                    <Progress className='w-1/2' percent={el.progress_percentage} size="small" />
                                    <div className="flex items-center">
                                        <svg
                                            width="16"
                                            height="4"
                                            viewBox="0 0 16 4"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M0.125 1.97656C0.125 2.14892 0.158949 2.3196 0.224908 2.47884C0.290867 2.63807 0.387546 2.78276 0.509422 2.90464C0.631299 3.02652 0.775988 3.12319 0.935228 3.18915C1.09447 3.25511 1.26514 3.28906 1.4375 3.28906C1.60986 3.28906 1.78053 3.25511 1.93977 3.18915C2.09901 3.12319 2.2437 3.02652 2.36558 2.90464C2.48745 2.78276 2.58413 2.63807 2.65009 2.47884C2.71605 2.3196 2.75 2.14892 2.75 1.97656C2.75 1.8042 2.71605 1.63353 2.65009 1.47429C2.58413 1.31505 2.48745 1.17036 2.36558 1.04848C2.2437 0.926608 2.09901 0.82993 1.93977 0.763971C1.78053 0.698012 1.60986 0.664063 1.4375 0.664063C1.26514 0.664063 1.09447 0.698012 0.935228 0.763971C0.775988 0.82993 0.631299 0.926608 0.509422 1.04848C0.387546 1.17036 0.290867 1.31505 0.224908 1.47429C0.158949 1.63353 0.125 1.8042 0.125 1.97656ZM6.6875 1.97656C6.6875 2.32466 6.82578 2.6585 7.07192 2.90464C7.31806 3.15078 7.6519 3.28906 8 3.28906C8.3481 3.28906 8.68194 3.15078 8.92808 2.90464C9.17422 2.6585 9.3125 2.32466 9.3125 1.97656C9.3125 1.62847 9.17422 1.29463 8.92808 1.04848C8.68194 0.802343 8.3481 0.664062 8 0.664063C7.6519 0.664062 7.31806 0.802343 7.07192 1.04848C6.82578 1.29463 6.6875 1.62847 6.6875 1.97656ZM13.25 1.97656C13.25 2.32466 13.3883 2.6585 13.6344 2.90464C13.8806 3.15078 14.2144 3.28906 14.5625 3.28906C14.9106 3.28906 15.2444 3.15078 15.4906 2.90464C15.7367 2.6585 15.875 2.32466 15.875 1.97656C15.875 1.62847 15.7367 1.29463 15.4906 1.04848C15.2444 0.802343 14.9106 0.664062 14.5625 0.664063C14.2144 0.664062 13.8806 0.802343 13.6344 1.04848C13.3883 1.29463 13.25 1.62847 13.25 1.97656Z"
                                                fill="#828282"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        (<div className="bg-white text-neutral-300 border-2 border-gray-200  p-3 rounded-lg">
                            <h3 className="">No Task Available</h3>
                            <div className="flex mt-5 justify-between">
                                <div className="flex items-center">
                                </div>
                            </div>
                        </div>)}

                <div className="flex mt-2 items-center cursor-pointer" onClick={() => setIsModalOpen(true)}>
                    <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                    >
                        <path
                            d="M13.9531 9.82428H10.6875V6.55865C10.6875 6.46412 10.6102 6.38678 10.5156 6.38678H9.48438C9.38984 6.38678 9.3125 6.46412 9.3125 6.55865V9.82428H6.04688C5.95234 9.82428 5.875 9.90162 5.875 9.99615V11.0274C5.875 11.1219 5.95234 11.1993 6.04688 11.1993H9.3125V14.4649C9.3125 14.5594 9.38984 14.6368 9.48438 14.6368H10.5156C10.6102 14.6368 10.6875 14.5594 10.6875 14.4649V11.1993H13.9531C14.0477 11.1993 14.125 11.1219 14.125 11.0274V9.99615C14.125 9.90162 14.0477 9.82428 13.9531 9.82428Z"
                            fill="#262626"
                        />
                        <path
                            d="M10 0.88678C4.68477 0.88678 0.375 5.19655 0.375 10.5118C0.375 15.827 4.68477 20.1368 10 20.1368C15.3152 20.1368 19.625 15.827 19.625 10.5118C19.625 5.19655 15.3152 0.88678 10 0.88678ZM10 18.504C5.58711 18.504 2.00781 14.9247 2.00781 10.5118C2.00781 6.09889 5.58711 2.51959 10 2.51959C14.4129 2.51959 17.9922 6.09889 17.9922 10.5118C17.9922 14.9247 14.4129 18.504 10 18.504Z"
                            fill="#262626"
                        />
                    </svg>
                    <p className="">New Task</p>
                </div>
            </div>
            <ModalClick
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </div>
    )
}
