import React, { useState, useContext } from 'react'
import { LoginContext } from './ContextProvider'
import { NavLink } from 'react-router-dom'
import "./buynow.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [logdata, setData] = useState({
        email: "",
        password: ""
    })
    const { account, setAccount } = useContext(LoginContext)

    console.log(logdata)

    const adddata = (e) => {
        const { name, value } = e.target

        setData(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    }
    const sendData = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;

        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await res.json();
        console.log(data)
        if (res.status == 400 || !data) {
            toast.error('Invalid Details', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            toast.success('Login Sucessfull', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            setAccount(data)
            setData({ ...logdata, email: "", password: "" })
        }
    }
    return (
        <>
            <div>
                <div className="row justify-content-center col-lg-12 col-md-6 ">
                    <div className="col-md-5 text-left ">
                        <h2 style={{ fontSize: '35px' }} >Login  </h2>
                        <form >
                            <div>
                                <input required type="text" placeholder='test@email.com' className='form-control' value={logdata.email} onChange={adddata} name='email' />
                                <input required type="text" placeholder='1234567' className='form-control' value={logdata.password} onChange={adddata} name='password' />
                                <button className='btn mt-3' onClick={sendData} >Login</button>
                            </div>
                        </form>
                        <div className='regi'>
                            <p>Don't have account ? please Register</p>
                            <NavLink to={"/register"}> <button className='btn mt-3' >Register</button> </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login