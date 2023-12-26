import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {

    const [udata, setudata] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        cpassword: ''

    })
    console.log(udata);

    const addData = (e) => {
        const { name, value } = e.target

        setudata(() => {
            return {
                ...udata,
                [name]: value
            }
        })
    }
    const sendData = async (e) => {
        e.preventDefault();
        const { name, email, mobile, password, cpassword } = udata;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, mobile, password, cpassword
            })
        });
        const data = await res.json();
        console.log(data);

        if (res.status === 404 || !data) {
            alert("Error");
            console.log("error")
        } else {
            toast.success('Register Sucessfull', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            setudata({ ...udata, name: "", email: "", mobile: "", password: "", cpassword: "" })
        }
    }
    return (
        <>
            <div>
                <div className="row justify-content-center ">
                    <div className="col-md-5 text-left ">
                        <h2 style={{ fontSize: '35px' }} >Register  </h2>
                        <form >
                            <div>
                                <input required type="text" placeholder='Name' className='form-control' value={udata.name} onChange={addData} name='name' />
                                <input required type="text" placeholder='email' className='form-control' value={udata.email} onChange={addData} name='email' />
                                <input required type="text" placeholder='mobile' className='form-control' value={udata.mobile} onChange={addData} name='mobile' />
                                <input required type="text" placeholder='password' className='form-control' value={udata.password} onChange={addData} name='password' />
                                <input type="text" placeholder='conform password' className='form-control' value={udata.cpassword} onChange={addData} name='cpassword' />
                                <button onClick={sendData} className='btn btn-danger mt-4' type='submit' >Register</button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Register