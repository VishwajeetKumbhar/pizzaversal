import React, { useEffect, useState } from 'react'
import "./buynow.css"
import Doption from './Doption'
import Subtotal from './Subtotal'
const Buynow = () => {
    const [CartData, SetCartData] = useState("")

    const [variant, setVariant] = useState("small")
    const getdatabuy = async () => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        if (res.status !== 201) {
            console.log("error")
        }
        else {
            SetCartData(data.carts)
        }
    };


    useEffect(() => {
        getdatabuy()
    }, [])

    return (
        <>
            {
                CartData.length ? <div className="buynow_section">
                    <div className="buynow_container con">
                        <div className="left_buy">
                            <h2>Shopping Cart</h2>
                            <p>Select all items</p>
                            <span className="leftbuyprice">Price</span>
                            <hr />
                            {
                                CartData.map((e, k) => {
                                    return (
                                        <>
                                            <div className="item_containert imge" >
                                                <img src={e.image} alt="" />
                                                <div className="item_details">
                                                    <h3> {e.name} </h3>
                                                    <h3 className="diffrentprice">₹ {e.prizes[0][variant]}</h3>
                                                    <p className="unusuall">Usually dispatched in 30 Mins.</p>
                                                    <p>Eligible for FREE Shipping</p>
                                                    <Doption datadelete={e._id} get={getdatabuy} />
                                                </div>
                                                <h3 className="item_price">₹ {e.prizes[0][variant]}</h3>
                                            </div>
                                            <hr />
                                        </>
                                    )
                                })
                            }
                            <Subtotal iteam={CartData} />
                        </div>
                    </div>
                    <hr />
                </div> : ""

            }

        </>
    )
}

export default Buynow