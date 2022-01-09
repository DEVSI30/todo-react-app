import React, {Component} from 'react';
import {CircularProgress, Container, Grid, Typography} from "@material-ui/core";

class Loading extends Component {
    render() {
        return (
            <Container component={"main"} maxWidth={"xs"} style={{marginTop: "8%"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component={"h1"} variant={"h1"}>
                            로딩중
                        </Typography>
                        <CircularProgress style={{marginTop: "40px"}}/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default Loading;