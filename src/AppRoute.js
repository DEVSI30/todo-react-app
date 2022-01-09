import React, {Component} from 'react';
import {Box, Typography} from "@material-ui/core";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Login from './Login'
import App from './App'
import SignUp from "./SignUp";


function Copyright() {
    return (
        <Typography variant={"body2"} color={"textSecondary"} align={"center"}>
            {"Copyright © "}
            todoApp, {new Date().getFullYear()}
            {"."}
        </Typography>
    )
}

class AppRouter extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Routes>
                            <Route path='/login' element={<Login/>} />
                            <Route path='/signup' element={<SignUp/>}/>
                            <Route path='/' element={<App/>} />
                        </Routes>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Router>
            </div>
        );
    }
}

export default AppRouter;