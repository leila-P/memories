import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import jwt_decode  from 'jwt-decode';
import {GoogleOAuthProvider,GoogleLogin,googleLogout} from '@react-oauth/google';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useNavigate  } from 'react-router-dom';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import {signin,signup} from '../../actions/auth'
const initialState = {firstName:'',lastName: '',email: '',password: '',confirmPassword:''};
const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  
  const classes = useStyles();
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
 }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
    const googleSuccess = (response)=>{
        console.log('success',response);
        const decode = jwt_decode(response.credential);
        const {name,picture,sub} = decode;
        console.log(decode);
        
        try{
            dispatch({type:'AUTH',data:{name,picture,sub}});
            navigate('/');
        }
        catch(error){

        }
    }
    const googleError = (response)=>{
        console.log(response);
        console.log('Google Sign In was unSuccesFull.Try Again Later')
    }
    return (
        <Container component = 'main' className='' maxWidth='xs' >
             <GoogleOAuthProvider clientId='667336021323-sh66re5s1gt2kgghlp8c6t3kjjt0hb6p.apps.googleusercontent.com' >{/*{`${process.env.NEXT_PUBLIC_GOOGLE_TOKEN}`}> */}
                <Paper className={classes.paper} elevation={3} >
                    <Avatar className={classes.avatar}  >
                        <LockOutlinedIcon />
                    </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2} >
                            { isSignup && (
                            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                        </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
                        </Button>
                        <GoogleLogin 
                            clientId={`${process.env.NEXT_PUBLIC_GOOGLE_TOKEN}`}
                            render={(renderProps)  =>(
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
                        />
          <Grid container justify="flex-end">
            <Grid item>
                                <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                                </Button>
                        </Grid>
          </Grid>
                    </form>
                </Paper>
            </GoogleOAuthProvider>

        </Container>
      );
}
 
export default Auth;