import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { _formInput } from "../login.helper";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';

import { signInAction, clear } from "../login.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const validationSchema = yup.object().shape({
  user_name: yup.string()
    .required('No name provided')
    .min(4, "min 4 char requied")
    .max(24, 'max 24 char requied')
    .matches(/[A-z0-9-_]$/, 'underscores, hyphens allowed.'),
  user_pass: yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  user_pass_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);

  const { control, formState: { errors }, handleSubmit, watch, setValue, reset, register } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    reValidateMode: "onChange"
  })

  useEffect(() => {
    const { loading, error, isAuthenticated } = loginState;
    if (!loading && isAuthenticated) {
      navigate('/home')
    }
    return () => {
      dispatch(clear())
    }
  }, [loginState])

  const onSubmit = (data) => {
    let _data = {
      user: data.user_name,
      pwd: data.user_pass,
    }
    // alert(JSON.stringify(_data))
    dispatch(signInAction(_data))
    //alert(JSON.stringify(data))
  }
  return (
    <>
      <LoginDivParent>
        <LoginDivChild>
          <H3>Sign In</H3>
          <form onSubmit={handleSubmit(onSubmit)}>
            {_formInput.map((item, i) =>
              <>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      key={(i + 1)}
                      onBlur={onBlur}
                      onChange={item.name === "user_pass" ? (e) => {
                        setValue("user_pass", e.target.value)
                      } : onChange}
                      //  value={value}
                      type={item.type}
                      label={item.label}
                      placeholder={item.placeholder}
                    />
                  )}
                  name={item.name}
                />
                {errors?.[item.name] && <ErrorTag>{
                  errors?.[item.name]?.message
                }</ErrorTag>}
              </>
            )}
            <Button variant="primary" type="submit" style={{
              padding: '5px 15px',
              marginTop: '15px',
              width: '100%'
            }}>Sign In</Button>
          </form>
          <ForgetPasswordDiv>
            <span></span>
            <span
              onClick={() => navigate('/forget-password')}
              style={{
                color: '#7c7c7c',
                cursor: 'pointer',
                fontSize: '15px'
              }}>Forget Password</span>
          </ForgetPasswordDiv>
          <NotaMember>
            <span style={{
              color: '#7c7c7c'
            }}>Not a member?</span><SignUpDiv onClick={() => navigate('/sign-up')}>Sign Up</SignUpDiv>
          </NotaMember>
        </LoginDivChild>
      </LoginDivParent>
    </>
  );
}

export default Login;

const LoginDivParent = styled.div`
height: 100vh;
background: #f7f7f7;
justify-content: center;
align-items: center;
display: flex;
`
const LoginDivChild = styled.div`
padding:10px;
padding: 25px;
background: white;
height: auto;
width: 50%;
box-shadow: 0px 1px 20px 0px #ececec;
`
const H3 = styled.h3`
line-height: 1.5;
font-weight: 400;
font-family: "Lato", Arial, sans-serif;
color: #000;
`
const ErrorTag = styled.p`
margin: 0px;
font-size: 10px;
color:red
`
const ForgetPasswordDiv = styled.div`
display: flex;
justify-content: space-between;
margin:5px 0px
`

const NotaMember = styled.div`
display: flex;
justify-content: center;
margin-top: 20px;
font-size: 15px;
`
const SignUpDiv = styled.span`
color: #e2970c;
cursor: pointer;
margin-left: 4px;
&:hover{
  color:#6d6dff
}
`