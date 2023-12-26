import React, { useEffect, useState } from 'react'
import "./buynow.css"

const Subtotal = ({ iteam }) => {
    const [variant, setVariant] = useState("small")
    const [Price, setPrice] = useState(0)

    const totalAmout = () => {
        let Price = 0
        iteam.map((item) => {
            Price = item.prizes[0][variant] + Price
        })
        setPrice(Price)
    }
    useEffect(() => {
        totalAmout()
    }, [iteam])

    return (
        <>
            <div className='sub_item' >
                <h4>Subtotal (1 item): <strong style={{ color: "green" }}> {Price} Rs/-</strong> </h4>
            </div>
        </>
    )
}

export default Subtotal