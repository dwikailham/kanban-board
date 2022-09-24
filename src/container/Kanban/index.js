import React from 'react';
import "antd/dist/antd.css";
import Sidebar from '../../components/Sidebar';
import Content from '../../components/Content';

export default function Kanban() {
    return (
        <div className='flex container'>
            <Sidebar />
            <div className='p-10' >
                <h1 className='text-xl font-bold'>Product Roadmap</h1>
                <Content />
            </div>
        </div>
    )
}
