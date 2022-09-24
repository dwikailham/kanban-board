import React from 'react'
import logo from "../../assets/img/logo.png"

export default function Sidebar() {
    return (
        <div className='fixed inset-y-0 left-0 bg-[#2F3136] w-[68px]'>
            <img src={logo} alt="logo" className='pt-10 pl-2' />
        </div>
    )
}
