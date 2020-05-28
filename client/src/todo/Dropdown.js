import React, {useRef, useEffect, useState, useCallback} from 'react';
import {IoMdMenu} from 'react-icons/io';
import {TiDelete} from 'react-icons/ti';
import {MdModeEdit, MdDelete} from 'react-icons/md';
import RenameTitleModal from '../Modal/RenameTitleModal';
import RemoveToDoModal from '../Modal/RemoveTodoBoxModal';
import ClearListItems from '../Modal/ClearAllItems';

const Dropdown = ({
    todobox,
    updateTodobox,
    todo,
    userName,
    initialElement,
}) => {

    const [renameTitleModalStatus, updateRenameTitleModalStatus] = useState(false);
    const [removeTodoBoxModalStatus, updateRemoveTodoBoxModalStatus] = useState(false);
    const [clearAllItemsStatus, updateClearItemsStatus] = useState(false);
    const [dropdownMenu, updateDropdownMenu] = useState(false);
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

    const activateMenu = useCallback( () => {
        updateDropdownMenu(dropdownMenu ? false : true);
    }, [dropdownMenu]);

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

    let dropdownClass;
    let dropdownStyle;
    let renderMenus;

    if (initialElement === "lists") {
        if (dropdownMenu) {
            dropdownClass = 'board-main-dropdown active';
        } else {
            dropdownClass = 'board-main-dropdown';
        };

        renderMenus = <div className= {dropdownClass} style={dropdownStyle} >
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
    } 

    return <div className="block__board--main--eachbox--title--menuDropdown" ref={nodeDropdown}>
                <button onClick={activateMenu} >
                    <IoMdMenu size="18px" />
                </button>
                {renderMenus}
            </div>
};

export default Dropdown;