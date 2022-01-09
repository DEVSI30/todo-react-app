import React, {Component} from 'react';
import {signIn} from "./service/ApiService";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";

class Login extends Component {


    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");

        signIn({email: email, password: password});
    }

    render() {
        return (
            <Container component={"main"} maxWidth={"xs"} style={{marginTop: "8%"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component={"h1"} variant={"h5"}>
                            로그인
                        </Typography>
                    </Grid>
                </Grid>
                <form noValidate onSubmit={this.handleSubmit}>
                    {" "}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant={"outlined"}
                                required
                                fullWidth
                                id={"email"}
                                label={"이메일 주소"}
                                name={"email"}
                                autoComplete={"email"}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant={"outlined"}
                                required
                                fullWidth
                                id={"password"}
                                label={"패스워드"}
                                name={"password"}
                                autoComplete={"current-password"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type={"submit"}
                                fullWidth
                                variant={"contained"}
                                color={"primary"}
                            >
                                로그인
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default Login;