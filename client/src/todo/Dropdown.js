import React, {useRef, useEffect, useState, useCallback} from 'react';
import {IoMdMenu} from 'react-icons/io';
import {TiDelete, TiArrowForward} from 'react-icons/ti';
import {MdModeEdit, MdDelete} from 'react-icons/md';
import RenameTitleModal from '../Modal/RenameTitleModal';
import RemoveToDoModal from '../Modal/RemoveTodoBoxModal';
import RemoveListModal from '../Modal/RemoveListModal';
import RenameListModal from '../Modal/RenameListModal';
import MoveListModal from '../Modal/MoveListModal';
import ClearListItems from '../Modal/ClearAllItems';

const Dropdown = ({
    todobox,
    updateTodobox,
    todo,
    userName,
    x,
    initialElement,
}) => {

    const [renameTitleModalStatus, updateRenameTitleModalStatus] = useState(false);
    const [removeTodoBoxModalStatus, updateRemoveTodoBoxModalStatus] = useState(false);
    const [clearAllItemsStatus, updateClearItemsStatus] = useState(false);
    const [removeOneListModalStatus, updateRemoveOneListModalStatus] = useState(false);
    const [renameListModalStatus, updateRenameListModalStatus] = useState(false);
    const [moveListModalStatus, updateMoveListModalStatus] = useState(false);
    const [dropdownMenu, updateDropdownMenu] = useState(false);
    const [height, updateHeight] = useState(0);
    const [width, updateWidth] = useState(0);
    const nodeDropdown = useRef();

    const removeTodoBox = () => {
        updateRemoveTodoBoxModalStatus(true);
    };

    const activateRename = () => {
        updateRenameTitleModalStatus(true);
    };

    const clearAllItems = () => {
        updateClearItemsStatus(true);
    }

    const deleteOneList = () => {
        updateRemoveOneListModalStatus(true);
    };

    const renameOneList = () => {
        updateRenameListModalStatus(true);
    };

    const moveOneList = () => {
        updateMoveListModalStatus(true);
    };

    const activateMenu = useCallback( () => {
        if(initialElement === "items") {
            const dimensions = nodeDropdown.current.getBoundingClientRect();
            updateHeight(dimensions.y);
            updateWidth(dimensions.x);
        }
        updateDropdownMenu(dropdownMenu ? false : true);
    }, [dropdownMenu, initialElement]);

    const handleClickOutside = useCallback((e) => {
		if (nodeDropdown.current.contains(e.target)) {
			// inside click
			return;
		}
		// outside click 
        activateMenu(dropdownMenu)
	}, [dropdownMenu, activateMenu]);

	useEffect(() => {
		//this document.addEventListerner can only be used inside a useEffect
		if (dropdownMenu) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
    }, [dropdownMenu, handleClickOutside]);

    let dropdownBlock;
    let dropdownClass;
    let dropdownStyle;
    let renderMenus;

    if (initialElement === "lists") {
        dropdownBlock = "block__board--main--eachbox--title--menuDropdown";
        if (dropdownMenu) {
            dropdownClass = 'board-main-dropdown active';
        } else {
            dropdownClass = 'board-main-dropdown';
        };

        renderMenus = <div className= {dropdownClass} >
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

    } else if (initialElement === "items") {
        dropdownBlock = "block__board--main--list--menu--infoDropdown";

        if (dropdownMenu) {
            dropdownClass = 'block__board--main--list--buttons__part active';
            dropdownStyle = {position:"fixed", top:height+25, left:width-100}
        } else {
            dropdownClass = 'block__board--main--list--buttons__part';
        };

        renderMenus = <div className= {dropdownClass} style={dropdownStyle} >
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
    } 

    return <div className={dropdownBlock} ref={nodeDropdown}>
                <button onClick={activateMenu} >
                    <IoMdMenu size="18px" />
                </button>
                {renderMenus}
            </div>
};

export default Dropdown;