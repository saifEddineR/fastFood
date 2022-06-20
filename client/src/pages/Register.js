import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewUser } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' to='/' style={{ textDecoration: 'none', color: '#f68b1e' }}>
        GOMYFOOD
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { errors: RegisterErrors, isAuth } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuth) nav('/profile');
  }, [isAuth, nav]);
  const {
    register: inputRegister,
    handleSubmit: handleInput,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(registerNewUser(data));
  };
  console.log(errors);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
            REGISTER
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='given-name'
                  name='userName'
                  required
                  fullWidth
                  id='userName'
                  label='Username'
                  autoFocus
                  {...inputRegister('userName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  {...inputRegister('email', {
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
                  {...inputRegister('password', {
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
              onClick={handleInput(onSubmit)}
            >
              Register
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <p>
                  Already have an account? Login from <Link to='/login'>here</Link> .
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
