import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Box, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import {VisibilityOff, Visibility} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Notiflix from "notiflix";
import { authSignUpThunk } from "redux/auth/auth.thunk";
import { useDispatch } from "react-redux";
import { HeaderButton } from "components/Layout/Navigation/Navigation.styled";

const inittialValues = {
    email: '',
    name: '',
    password: '',
};



const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#6f172b',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#b73c58',
    },
    '&:hover fieldset': {
      borderColor: '#bdbdbd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#b73c58',
    },
  },
});

const JoinPage = () => {
    const [values, setValues] = useState(inittialValues);
   
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = event => {
        const { value, name } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        
        try {
            
            await dispatch(authSignUpThunk(values)).unwrap();
            
            navigate('/', { replace: true });
          
            Notiflix.Notify.success("It's ok!");
                           
        } catch (error) {
            console.log(error);
            Notiflix.Notify.failure('Some mistake');
        }
        
    }
    return (
        <>
           
            
            <Box
                component="form"
                sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                >
                <CssTextField
                    id="custom-css-outlined-input"
                    label="Name"
                    placeholder="User name"
                    multiline
                    type="text"
                    name="name"
                    required
                    onChange={handleChange}
                    value={values.name}
                />
                <CssTextField
                    id="custom-css-outlined-input"
                    label="Email"
                    placeholder="User email"
                    multiline
                    type="text"
                    name="email"
                    required
                    onChange={handleChange}
                    value={values.email}
                />
                <FormControl sx={{
                            m: 1, width: '25ch',
                            '& label.Mui-focused': {color: '#6f172b',},
                            '& .MuiInput-underline:after': {borderBottomColor: 'green',},
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {borderColor: '#b73c58',},
                                '&:hover fieldset': {borderColor: '#bdbdbd',},
                                '&.Mui-focused fieldset': {borderColor: '#b73c58',},
                            },
                        }} variant="outlined"
                    >
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                                {showPassword ? <VisibilityOff sx={{color: '#b73c58'}} /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                        name='password'
                        required
                        onChange={handleChange}
                        value={values.password}
                    />
                </FormControl>
                <br/>
                <HeaderButton
                    type='submit'
                    sx={{color: '#fbe5eb', m: '8px auto'}}
                >
                    Sign In
                </HeaderButton>
                <HeaderButton
                    component={Link}
                    to='/login'
                    type='button'
                    sx={{color: '#fbe5eb', m: '8px auto', ml: '16px'}}
                >
                    I have account
                </HeaderButton>
            </Box>
            
        </>
    )
}

export default JoinPage;