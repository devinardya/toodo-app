import React from 'react';
import AddBoxForm from './AddBoxForm';
import TodoBox from './TodoBox';

const MainBox = ({todobox, updateTodobox, userName}) => {


    let printData = todobox.map( (todo, index) => {
        return <TodoBox 
                    key={todo._id}
                    todobox = {todobox}
                    todo = {todo}
                    index = {index}
                    updateTodobox = {updateTodobox}
                    userName = {userName}
                />
    })

    return <main className="board-block-main">
                <div className="board-block-boxes">
                    {printData}
                    {todobox.length <= 4 ?
                        <AddBoxForm 
                            todobox = {todobox}
                            updateTodobox = {updateTodobox}
                            userName = {userName}
                        />
                    : null
                    }
                </div>
            </main>
};

export default MainBox;
