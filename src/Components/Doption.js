import React, { useContext } from 'react'
import { LoginContext } from './ContextProvider'
import "./buynow.css"

const Doption = ({ datadelete, get }) => {

    const { account, setAccount } = useContext(LoginContext)

    const removeData = async (req, res) => {
        try {
            const res = await fetch(`/delete/${datadelete}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            console.log("Data", data)
            if (res.status === 400 || !data) {
                console.log("error")
            } else {
                setAccount(data)
                console.log("Item Delete")
                get()
            }
        } catch (error) {
            console.log("error")
        }
    }


    return (
        <>
            <div className="add_remove_select" >
                <select name="" id="">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <p onClick={() => removeData(datadelete)} style={{ cursor: "pointer" }}>Delete</p><span>|</span>
                <p className="forremovemedia">Save Or Later</p><span>|</span>
                <p className="forremovemedia">See More like this</p>
            </div >
        </>
    )
}

export default Doption