import React, { useEffect} from 'react'
import Pizza from "./Pizza"
import { useSelector, useDispatch } from "react-redux"
import { showUser } from "../features/createSlice"

export default function PizzaScreen() {
    const dispatch = useDispatch()

    const {users , loading} = useSelector((state)=> state.app)

    useEffect(() => {
        dispatch(showUser())
    }, [])
    return (
        <div>
            <div className="row">
                {users.map(pizza => {
                    return <div className="col-md-4" >
                        <div >
                            <Pizza pizza={pizza} />
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
