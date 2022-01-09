import React, {Component} from 'react';
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {signUp} from "./service/ApiService";

class SignUp extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");

        signUp({email: email, username: username, password: password}).then(
            (response) => {
                if (response.email) {
                    window.location.href = "/login";
                }
            }
        )
    }

    render() {
        return (
            <div>
                <Container component={"main"} maxWidth={"xs"} style={{marginTop: "8%"}}>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography component={"h1"} variant={"h5"}>
                                    계정생성
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant={"outlined"}
                                    required
                                    fullWidth
                                    id={"username"}
                                    label={"사용자 이름"}
                                    name={"username"}
                                    autoComplete={"username"}
                                />
                            </Grid>
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
                                    type={"password"}
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
                                    계정생성
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent={"flex-end"} style={{marginTop: "10px"}}>
                            {/*오타, 책에 href로 되어 있음*/}
                            <Grid item>
                                <Link to={"/login"} variant={"body2"}>
                                    이미 계정이 있습니까? 로그인 하세요.
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        );
    }
}

export default SignUp;