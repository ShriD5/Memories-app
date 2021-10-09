import React, { useState } from 'react';
import {
   Avatar,
   Button,
   Paper,
   Grid,
   Typography,
   Container,
} from '@material-ui/core';
import Icon from './icon';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';

const Auth = () => {
   const classes = useStyles();
   const [showPassword, setShowPassword] = useState(false);
   const [isSignup, setIsSignup] = useState(false);
   const dispatch = useDispatch();
   const history = useHistory();

   const handleSubmit = () => {};
   const handleChange = () => {};
   const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
      handleShowPassword(false);
   };

   const handleShowPassword = () =>
      setShowPassword((prevShowPassword) => !prevShowPassword);

   const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;
      try {
         dispatch({ type: 'AUTH', data: { result, token } });

         history.push('/');
      } catch (error) {
         console.log(error);
      }
   };

   const googleFailure = () => {
      console.log('Google Sign was unsuccesful');
   };
   return (
      <Container component="main" maxWidth="xs">
         <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">
               {' '}
               {isSignup ? 'Sign Up' : 'Sign In'}{' '}
            </Typography>

            <form className={classes.form} onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                  {isSignup && (
                     <>
                        <Input
                           name="firstName"
                           label="firstName"
                           handleChange={handleChange}
                           autoFocus
                           half
                        />
                        <Input
                           name="lastName"
                           label="lastName"
                           handleChange={handleChange}
                           half
                        />
                     </>
                  )}

                  <Input
                     name="email"
                     label="Email Address"
                     handleChange={handleChange}
                     type="email"
                  />
                  <Input
                     name="password"
                     label="Password"
                     handleChange={handleChange}
                     type={showPassword ? 'text' : 'password'}
                     handleShowPassword={handleShowPassword}
                  />

                  {isSignup && (
                     <Input
                        name="confirmPassword"
                        label="Repeat Password"
                        handleChange={handleChange}
                        type="password"
                     />
                  )}
               </Grid>

               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  {isSignup ? 'Sign up' : 'Sign In '}
               </Button>
               <GoogleLogin
                  clientId="519521272651-thev46obg02d044pcn3frplg6f5q1a9q.apps.googleusercontent.com"
                  render={(renderProps) => (
                     <Button
                        className={classes.googleButton}
                        color="primary"
                        fullWidth
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        startIcon={<Icon />}
                        variant="contained"
                     >
                        Google Sign In
                     </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
               />
               <Grid container justifyContent="flex-end">
                  <Grid item>
                     <Button onClick={switchMode}>
                        {isSignup
                           ? 'Already have an account sign in '
                           : ' Sign Up'}
                     </Button>
                  </Grid>
               </Grid>
            </form>
         </Paper>
      </Container>
   );
};

export default Auth;
