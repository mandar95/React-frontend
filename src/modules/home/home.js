
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap';
import styled from "styled-components"
import { loading } from "../form/login.slice";
import { _data } from "./home.helper";
import { SiNike } from "react-icons/si";

const Home = () => {
    const dispatch = useDispatch()
    // useEffect(() => {
    //     if (!isAuthenticated) navigate('/sign-in')
    // }, [isAuthenticated])
    return (
        <div
            className="row"
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap'
            }}>
            {_data.map((item, index) => {
                return (
                    <>
                        <Card className="col-md-3" key={(index + 1)}>
                            <div>
                                <h4 style={{ margin: '0px' }}><SiNike /></h4>
                            </div>
                            <div style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{item.name}</div>
                            <img src={item.img} width={250} height={250} alt='nike-logo'></img>
                            <div style={{ fontWeight: 'bold' }}>{item.price}</div>
                        </Card>
                    </>
                )
            })}
        </div>
    );
}

export default Home;

const Card = styled.div`
padding: 10px;
border-radius: 4px;
text-align: center;
box-shadow: 3px 3px 12px 1px #d2d2d2;
margin: 8px 5px;
`

