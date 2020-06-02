import React, {useState} from 'react';
import {TiDelete, TiArrowForward} from 'react-icons/ti';
import {MdModeEdit} from 'react-icons/md';
import RemoveListModal from '../Modal/RemoveListModal';
import RenameListModal from '../Modal/RenameListModal';
import MoveListModal from '../Modal/MoveListModal';

const ButtonsItems = ({
    todobox,
    updateTodobox,
    todo,
    x,
    userName,
    dropdownClass,
    dropdownStyle,
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


    return <div className= {dropdownClass} style={dropdownStyle} >
                <button onClick={() => deleteOneList()}>
                    <TiDelete size="18px" style={{marginRight: "8px", position: "relative", top:"4px"}}/>
                    Delete item
                </button>
                { removeOneListModalStatus && <RemoveListModal 
                    todoID = {todo._id}
                    todoTitle = {todo.title}
                    updateRemoveOneListModalStatus = {updateRemoveOneListModalStatus}
                    itemId = {x.id}
                    itemTitle = {x.todoTitle}
                    todobox = {todobox}
                    updateTodobox = {updateTodobox}
                    userName = {userName}
                />
                }
                <button onClick={() => renameOneList()}>
                    <MdModeEdit size="18px" style={{marginRight: "8px", position: "relative", top:"3px"}}/>
                    Edit item
                </button>
                { renameListModalStatus && <RenameListModal 
                    todoID = {todo._id}
                    itemId = {x.id}
                    updateRenameListModalStatus = {updateRenameListModalStatus}
                    itemTitle = {x.todoTitle}
                    itemDesc = {x.description}
                    todobox = {todobox}
                    updateTodobox = {updateTodobox}
                    userName = {userName}
                />
                }
                <button onClick={() => moveOneList()}>
                    <TiArrowForward size="18px" style={{marginRight: "8px", position: "relative", top:"3px"}}/>
                    Move item
                </button>
                { moveListModalStatus && <MoveListModal 
                    todoID = {todo._id}
                    itemId = {x.id}
                    itemTitle = {x.todoTitle}
                    updateMoveListModalStatus = {updateMoveListModalStatus}
                    todobox = {todobox}
                    updateTodobox = {updateTodobox}
                    userName = {userName}
                />
                }
            </div>

};

export default ButtonsItems;