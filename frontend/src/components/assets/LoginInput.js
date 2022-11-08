import React from 'react'
import { Box, Button, TextField, Stack } from '@mui/material';
import { Link } from 'react-router-dom'
function LoginInput() {
    return (
      <Stack direction='column' width={'30%'} margin={'auto'} spacing={4}>
        <h1>Political Resource Hub</h1>
        <TextField 
          fullwidth id="outlined-email" 
          label=" Enter Email" 
          variant="outlined"
        />
        <TextField 
          id="outlined-password" 
          label="Enter Password" 
          variant="outlined" 
        />
        <Link to='/info' style={{textDecoration: 'none'}}>
          <Button variant="contained">Login</Button>
        </Link>
        <div>
          - OR -
        </div>
        <div>
          GOOGLE LOGIN
        </div>
      </Stack>
    )
  }

  export default LoginInput