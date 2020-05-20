import React, {useState, useRef, useCallback, useEffect} from 'react';
import {IoMdMenu, IoIosAddCircle} from 'react-icons/io';
import {TiDelete} from 'react-icons/ti';
import {MdModeEdit} from 'react-icons/md';
import AddListModal from '../Modal/AddListModal';
import RenameTitleModal from '../Modal/RenameTitleModal';
import RemoveToDoModal from '../Modal/RemoveTodoBoxModal';
import ListBox from './ListBox';

const TodoBox = ({
    todobox,
    todo,
    userName,
    updateTodobox,
}) => {

    const [addListModalStatus, updateAddListModalStatus] = useState(false);
    const [renameTitleModalStatus, updateRenameTitleModalStatus] = useState(false);
    const [removeTodoBoxModalStatus, updateRemoveTodoBoxModalStatus] = useState(false);
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