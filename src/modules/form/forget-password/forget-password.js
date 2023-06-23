import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../../components";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { _formForgetPassInput } from "../login.helper";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';


const validationSchema = yup.object().shape({
    user_email: yup.string().required('No email provided.').email(),
})

const ForgetPassword = () => {
    const navigate = useNavigate();

    const { control, formState: { errors }, handleSubmit, watch, setValue, reset, register } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
        reValidateMode: "onChange"
    })

    console.log('error', errors)
    const onSubmit = (data) => {
        alert(JSON.stringify(data))
    }
    return (
        <>
            <LoginDivParent>
                <LoginDivChild>
                    <H3>Forgot Your Password ?</H3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {_formForgetPassInput.map((item, i) =>
                            <>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            key={(i + 1)}
                                            onBlur={onBlur}
                                            onChange={onChange}
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
                        }}>Reset Password</Button>
                    </form>
                    <Member>
                        <SignInDiv onClick={() => navigate('/sign-in')}>Back to sign in</SignInDiv>
                    </Member>
                </LoginDivChild>
            </LoginDivParent>
        </>
    );
}

export default ForgetPassword;

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

const Member = styled.div`
display: flex;
justify-content: center;
margin-top: 20px;
font-size: 15px;
`
const SignInDiv = styled.span`
color: #e2970c;
cursor: pointer;
margin-left: 4px;
&:hover{
  color:#6d6dff
}
`