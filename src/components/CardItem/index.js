import React, { useEffect, useState } from 'react'
import { Progress, Modal, notification, Dropdown, Menu } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios'
import ModalClick from '../Modal';

export default function CardItem({ colorCard, titleGroup, description, idTodoGroup }) {
    const [itemTodo, setItemTodo] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [nameItem, setNameItem] = useState("");
    const [progressItem, setProgressItem] = useState("")
    const [loadingButton, setLoadingButton] = useState(false)
    const [titleModal, setTitleModal] = useState("")
    const [idTodoItem, setIdTodoItem] = useState("")

    const color =
    {
        "Task 1": { border: "#EB2F96", bg: "#FFF9FB" },
        "Task 2": { border: "#7B61FF", bg: "#FCFAFD" },
        "Task 3": { border: "#2F54EB", bg: "#F7FAFF" },
        "Task 4": { border: "#52C41A", bg: "#F8FEF1" }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function deleteTodoItem() {
        axios.delete(`https://todos-project-api.herokuapp.com/todos/${idTodoGroup}/items/${idTodoItem}`, {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjQyODYwMTl9.weYLh9Fx6lR09b6sGisklLc3zVosmhvLdt1RWR7LKFg"
            }
        }).then(res => {
            getTodoItem()
            notification["success"]({
                message: "Deleted",
                description: 'Task Deleted Successfull',
            });

        }).catch(err => {
            Modal.error({
                title: err.code,
                content: err.message,
            });
        })
    }

    function getTodoItem() {
        axios.get(`https://todos-project-api.herokuapp.com/todos/${idTodoGroup}/items`, {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjQyODYwMTl9.weYLh9Fx6lR09b6sGisklLc3zVosmhvLdt1RWR7LKFg"
            }
        })
            .then(res => setItemTodo(res.data))
            .catch(err => {
                Modal.error({
                    title: err.code,
                    content: err.message,
                });
            })
    }

    function updateItem() {
        setLoadingButton(true)

        const request = {
            target_todo_id: idTodoItem,
            name: nameItem,
            progress_percentage: progressItem
        }

        axios.patch(`https://todos-project-api.herokuapp.com/todos/${idTodoGroup}/items/${idTodoItem}`, request, {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjQyODYwMTl9.weYLh9Fx6lR09b6sGisklLc3zVosmhvLdt1RWR7LKFg"
            }
        }).then(res => {
            setLoadingButton(false)
            setProgressItem("")
            setNameItem("")
            getTodoItem()
            notification["success"]({
                message: "Updated",
                description: 'Task Updated Successfull',
            });

        }).catch(err => {
            setLoadingButton(false)
            setIsModalOpen(false)
            Modal.error({
                title: err.code,
                content: err.message,
            });
        })

    }

    function createItem() {
        setLoadingButton(true)

        const request = {
            name: nameItem,
            progress_percentage: progressItem
        }

        axios.post(`https://todos-project-api.herokuapp.com/todos/${idTodoGroup}/items`, request, {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2NjQyODYwMTl9.weYLh9Fx6lR09b6sGisklLc3zVosmhvLdt1RWR7LKFg"
            }
        }).then(res => {
            setLoadingButton(false)
            setProgressItem("")
            setNameItem("")
            getTodoItem()
            setIsModalOpen(false)
            notification["success"]({
                message: res.statusText,
                description: 'Task Created Successfull',
            });
        }).catch(err => {
            setLoadingButton(false)
            setIsModalOpen(false)
            Modal.error({
                title: err.code,
                content: err.message,
            });
        })

    }

    const optionSort = [
        {
            label: 'Edit',
            key: '1',
            icon: <EditOutlined />,
            func: () => {
                setTitleModal("Edit Task")
                setIsModalOpen(true)
            },
        },
        {
            label: 'Delete',
            key: '2',
            icon: <DeleteOutlined />,
            func: () => {
                Modal.confirm({
                    title: "Delete Task",
                    content: "Are you sure want to delete this task? your action can't be reverted",
                    okText: 'Delete',
                    cancelText: 'Cancel',
                    okType: 'danger',
                    onOk() {
                        deleteTodoItem()
                    }
                });
            }
        }
    ]

    const menu = (
        <Menu
            className='w-[130px]'
        >
            {
                optionSort.map((el, i) => (
                    <Menu.Item icon={el.icon} onMouseDown={el.func}>
                        {el.label}
                    </Menu.Item>
                ))
            }

        </Menu>
    );

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
                                <h3 className='font-bold'>{el.name}</h3>
                                <div className="flex justify-between mt-5">
                                    <Progress style={{ width: "50%" }} percent={el.progress_percentage} size="small" />
                                    <Dropdown.Button
                                        trigger={['click']}
                                        overlay={menu}
                                        onMouseDown={() => {
                                            setIdTodoItem(el.id)
                                            setNameItem(el.name)
                                            setProgressItem(el.progress_percentage)
                                        }}
                                    >
                                    </Dropdown.Button>
                                </div>
                            </div>
                        ))
                        :
                        (<div className="bg-white text-neutral-300 border-2 border-gray-200  p-3 rounded-lg">
                            <h3 className="text-neutral-300">No Task Available</h3>
                            <div className="flex mt-5 justify-between">
                                <div className="flex items-center">
                                </div>
                            </div>
                        </div>)}

                <div
                    className="flex mt-2 items-center cursor-pointer"
                    onClick={() => {
                        setTitleModal("Create Task")
                        setNameItem("")
                        setProgressItem("")
                        setIsModalOpen(true)
                    }}
                >
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
                    <p className="mt-2.5">New Task</p>
                </div>
            </div>
            <ModalClick
                titleModal={titleModal}
                loadingButton={loadingButton}
                progressItem={progressItem}
                nameItem={nameItem}
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                updateItem={updateItem}
                createItem={createItem}
                setNameItem={setNameItem}
                setProgressItem={setProgressItem}
            />
        </div>
    )
}
