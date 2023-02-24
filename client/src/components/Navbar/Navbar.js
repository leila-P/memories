import React, { Component, useState ,useEffect} from 'react';
import { AppBar,Avatar,Button,Toolbar,Typography } from '@material-ui/core';
import { useNavigate,useLocation  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import useStyles from './styles';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import * as actionType from '../../constants/actionTypes';const Navbar = () => {
    const classes = useStyles();
    const [user ,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
     const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

    useEffect(()=>{
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

        setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
    
    return ( 
        <AppBar className={classes.appBar} position="static" color="inherit">
            <NavLink to="/" className= {classes.brandContainer}>
                <img src={memoriesText}  alt="icon" height="45px"/>
                 <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </NavLink>
            <Toolbar className={classes.toolbar}>
                { user ?(
                    <div className={classes.profile} >
                            <Avatar className={classes.purpole} alt={user?.name} src={user?.picture} >{user?.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} varient='h6'>{user.name}</Typography>
                            <Button className={classes.logout} variant='contained' color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component={ NavLink } to="/auth" variant='contained' color='primary' >Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
       );
}
 
export default Navbar;
