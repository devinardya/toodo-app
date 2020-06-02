import React, {useState} from 'react';
import {TiDelete} from 'react-icons/ti';
import {MdModeEdit, MdDelete} from 'react-icons/md';
import RenameTitleModal from '../Modal/RenameTitleModal';
import RemoveToDoModal from '../Modal/RemoveTodoBoxModal';
import ClearListItems from '../Modal/ClearAllItems';

const ButtonsList = ({
    todobox,
    updateTodobox,
    todo,
    userName,
    dropdownClass,

}) => {

    const [renameTitleModalStatus, updateRenameTitleModalStatus] = useState(false);
    const [removeTodoBoxModalStatus, updateRemoveTodoBoxModalStatus] = useState(false);
    const [clearAllItemsStatus, updateClearItemsStatus] = useState(false);


    const removeTodoBox = () => {
        updateRemoveTodoBoxModalStatus(true);
    };

    const activateRename = () => {
        updateRenameTitleModalStatus(true);
    };

    const clearAllItems = () => {
        updateClearItemsStatus(true);
    }


    return <div className= {dropdownClass} >
                <button onClick={() => removeTodoBox()}>
                    <TiDelete size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>
                    Remove list
                </button>
                { removeTodoBoxModalStatus && <RemoveToDoModal 
                    todobox = {todobox}
                    updateTodobox = {updateTodobox}
                    todo = {todo}
                    updateRemoveTodoBoxModalStatus = {updateRemoveTodoBoxModalStatus}
                    userName = {userName}
                />
                }
                <button onClick={() => activateRename()}>
                    <MdModeEdit size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>
                    Rename list
                </button>
                { renameTitleModalStatus && <RenameTitleModal 
                    todo = {todo}
                    updateRenameTitleModalStatus = {updateRenameTitleModalStatus}
                    todobox = {todobox}
                    updateTodobox = {updateTodobox}
                    userName = {userName}
                />
                }
                <button onClick={() => clearAllItems()}>
                    <MdDelete size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>
                    Clear all items
                </button>
                { clearAllItemsStatus && <ClearListItems 
                    todo = {todo}
                    updateClearItemsStatus = {updateClearItemsStatus}
                    updateTodobox = {updateTodobox}
                    userName = {userName}
                    todobox = {todobox}
                />
                }
            </div>

};

export default ButtonsList;