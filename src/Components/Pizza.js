import React, { useState } from 'react'
import { NavLink } from "react-router-dom"

export default function Pizza({ pizza }) {

    const [quantity, setquentity] = useState(1)
    const [variant, setVariant] = useState("small")
    const [show, setShow] = useState(false); const handleShow = () => setShow(true);

    return (
        <div className='m-5 shadow-lg p-3 mb-5 bg-white rounded' >
            <div onClick={handleShow} >
                <h1> {pizza.name} </h1>
                <img className='w-100' src={pizza.image} alt="" style={{ height: "200px", width: "300px" }} />
            </div>
            <div className="flex-container mt-3">
                <div className='w-100' >
                    <h1 className='m-1' >Price: {pizza.prizes[0][variant]} Rs/-   </h1>
                </div>
                <div className='w-100 '  >
                    <NavLink to={`/singlepizza/${pizza._id}`}>
                        <button className='btn '>View</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
