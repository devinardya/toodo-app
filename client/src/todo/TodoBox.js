import React, {useState, useRef, useCallback, useEffect} from 'react';
import {IoMdMenu, IoIosAddCircle} from 'react-icons/io';
import {TiDelete, TiArrowForward} from 'react-icons/ti';
import {MdModeEdit} from 'react-icons/md';
import AddListModal from '../Modal/AddListModal';
import RenameTitleModal from '../Modal/RenameTitleModal';
import RemoveListModal from '../Modal/RemoveListModal';
import RemoveToDoModal from '../Modal/RemoveTodoBoxModal';
import RenameListModal from '../Modal/RenameListModal';
import MoveListModal from '../Modal/MoveListModal';

const TodoBox = ({
    todobox,
    todo,
    userName,
    updateTodobox,
}) => {

    const [addListModalStatus, updateAddListModalStatus] = useState(false);
    const [renameTitleModalStatus, updateRenameTitleModalStatus] = useState(false);
    const [removeOneListModalStatus, updateRemoveOneListModalStatus] = useState(false);
    const [removeTodoBoxModalStatus, updateRemoveTodoBoxModalStatus] = useState(false);
    const [renameListModalStatus, updateRenameListModalStatus] = useState(false);
    const [moveListModalStatus, updateMoveListModalStatus] = useState(false);
    const [todoboxMenu, updateTodoboxMenu] = useState(false);
    const nodeDropdown = useRef();


    const removeTodoBox = () => {
        updateRemoveTodoBoxModalStatus(true);
    };

    const addListModalActive = () => {
        updateAddListModalStatus(true);
    }

    const activateRename = () => {
        updateRenameTitleModalStatus(true);
    }

    const deleteOneList = () => {
        updateRemoveOneListModalStatus(true);
    }

    const renameOneList = () => {
        updateRenameListModalStatus(true);
    }

    const moveOneList = () => {
        updateMoveListModalStatus(true);
    }

   
    const activateMenu = useCallback( () => {
        updateTodoboxMenu(todoboxMenu ? false : true);
    }, [todoboxMenu]);

    const handleClickOutside = useCallback((e) => {
		if (nodeDropdown.current.contains(e.target)) {
			// inside click
			return;
		}
		// outside click 
        activateMenu(todoboxMenu)
	}, [todoboxMenu, activateMenu]);

	useEffect(() => {
		//this document.addEventListerner can only be used inside a useEffect
		if (todoboxMenu) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
    }, [todoboxMenu, handleClickOutside]);

    let dropdownClass;
	if (todoboxMenu) {
		dropdownClass = 'board-main-dropdown active';
	} else {
		dropdownClass = 'board-main-dropdown';
    }
    

    return <div className="board-block-main--eachbox">
                <div className="title-menu-button" >
                    <h4>{todo.title}</h4>
                    <div className="title-menu-dropbox" ref={nodeDropdown}>
                        <button onClick={activateMenu} >
                            <IoMdMenu size="18px" />
                        </button>
                        <div className= {dropdownClass}>
                            <button onClick={() => removeTodoBox()}><TiDelete size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>Remove</button>
                            { removeTodoBoxModalStatus && <RemoveToDoModal 
                                todobox = {todobox}
                                updateTodobox = {updateTodobox}
                                todoID = {todo._id}
                                updateRemoveTodoBoxModalStatus = {updateRemoveTodoBoxModalStatus}
                                oldTitle = {todo.title}
                                userName = {userName}
                            />
                            }
                            <button onClick={() => activateRename()}><MdModeEdit size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>Rename</button>
                            { renameTitleModalStatus && <RenameTitleModal 
                                todoID = {todo._id}
                                updateRenameTitleModalStatus = {updateRenameTitleModalStatus}
                                oldTitle = {todo.title}
                                todobox = {todobox}
                                updateTodobox = {updateTodobox}
                                userName = {userName}
                            />
                            }
                        </div>
                    </div>
                </div>
                <ul>
                {todo.data.map( (x) => {
                    return <li className="board-block-main--list" key={x.id}>
                                <p className="list-title">{x.todoTitle}</p>
                                <p className="list-desc">{x.description}</p>
                                
                                <div className = "board-block-main--list--buttons">
                                    <p className="list-date">{x.created}</p>
                                    <div className="board-block-main--list--buttons__part">
                                        <button onClick={() => deleteOneList()}><TiDelete size="16px" style={{marginRight: "8px", position: "relative", top:"5px"}}/></button>
                                             
                                        { removeOneListModalStatus && <RemoveListModal 
                                            todoID = {todo._id}
                                            updateRemoveOneListModalStatus = {updateRemoveOneListModalStatus}
                                            listId = {x.id}
                                            listTitle = {x.todoTitle}
                                            todobox = {todobox}
                                            updateTodobox = {updateTodobox}
                                            userName = {userName}
                                        />
                                        }
                                        <button onClick={() => renameOneList()}><MdModeEdit size="16px" style={{marginRight: "8px", position: "relative", top:"5px"}}/></button>
                                        { renameListModalStatus && <RenameListModal 
                                            todoID = {todo._id}
                                            listId = {x.id}
                                            updateRenameListModalStatus = {updateRenameListModalStatus}
                                            listTitle = {x.todoTitle}
                                            listDesc = {x.description}
                                            todobox = {todobox}
                                            updateTodobox = {updateTodobox}
                                            userName = {userName}
                                        />
                                        }
                                        <button onClick={() => moveOneList()}><TiArrowForward size="16px" style={{marginRight: "0px", position: "relative", top:"5px"}}/></button>
                                        { moveListModalStatus && <MoveListModal 
                                            todoID = {todo._id}
                                            listId = {x.id}
                                            listTitle = {x.todoTitle}
                                            updateMoveListModalStatus = {updateMoveListModalStatus}
                                            todobox = {todobox}
                                            updateTodobox = {updateTodobox}
                                            userName = {userName}
                                        />
                                        }
                                    </div>
                                </div>
                        </li>
                })}
                </ul>
                <div>
                    <button className="board-block-main-addButton" onClick={() => addListModalActive()}><IoIosAddCircle style={{position:"relative", top: "2px", marginRight:"10px"}}/>Add new list</button>
                    { addListModalStatus && <AddListModal 
                            todobox = {todobox}
                            updateTodobox = {updateTodobox}
                            todoID = {todo._id}
                            updateAddListModalStatus = {updateAddListModalStatus}
                            userName = {userName}
                        />
                    }
                </div>
            </div>
            
            
       
           
            
};

export default TodoBox;