import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserData, LoginUser } from '../slices/userSlice';

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' to='/' style={{ textDecoration: 'none', color: '#f68b1e' }}>
        GOMYCODE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { errors: RegisterErrors, isAuth, userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserData());
    if (isAuth && userInfo.role === 'user') nav('/profile');
    else if (isAuth && userInfo.role === 'admin') nav('/dashboard');
  }, [isAuth, nav, userInfo.role]);
  const {
    register: inputLogin,
    handleSubmit: handleInput,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(LoginUser(data));
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#f68b1e' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            LOGIN
          </Typography>
          <Box component='form' noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  {...inputLogin('email', {
                    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                    required: true,
                  })}
                />
                <p style={{ color: 'red' }}>
                  {errors.email?.type === 'required' && 'Email is required'}
                  {errors.email?.type === 'pattern' && 'Email should be valid'}
                </p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  {...inputLogin('password', {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                    required: true,
                  })}
                />
                <p style={{ color: 'red' }}>
                  {errors.password?.type === 'required' && 'Password is required'}
                  {errors.password?.type === 'pattern' &&
                    'Password must have 8 characters, 1 lowercase character, 1 uppercase character and 1 number.'}
                </p>
              </Grid>
            </Grid>
            <p>{RegisterErrors && RegisterErrors} </p>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, backgroundColor: '#f68b1e' }}
              hovered={false}
              onClick={handleInput(onSubmit)}
            >
              LOGIN
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <p>
                  Don't have an account? Register from <Link to='/register'>here</Link> .
                </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
