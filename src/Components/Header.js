import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import "./style.css"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { LoginContext } from './ContextProvider';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Rightheader from './Rightheader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Header = () => {

    const { users, loading } = useSelector((state) => state.app)
    const { account, setAccount } = useContext(LoginContext)
    const [text, setText] = useState("")
    console.log("search Text", text)
    const [liopen, setLiopen] = useState(true)
    const [dropen, setDropen] = useState(false)
    const history = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const getdetailvaliduser = async () => {
        const res = await fetch("https://pizzaserver-i3rz.onrender.com/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await res.json();
        console.log("get user data", data)
        if (res.status !== 201) {
            console.log("Header error")
        } else {
            console.log("data Valid header.js")
            setAccount(data)
        }
    }

    const handleopen = () => {
        setDropen(true)
    }
    const hadledrClose = () => {
        setDropen(false)
    }
    const getText = (items) => {
        setText(items)
        setLiopen(false)
    }

    useEffect(() => {
        getdetailvaliduser()
    }, [])

    const LogoutUser = async () => {
        const res3 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data2 = await res3.json();
        console.log("LogOut Data2", data2)
        if (res3.status !== 201) {
            console.log("Logout  error")
        } else {
            setAccount(false)
            toast('Logout', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            history("/")
        }
    }

    return (
        <>
            <header>
                <nav className='shadow-lg' >

                    <div className="left">
                        <IconButton className="hamburgur" onClick={handleopen} >
                            <MenuIcon style={{ color: "#fff" }} />
                        </IconButton>

                        <Drawer open={dropen} onClose={hadledrClose}>
                            <Rightheader logclose={hadledrClose} />
                        </Drawer>

                        <div className="navname" style={{ textDecoration: 'none' }}>
                            <NavLink to='/'> <h1 className='heading' >My Pizza</h1> </NavLink>
                        </div>
                        <div className="nav_searchbaar">
                            <input type="text" name=''
                                onChange={(e) => getText(e.target.value)}
                                placeholder='Search your product' />
                            <div className="search_icon">
                                <i className="fas fa-search" id="search"></i>
                            </div>
                            {
                                text &&
                                <List className='extrasearch' hidden={liopen} >
                                    {
                                        users.filter(e => e.name.toLowerCase().includes(text.toLowerCase())).map(v => (
                                            <ListItem>
                                                <NavLink to={`/singlepizza/${v._id}`} onClick={() => setLiopen(true)} >
                                                    {v.name}
                                                </NavLink>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            }
                        </div>
                    </div>
                    <div className="right">
                        <div className="nav_btn">
                            <NavLink to={'/login'} >Login</NavLink>
                        </div>
                        {
                            account ? <NavLink to="/buynow">
                                <div className="cart_btn">
                                    <Badge badgeContent={account.carts.length} color="secondary">
                                        <i className="fas fa-shopping-cart" id="icon"></i>
                                    </Badge>
                                </div>
                            </NavLink> : <NavLink to="/login">
                                <div className="cart_btn">
                                    <Badge badgeContent={0} color="secondary">
                                        <i className="fas fa-shopping-cart" id="icon"></i>
                                    </Badge>
                                </div>
                            </NavLink>
                        }
                        {
                            account ?
                                <Avatar className="avtar2 mx-3"
                                    onClick={handleClick} title={account.name.toUpperCase()}>{account.name[0].toUpperCase()}</Avatar> :
                                <Avatar className="avtar mx-3"
                                    onClick={handleClick} />
                        }
                        {/* <Avatar id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}> {account.name} </Avatar> */}
                        <Menu className='mt-2'
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {

                                account ? <MenuItem onClick={LogoutUser}> <LogoutIcon className='mx-1' /> Logout</MenuItem> : " "
                            }
                            <MenuItem onClick={handleClose}> <AccountBoxIcon className='mx-1' /> Profile</MenuItem>
                            <MenuItem onClick={handleClose}> <SettingsIcon className='mx-1' /> Setting</MenuItem>
                        </Menu>

                    </div>
                    <ToastContainer />
                </nav>
            </header>
        </>
    )
}

export default Header