import React, {useEffect, useState} from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import './board.scss';

const Board = () => {

    const [todobox, updateTodobox] = useState([]);
    const [addListInput, updateAddListText] = useState("");
    const [addDescInput, updateAddDescInput] = useState("");
    const [inputAddTodoBox, updateInputAddTodoBox] = useState("")

    useEffect( () => {
        axios.get("/todos/")
        .then(response => {   
            console.log(response.data);
            updateTodobox(response.data)
          })
    }, []);

    const onAddListChange = (e) => {
        let input = e.target.value;
        updateAddListText(input);
    }

    const onAddDescChange = (e) => {
        let input = e.target.value;
        updateAddDescInput(input);
    }

    const addNewList = (e, id) => {

        e.preventDefault();

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes();
        let dateTime = date+' '+time;

        let input = {
            todoTitle : addListInput,
            description : addDescInput,
            created : dateTime
        }
        axios.post("/list/" + id, input)
        .then(response => {   
            console.log("response after adding data", response);
            let copyData = [...todobox];
            console.log("Data", copyData)
            let index = copyData.findIndex(x => x._id === id);
            console.log("INDEX", index)
            input.id = uuid();
            console.log("input", input)
            console.log(copyData[index].data)
            let newData = [...copyData[index].data, input]
            console.log("newdata", newData)
            console.log("COPYDATA BEFORE UPDATE TODOBOX", copyData)
            
            //updateTodobox()
          })

          updateAddDescInput("");
          updateAddListText("");
    }

    const onAddingToDoBox = (e) => {
        let input = e.target.value;
        updateInputAddTodoBox(input);
    }

    const addNewTodoBox = (e) => {
        e.preventDefault();
        let input = {
            title : inputAddTodoBox
        }
        axios.post("/todos/", input)
        .then(response => {   
            console.log(response);
           //updateTodobox(response.data)
           let copy = [...todobox];
           let newData = [...copy, response.data]
           updateTodobox(newData);
          })
        updateInputAddTodoBox("");
    }

    const removeTodoBox = (id) => {
        axios.delete("/todos/" + id)
        .then(response => {
            console.log("RESPONSE", response)
            let copy = [...todobox];
            let newData = copy.filter(x => x._id !== id)
            updateTodobox(newData);
        })
    }


    return <>
                <h1>Board</h1>
                <form onSubmit={addNewTodoBox}>
                    <input onChange={onAddingToDoBox} type="text" value={inputAddTodoBox}/>
                    <button>Add todo box</button>
                </form>
                <div className ="board-container">
                    {todobox.map( todo => {
                        return ( <div key={todo._id}>
                                    <h2>{todo.title}</h2>
                                    <button onClick={() => removeTodoBox(todo._id)}>Delete Todo List</button>
                                    <ul>
                                    {todo.data.map( x => {
                                        return <li key={x.id}>
                                                    <p>{x.todoTitle}</p>
                                                    <p>Created: {x.created}</p>
                                               </li>
                                    })}
                                    </ul>
                                    <form onSubmit = {(e) => addNewList(e, todo._id)}>
                                        <label>Title</label>
                                        <input onChange={onAddListChange} type="text" value={addListInput}/>
                                        <label>Description</label>
                                        <input onChange={onAddDescChange} type="text" value={addDescInput}/>
                                         <button>add new list to do box</button>
                                    </form>
                                    
                                 </div>
                                )
                    })}
                </div>
           </>
};

export default Board;