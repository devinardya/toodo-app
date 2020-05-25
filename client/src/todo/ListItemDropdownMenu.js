import React, {useState, useRef, useCallback, useEffect} from 'react';
import {IoIosMore} from 'react-icons/io';
import {TiDelete, TiArrowForward} from 'react-icons/ti';
import {MdModeEdit} from 'react-icons/md';
import ReactDOM from 'react-dom';
import RemoveListModal from '../Modal/RemoveListModal';
import RenameListModal from '../Modal/RenameListModal';
import MoveListModal from '../Modal/MoveListModal';
import './listdropdown.scss';

const ListItemDropdownMenu = ({
    todobox,
    todo,
    userName,
    updateTodobox,
    x,
    ItemMenuStatus,
}) => {

    const [removeOneListModalStatus, updateRemoveOneListModalStatus] = useState(false);
    const [renameListModalStatus, updateRenameListModalStatus] = useState(false);
    const [moveListModalStatus, updateMoveListModalStatus] = useState(false);
  

    const deleteOneList = () => {
        updateRemoveOneListModalStatus(true);
    };

    const renameOneList = () => {
        updateRenameListModalStatus(true);
    };

    const moveOneList = () => {
        updateMoveListModalStatus(true);
    };


    let dropdownItemClass;
	if (ItemMenuStatus) {
		dropdownItemClass = 'board-block-main--list--buttons__part active';
	} else {
		dropdownItemClass = 'board-block-main--list--buttons__part';
    };

    return ReactDOM.createPortal(
                    <div className= {dropdownItemClass}>
                        <button onClick={() => deleteOneList()}>
                            <TiDelete size="16px" style={{marginRight: "8px", position: "relative", top:"3px"}}/>
                            Remove item
                        </button>
                        { removeOneListModalStatus && <RemoveListModal 
                            todoID = {todo._id}
                            todoTitle = {todo.title}
                            updateRemoveOneListModalStatus = {updateRemoveOneListModalStatus}
                            listId = {x.id}
                            listTitle = {x.todoTitle}
                            todobox = {todobox}
                            updateTodobox = {updateTodobox}
                            userName = {userName}
                        />
                        }
                        <button onClick={() => renameOneList()}>
                            <MdModeEdit size="16px" style={{marginRight: "8px", position: "relative", top:"3px"}}/>
                            Edit item
                        </button>
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
                        <button onClick={() => moveOneList()}>
                            <TiArrowForward size="16px" style={{marginRight: "8px", position: "relative", top:"3px"}}/>
                            Move item
                        </button>
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
                </div>,
                document.body
            );
 };

export default ListItemDropdownMenu;