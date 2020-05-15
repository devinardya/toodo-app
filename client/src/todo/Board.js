import React, {useEffect, useState} from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import {IoMdMenu, IoIosAddCircle} from 'react-icons/io';
import {TiDelete} from 'react-icons/ti';
import {MdModeEdit} from 'react-icons/md';
import AddListModal from '../Modal/AddListModal';
import './board.scss';

const Board = () => {

    const [todobox, updateTodobox] = useState([]);
    const [addListInput, updateAddListText] = useState("");
    const [addDescInput, updateAddDescInput] = useState("");
    const [inputAddTodoBox, updateInputAddTodoBox] = useState("");
    const [addListModalStatus, updateAddListModalStatus] = useState(false);
    const [todoIndex, updateTodoIndex] = useState("");
    const [todoboxMenu, updateTodoboxMenu] = useState(true);
    const [activeDropbox, updateActiveDropbox] = useState("");


    useEffect( () => {
        axios.get("/todos/")
        .then(response => {   
            console.log(response.data);
            updateTodobox(response.data)
          })
    }, []);

    const onAddListChange = (input) => {
        let data = input;
        updateAddListText(data);
    };

    const onAddDescChange = (input) => {
        let data = input
        updateAddDescInput(data);
    };

    const addNewList = (id) => {

        //e.preventDefault();

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
            let index = copyData.findIndex(x => x._id === id);
            input.id = uuid();
            copyData[index].data = [...copyData[index].data, input];
            updateTodobox(copyData)
          })

          updateAddDescInput("");
          updateAddListText("");
    };

    const onAddingToDoBox = (e) => {
        let input = e.target.value;
        updateInputAddTodoBox(input);
    };

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
    };

    const removeTodoBox = (id) => {
        axios.delete("/todos/" + id)
        .then(response => {
            console.log("RESPONSE", response)
            let copy = [...todobox];
            let newData = copy.filter(x => x._id !== id)
            updateTodobox(newData);
        })
    };

    const addListModalActive = (id) => {
        updateTodoIndex(id)
        updateAddListModalStatus(true);

    }

   	const activateMenu = (e, id, index) => {
        e.preventDefault();
        let copyData = [...todobox];
        console.log("e target id", id, "index", index)
        let indexArr = copyData.findIndex( x => x._id === id);
        console.log("index", indexArr)
        if (indexArr === index){
            updateActiveDropbox(id);
            updateTodoboxMenu(todoboxMenu ? false : true);
        }
    };


    return <div className ="board-container-block">
                <header className="board-block-header">
                   <h1>Board</h1>
                </header>
                <main className="board-block-main">
                    <div className="board-block-boxes">
                        {todobox.map( (todo, index) => {
                            return ( <div className="board-block-main--eachbox" key={todo._id}>
                                        <h4>{todo.title}</h4>
                                        {/* <div className="title-menu-button">
                                            <button onClick={() => removeTodoBox(todo._id)}><TiDelete /></button>
                                       </div> */}
                                       <div className="title-menu-button">
                                            <button onClick={ (e) => activateMenu(e, todo._id, index)} >
                                                <IoMdMenu size="18px" />
                                            </button>
                                            {activeDropbox === todo._id && todoboxMenu ? 
                                                <div className="board-main-dropdown-active">
                                                    <button onClick={() => removeTodoBox(todo._id)}><TiDelete size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>Remove</button>
                                                    <button><MdModeEdit size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>Rename</button>
                                                </div>
                                            :
                                                null
                                            } 
                                       </div>
                                        <ul>
                                        {todo.data.map( x => {
                                            return <li className="board-block-main--list" key={x.id}>
                                                        <p className="list-title">{x.todoTitle}</p>
                                                        <p className="list-desc">{x.description}</p>
                                                        <p className="list-date">{x.created}</p>
                                                </li>
                                        })}
                                        </ul>
                                        <div>
                                            <button className="board-block-main-addButton" onClick={() => addListModalActive(todo._id)}><IoIosAddCircle style={{position:"relative", top: "2px", marginRight:"10px"}}/>Add new list</button>
                                        </div>
                                    </div>
                                    )
                        })}

                        { addListModalStatus && <AddListModal 
                                                    addNewList = {addNewList}
                                                    onAddDescChange = {onAddDescChange}
                                                    onAddListChange = {onAddListChange}
                                                    todoIndex = {todoIndex}
                                                    addDescInput = {addDescInput}
                                                    addListInput = {addListInput}
                                                    updateAddListModalStatus = {updateAddListModalStatus}
                                                />
                        }
                        {todobox.length <= 4 ?
                            <div className="board-block-main--form">
                                <form onSubmit={addNewTodoBox}>
                                    <input onChange={onAddingToDoBox} type="text" value={inputAddTodoBox}/>
                                    <button>Create todo box</button>
                                </form>
                            </div>  
                        : null
                        }
                    </div>
                </main>
           </div>
};

export default Board;