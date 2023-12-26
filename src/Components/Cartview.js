import React, { useContext, useEffect, useState } from 'react'
import "./cartview.css"
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { LoginContext } from './ContextProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cartview = () => {
    const { id } = useParams("")
    const history = useNavigate("")
    const [singleData, setSingleData] = useState([])

    const { account, setAccount } = useContext(LoginContext)
    console.log("Account Cartview", account)

    const getIndivisualData = async () => {
        const res = await fetch(`/singlepizza/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json();
        if (res.status !== 201) {
            console.log("no Data Available")
        } else {
            console.log("Get Data")
            setSingleData(data)
        }
    }
    useEffect(() => {
        getIndivisualData();
    }, [id])

    //Add to Cart   
    const addtoCart = async (_id) => {
        const chakers = await fetch(`/addCart/${_id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

            }),
            credentials: 'include'
        });
        const data1 = await chakers.json()
        console.log("data1 from cartview", data1)

        if (chakers.status === 401 || !data1) {
            console.log("user Invalids")
            alert("User Invalid Pizza.js")
        } else {
            toast.success('Added in Cart', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setAccount(data1)
            history("/buynow")
        }
    }

    return (
        <>
            <div className="cart_section">

                <div className="cart_container">
                    <div className="left_cart">
                        <img src={singleData.image} alt="Images" />
                        <div className="cart_btn">
                            <button className="cart_btn1" onClick={() => addtoCart(singleData._id)}>Add to Cart</button>
                            <NavLink to={"/buynow"} ><button className="cart_btn2">Buy Now</button></NavLink>
                        </div>

                    </div>
                    <div className="right_cart">
                        <h3> {singleData.name} </h3>

                        <p className="mrp">M.R.P. : <del>₹ 222 </del></p>
                        <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹ 200</span></p>
                        <p>You save : <span style={{ color: "#B12704" }}> ₹ 22 </span></p>

                        <div className="discount_box">
                            <h5 >Discount : <span style={{ color: "#111" }}> 10%</span> </h5>
                            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Oct 8 - 21</span> </h4>
                            <p style={{ color: "#111" }}>Will be Deliverd: <span style={{ color: "#111", fontWeight: "600" }}> within 30mins </span></p>
                        </div>
                        <p className="description">Add Coupon Code : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}><input type="text" /></span></p>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Cartview