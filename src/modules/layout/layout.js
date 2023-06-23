import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useNavigate } from "react-router-dom"
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import styled from "styled-components"

import { logOutAction } from "../form/login.slice";
import IdleTimer from "../../utils/IdleTimer";
import SecureLS from "secure-ls";

import Swal from 'sweetalert2';
import { FaHamburger } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";


let _list = [{ name: "About us", link: "/about-us", child: [{ name: "About us1" }, { name: "About us2" }] },
{ name: "Contact us", link: "/contact-us", child: [] }]

const Layout = () => {
    const { loading, isAuthenticated } = useSelector((state) => state.login)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const ls = new SecureLS();
    const SessionTime = ls.get("session");
    const [isTimeout, setIsTimeout] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const timer = new IdleTimer({
            timeout: 15 * 60, //expire after 15 minute
            onTimeout: () => {
                setIsTimeout(true);
            },
            onExpired: () => {
                //do something if expired on load
                setIsTimeout(true);
            }
        });

        return () => {
            timer.cleanUp();
        };
    }, []);

    useEffect(() => {
        if (isTimeout /* Session TimeOut */) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Your Session Expired',
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                dispatch(logOutAction())
            })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTimeout])

    useEffect(() => {
        if (!SessionTime && !loading) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Session Closed',
                text: 'Logout from current account',
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                dispatch(logOutAction())
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SessionTime])

    useEffect(() => {
        if (!isAuthenticated) {
            if (loading || isTimeout) {
                navigate('/sign-in')
            }
            else {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'Session Closed',
                    text: 'Logout from current account',
                    showConfirmButton: false,
                    timer: 2000,
                }).then(() => {
                    navigate('/sign-in')
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, loading]);

    const _navigateTo = (link) => {
        navigate(link)
        handleClose()

    }

    const createList = (list) => {
        debugger
        if (list?.length) {
            list?.map((item) => {
                let _li = (<li>{item.name}</li>)
                // if (item?.child?.length) {
                //     createList(item?.child)
                // } else {
                //     return <li onClick={() => _navigateTo(item.link)}>{item.name}</li>
                // }
            return <li onClick={() => _navigateTo(item.link)}>{item.name}</li>

                return _li
            })
        }
    }

    return (
        <main className="App">
            <Navbar bg="light" expand="lg">
                <h3 onClick={() => handleShow()} style={{ marginLeft: '20px', cursor: 'pointer' }}><FaHamburger /></h3>
                <Container>
                    <Navbar.Brand href="#home">
                        <img src='/assets/images/nikePNG.png' width={120} height={50} alt='nike-logo'></img>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <LogoutBtn onClick={() => dispatch(logOutAction(navigate))}>
                            <h6 style={{
                                margin: '0px',
                                color: '#fff',
                                letterSpacing: '1px'
                            }}>Log Out <AiOutlineLogout style={{ color: '#fff' }} /></h6>
                        </LogoutBtn>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Offcanvas show={show} onHide={handleClose} placement={'start'} name={'left'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul>
                        {_list.map((item) => {
                            return <li onClick={() => _navigateTo(item.link)}>{item.name}</li>
                        })}
                        {/* {createList(_list)} */}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
            <Outlet />
        </main>
    )
}

export default Layout

const LogoutBtn = styled.button`
border:none;
padding:5px 10px;
border-radius: 3px;
background: #ff2f2f;
`
