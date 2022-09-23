import React from 'react'
import CardItem from '../CardItem'

export default function CardGroup() {

    const dummy = [
        { colorCard: "#EB2F96", titleGroup: "Group Task 1" },
        { colorCard: "#7B61FF", titleGroup: "Group Task 2" },
        { colorCard: "#2F54EB", titleGroup: "Group Task 3" },
        { colorCard: "#52C41A", titleGroup: "Group Task 4" }
    ]

    return (
        <div className='flex'>
            {
                dummy.map((el, i) => (
                    <CardItem colorCard={el.colorCard} titleGroup={el.titleGroup} />
                ))
            }
        </div>
    )
}
