import React from 'react';
import ModalClick from '../../components/Modal';
import Sidebar from '../../components/Sidebar';
import Content from '../../components/Content';

export default function Kanban() {
    return (
        <div className='flex container mx-auto'>
            <Sidebar />
            <div className='flex-col p-10' >
                <h1 className='text-xl font-bold'>Product Roadmap</h1>
                <Content />
            </div>
        </div>
    )
}
