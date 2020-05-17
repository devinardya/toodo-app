import React, {useEffect, useState} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {IoMdMenu, IoIosAddCircle} from 'react-icons/io';
import {TiDelete, TiArrowForward} from 'react-icons/ti';
import {MdModeEdit} from 'react-icons/md';
import AddListModal from '../Modal/AddListModal';
import RenameTitleModal from '../Modal/RenameTitleModal';
import RemoveListModal from '../Modal/RemoveListModal';
import RemoveToDoModal from '../Modal/RemoveTodoBoxModal';
import RenameListModal from '../Modal/RenameListModal';
import MoveListModal from '../Modal/MoveListModal';
import logoicon from '../Image/toodo-logo.svg';
import './board.scss';

const Board = ({location}) => {

    const [todobox, updateTodobox] = useState([]);
    const [inputAddTodoBox, updateInputAddTodoBox] = useState("");
    const [addListModalStatus, updateAddListModalStatus] = useState(false);
    const [renameTitleModalStatus, updateRenameTitleModalStatus] = useState(false);
    const [removeOneListModalStatus, updateRemoveOneListModalStatus] = useState(false);
    const [removeTodoBoxModalStatus, updateRemoveTodoBoxModalStatus] = useState(false);
    const [renameListModalStatus, updateRenameListModalStatus] = useState(false);
    const [moveListModalStatus, updateMoveListModalStatus] = useState(false);
    const [todoID, updatetodoID] = useState("");
    const [listId, updateListId] = useState("");
    const [listTitle, updateListTitle] = useState("");
    const [listDesc, updateListDesc] = useState("");
    const [oldTitle, updateOldTitle] = useState("");
    const [todoboxMenu, updateTodoboxMenu] = useState(false);
    const [activeDropboxID, updateactiveDropboxID] = useState("");
    const [pageStatus, updatePageStatus] = useState(false);
    const [createBoxInputError, updateCreateBoxInputError] = useState(false);
    let userName = location.state.user;
    

    useEffect( () => {

        let source = axios.CancelToken.source();

        axios.get("/todos/"+userName, {
            cancelToken: source.token
          })
        .then(response => {   
            console.log(response.data);
            updateTodobox(response.data)
        })
        .catch((error) => {
             console.log(error);
        });
    }, [userName]);

    const onAddingToDoBox = (e) => {
        let input = e.target.value;
        updateInputAddTodoBox(input);

        if(input.length > 20) {
            updateCreateBoxInputError(true);
        } else {
            updateCreateBoxInputError(false);
        }

       
    };

    const addNewTodoBox = (e) => {
        e.preventDefault();

        if (inputAddTodoBox.length !== 0 && inputAddTodoBox.length <= 20) {
             let input = {
                title : inputAddTodoBox
            }

            axios.post("/todos/"+userName, input)
            .then(response => {   
                console.log(response);
               //updateTodobox(response.data)
               let copy = [...todobox];
               let newData = [...copy, response.data]
               updateTodobox(newData);
              })
              .catch( err => {
                console.log(err);
            })

            updateInputAddTodoBox("");
        } else {
            updateCreateBoxInputError(true);
        }
        
       
    };

    const removeTodoBox = (id, title) => {
        updatetodoID(id);
        updateRemoveTodoBoxModalStatus(true);
        updateOldTitle(title);
        updateTodoboxMenu(false);
    };

    const addListModalActive = (id) => {
        updatetodoID(id);
        updateAddListModalStatus(true);

    }

   	const activateMenu = (e, id, index) => {
        e.preventDefault();
        let copyData = [...todobox];
        console.log( "index", index)
        let indexArr = copyData.findIndex( x => x._id === id);
        console.log("index", indexArr)
        if (indexArr === index){
            updateactiveDropboxID(id);
            updateTodoboxMenu(todoboxMenu ? false : true);
        }
    };

    const activateRename = (id, title) => {
        updatetodoID(id);
        updateOldTitle(title);
        updateRenameTitleModalStatus(true);
        updateTodoboxMenu(false);
    }

    const deleteOneList = (todoid, listID, title) => {
        updatetodoID(todoid);
        updateListId(listID);
        updateListTitle(title);
        updateRemoveOneListModalStatus(true);
        updateTodoboxMenu(false);
    }

    const renameOneList = (todoid, listID, title, description) => {
        updatetodoID(todoid);
        updateListId(listID);
        updateListTitle(title);
        updateListDesc(description)
        updateRenameListModalStatus(true);
        updateTodoboxMenu(false);
    }

    const moveOneList = (todoid, listID, title) => {
        updatetodoID(todoid);
        updateListId(listID);
        updateListTitle(title);
        updateMoveListModalStatus(true);
        updateTodoboxMenu(false);
    }

    const logout = () => {
        let source = axios.CancelToken.source();
        axios.get("/todos/", {
            cancelToken: source.token
          })
          .catch(function (thrown) {
            if (axios.isCancel(thrown)) {
              console.log('Request canceled', thrown.message);
            } else {
              // handle error
            }
          }); 
          source.cancel('Operation canceled by the user.'); 
          updatePageStatus(true);
    }

    if(pageStatus) {
        return <Redirect to="/login"/> 
   } 


    return <HelmetProvider>
                <Helmet>
                    <title>Board - {userName}</title>
                </Helmet>
                    <div className ="board-container-block">
                        <header className="board-block-header">
                            <div className="board-header--logo">
                                <figure className="board-logo">
                                    <img src={logoicon} alt="toodo logo" />
                                </figure>
                            </div>
                            <div className="board-header--text">
                                <h4>Welcome, {userName}</h4>
                                <span>|</span>
                                <button onClick={logout}>Log out</button>
                            </div>
                            
                        </header>
                        <main className="board-block-main">
                            <div className="board-block-boxes">
                                {todobox.map( (todo, index) => {
                                    return ( <div className="board-block-main--eachbox" key={todo._id}>
                                                <h4>{todo.title}</h4>
                                            <div className="title-menu-button">
                                                    <button onClick={ (e) => activateMenu(e, todo._id, index)} >
                                                        <IoMdMenu size="18px" />
                                                    </button>
                                                    {activeDropboxID === todo._id && todoboxMenu ? 
                                                        <div className="board-main-dropdown-active">
                                                            <button onClick={() => removeTodoBox(todo._id, todo.title)}><TiDelete size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>Remove</button>
                                                            <button onClick={() => activateRename(todo._id, todo.title)}><MdModeEdit size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>Rename</button>
                                                        </div>
                                                    :
                                                        null
                                                    } 
                                            </div>
                                                <ul>
                                                {todo.data.map( (x, idx) => {
                                                    return <li className="board-block-main--list" key={x.id}>
                                                                <p className="list-title">{x.todoTitle}</p>
                                                                <p className="list-desc">{x.description}</p>
                                                                
                                                                <div className = "board-block-main--list--buttons">
                                                                    <p className="list-date">{x.created}</p>
                                                                    <div className="board-block-main--list--buttons__part">
                                                                        <button onClick={() => deleteOneList(todo._id, x.id, x.todoTitle)}><TiDelete size="16px" style={{marginRight: "8px", position: "relative", top:"5px"}}/></button>
                                                                        <button onClick={() => renameOneList(todo._id, x.id, x.todoTitle, x.description)}><MdModeEdit size="16px" style={{marginRight: "8px", position: "relative", top:"5px"}}/></button>
                                                                        <button onClick={() => moveOneList(todo._id, x.id, x.todoTitle)}><TiArrowForward size="16px" style={{marginRight: "0px", position: "relative", top:"5px"}}/></button>
                                                                    </div>
                                                                </div>
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
                                                            todobox = {todobox}
                                                            updateTodobox = {updateTodobox}
                                                            todoID = {todoID}
                                                            updateAddListModalStatus = {updateAddListModalStatus}
                                                            userName = {userName}
                                                        />
                                }
                                { removeTodoBoxModalStatus && <RemoveToDoModal 
                                                            todobox = {todobox}
                                                            updateTodobox = {updateTodobox}
                                                            todoID = {todoID}
                                                            updateRemoveTodoBoxModalStatus = {updateRemoveTodoBoxModalStatus}
                                                            oldTitle = {oldTitle}
                                                            userName = {userName}
                                                        />
                                }
                                { renameTitleModalStatus && <RenameTitleModal 
                                                            todoID = {todoID}
                                                            updateRenameTitleModalStatus = {updateRenameTitleModalStatus}
                                                            oldTitle = {oldTitle}
                                                            todobox = {todobox}
                                                            updateTodobox = {updateTodobox}
                                                            userName = {userName}
                                                        />
                                }
                                { removeOneListModalStatus && <RemoveListModal 
                                                            todoID = {todoID}
                                                            updateRemoveOneListModalStatus = {updateRemoveOneListModalStatus}
                                                            listId = {listId}
                                                            listTitle = {listTitle}
                                                            todobox = {todobox}
                                                            updateTodobox = {updateTodobox}
                                                            userName = {userName}
                                                        />
                                }
                                { renameListModalStatus && <RenameListModal 
                                                            todoID = {todoID}
                                                            listId = {listId}
                                                            updateRenameListModalStatus = {updateRenameListModalStatus}
                                                            listTitle = {listTitle}
                                                            listDesc = {listDesc}
                                                            todobox = {todobox}
                                                            updateTodobox = {updateTodobox}
                                                            userName = {userName}
                                                        />
                                }
                                { moveListModalStatus && <MoveListModal 
                                                            todoID = {todoID}
                                                            listId = {listId}
                                                            listTitle = {listTitle}
                                                            updateMoveListModalStatus = {updateMoveListModalStatus}
                                                            todobox = {todobox}
                                                            updateTodobox = {updateTodobox}
                                                            userName = {userName}
                                                        />
                                }
                                {todobox.length <= 4 ?
                                    <div className="board-block-main--form">
                                        <form onSubmit={addNewTodoBox}>
                                            <input onChange={onAddingToDoBox} type="text" value={inputAddTodoBox} style={ createBoxInputError ? { color : "red"} : {color : "#737373"}}/>
                                            {createBoxInputError ? <p className="board-block-main--form-inputError">Can not create box with empty title or more than 20 characters</p> : <p className="board-block-main--form-input">Title length is minimun 1 character and maximum 20 characters</p>}
                                            <button>Create todo box</button>
                                        </form>
                                    </div>  
                                : null
                                }
                            </div>
                        </main>
                </div>
            </HelmetProvider>
};

export default Board;