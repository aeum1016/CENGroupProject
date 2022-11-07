import Box from '@mui/material/Box';
import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function LoginInput() {
    return (
      <div>
        <h1>Political Resource Hub</h1>
        <TextField 
            fullwidth id="outlined-email" 
            label=" Enter Email" 
            variant="outlined"
        />
        <br></br>
        <TextField 
            id="outlined-password" 
            label="Enter Password" 
            variant="outlined" 
        />
        <br></br>
        <Button variant="contained">Login</Button>
        <br></br>
        OR
        <br></br>
        GOOGLE LOGIN
      </div>
    )
  }

  export default LoginInput