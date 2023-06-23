import React, { Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandginPage from "./modules/core/landingPage"
import Login from "./modules/form/login/login";
import SignUp from "./modules/form/signUp/signUp";
import ForgetPassword from "./modules/form/forget-password/forget-password";

import Layout from "./modules/layout/layout"
import Home from "./modules/home/home";


const Router = props => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<LandginPage />} />
                    <Route path="/sign-in" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/about-us" element={<h1>about</h1>} />
                        <Route path="/contact-us" element={<h1>contact</h1>} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default Router