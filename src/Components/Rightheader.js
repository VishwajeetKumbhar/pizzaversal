import React from 'react'
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import { LoginContext } from './ContextProvider';
import { useState, useContext } from "react"
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import "./rightheader.css"

const Rightheader = ({ logclose }) => {
    const { account, setAccount } = useContext(LoginContext)
    return (
        <>
            <div className="rightheader">
                <div className="right_nav">
                    {
                        account ?
                            <Avatar className="avtar2"
                                title={account.name.toUpperCase()}>{account.name[0].toUpperCase()}</Avatar> :
                            <Avatar className="avtar"
                            />
                    }
                    {account ? <h3> {account.name.toUpperCase()}</h3> : ""}
                </div>
                <div className="nav_btn" onClick={() => logclose()}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Shop By Category</NavLink>
                    <Divider style={{ width: "100%", marginLeft: -20 }} />
                    <NavLink to="/" style={{ marginTop: 10 }}>Today's Deal</NavLink>
                    {
                        account ? <NavLink to="/buynow">Your Order</NavLink> : <NavLink to="/login">Your Order</NavLink>
                    }
                    <Divider style={{ width: "100%", marginLeft: -20 }} />
                    <div className="flag">
                        <NavLink to="" style={{ marginTop: 14 }}>Settings</NavLink>
                    </div>

                    {
                        account ?
                            <div className="flag">
                                <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                                <h3 style={{ cursor: "pointer", fontWeight: 300 }}>Log Out</h3>
                            </div>
                            : <NavLink to="/login">Sign in</NavLink>
                    }
                </div>
            </div>
        </>
    )
}

export default Rightheader