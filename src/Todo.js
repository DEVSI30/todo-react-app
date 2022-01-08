import React, {Component} from 'react';
import {ListItem, Checkbox, ListItemText, InputBase, ListItemSecondaryAction, IconButton} from "@material-ui/core"
import {DeleteOutlined} from "@material-ui/icons";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {item: props.item, readOnly: true};
        this.update = props.update;
        this.delete = props.delete;
    }

    deleteEventHandler = () => {
        this.delete(this.state.item);
    }

    offReadOnlyMode = () => {
        this.setState({ readOnly: false}, () => {
            console.log("ReadOnly? ", this.state.readOnly);
        })
    };

    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({readOnly: true});
            this.update(this.state.item);
        }
    };

    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item: thisItem});
    }

    checkboxEventHandler = () => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({ item: thisItem });
        this.update(this.state.item);
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox
                    checked={item.done}
                    onClick={this.checkboxEventHandler}
                />
                <ListItemText>
                    <InputBase
                        inputProps={{
                            "aria-label": "naked",
                            readOnly: this.state.readOnly,
                        }}
                        onClick={this.offReadOnlyMode}
                        onKeyPress={this.enterKeyEventHandler}
                        onChange={this.editEventHandler}
                        type={"text"}
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton
                        aria-label={"Delete Todo"}
                        onClick={this.deleteEventHandler}
                    >
                        <DeleteOutlined/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;