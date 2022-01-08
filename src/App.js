import React, {Component} from 'react';
import Todo from "./Todo";
import './App.css';
import {Container, List, Paper} from "@material-ui/core";
import AddTodo from "./AddTodo";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
            ],
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: { "Content_type": "application/json"},
        };

        fetch("http://localhost:8080/todo", requestOptions)
            .then((response) => response.json())
            .then(
                (response) => {
                    this.setState({
                        items: response.data,
                    });
                },
                (error) => {
                    this.setState({
                        error,
                    });
                }
            )

    }

    add = (item) => {
        const thisItems = this.state.items;
        item.id = "ID-" + thisItems.length;
        item.done = false;
        thisItems.push(item);
        this.setState({items: thisItems});
    }

    delete = (item) => {
        const thisItems = this.state.items;
        const newItems = thisItems.filter(e => e.id !== item.id);
        this.setState({items: newItems});
    }

    render() {
        const todoItems = this.state.items.length > 0 && (
            <Paper style={{margin: 16}}>
                <List>
                    {this.state.items.map((item )=>(
                        <Todo item={item} key={item.id} delete={this.delete}/>
                    ))}
                </List>
            </Paper>
        );

        return (
            <div className={"App"}>
                <Container maxWidth={"md"}>
                    <AddTodo add={this.add}/>
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        );
    }
}

export default App;