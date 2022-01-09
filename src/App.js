import React, {Component} from 'react';
import Todo from "./Todo";
import './App.css';
import {AppBar, Button, Container, Grid, List, Paper, Toolbar, Typography} from "@material-ui/core";
import AddTodo from "./AddTodo";
import {call, signOut} from "./service/ApiService"
import Loading from "./Loading";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true, // 로딩 중이라는 상태를 표현할 변수
        };
    }

    componentDidMount() {
        call("/todo", "GET", null).then((response) => this.setState({ items: response.data, loading: false }));
    }

    add = (item) => {
        call("/todo", "POST", item).then((response) => this.setState({ items: response.data }));
    }

    delete = (item) => {
        call("/todo", "DELETE", item).then((response) => this.setState({ items: response.data }));
    }

    update = (item) => {
        call("/todo", "PUT", item).then((response) => this.setState({ items: response.data }));
    }


    render() {
        const todoItems = this.state.items.length > 0 && (
            <Paper style={{margin: 16}}>
                <List>
                    {this.state.items.map((item )=>(
                        <Todo
                            item={item}
                            key={item.id}
                            delete={this.delete}
                            update={this.update}
                        />
                    ))}
                </List>
            </Paper>
        );

        // navigationBar 추가
        const navigationBar = (
            <AppBar position={"static"}>
                <Toolbar>
                    <Grid justifyContent={"space-between"} container>
                        <Grid item>
                            <Typography variant={"h6"}>오늘의 할일</Typography>
                        </Grid>
                        <Grid>
                            <Button color={"inherit"} onClick={signOut}>
                                로그아웃
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )

        // 로딩 중이 아닐 때 렌더링할 부분
        const todoListPage = (
            <div className={"App"}>
                {navigationBar}
                <Container maxWidth={"md"}>
                    <AddTodo add={this.add}/>
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        );

        // 로딩 중일 때 렌더링할 부분
        let content = <Loading/>;

        if (!this.state.loading) {
            content = todoListPage;
        }

        return (
            <div className={"App"}>
                {content}
            </div>
        );
    }
}

export default App;