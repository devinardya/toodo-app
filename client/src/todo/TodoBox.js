import React from 'react';
import ListBox from './ListBox';
import Dropdown from './Dropdown';
import AddItems from './AddItems';


const TodoBox = ({
    todobox,
    todo,
    userName,
    updateTodobox,
}) => {

    return <div className="block__board--main--eachbox">
                <div className="block__board--main--eachbox--title" >
                    <h4>{todo.title}</h4>
                    <Dropdown 
                        todobox = {todobox}
                        updateTodobox = {updateTodobox}
                        todo = {todo}
                        userName = {userName}
                        initialElement = "lists"
                    />
                </div>
                <span>
                    <ul>
                    {todo.data.map( (x) => {
                            return <ListBox 
                                        key = {x.id}
                                        todobox = {todobox}
                                        todo = {todo}
                                        userName = {userName}
                                        updateTodobox = {updateTodobox}
                                        x = {x}
                                    />
                        })
                    }
                    </ul>
                </span>
                <AddItems 
                    todobox = {todobox}
                    todo = {todo}
                    userName = {userName}
                    updateTodobox = {updateTodobox}
                />
            </div>         
};

export default TodoBox;