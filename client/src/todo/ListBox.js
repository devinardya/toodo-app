import React, {useState, useRef, useCallback, useEffect} from 'react';
import {IoMdList, IoIosMore} from 'react-icons/io';
import {TiDelete, TiArrowForward} from 'react-icons/ti';
import {MdModeEdit} from 'react-icons/md';
import RemoveListModal from '../Modal/RemoveListModal';
import RenameListModal from '../Modal/RenameListModal';
import MoveListModal from '../Modal/MoveListModal';
import ListInfoModal from '../Modal/ListInfoModal';

const ListBox = ({
    todobox,
    todo,
    userName,
    updateTodobox,
    x,
}) => {

    const [removeOneListModalStatus, updateRemoveOneListModalStatus] = useState(false);
    const [renameListModalStatus, updateRenameListModalStatus] = useState(false);
    const [moveListModalStatus, updateMoveListModalStatus] = useState(false);
    const [listInfoModalStatus, updateListInfoModalStatus] = useState(false);
    const [ItemMenuStatus, updateItemMenuStatus] = useState(false);
    const [height, updateHeight] = useState(0);
    const [width, updateWidth] = useState(0);
    const itemMenu = useRef();


    const deleteOneList = () => {
        updateRemoveOneListModalStatus(true);
    };

    const renameOneList = () => {
        updateRenameListModalStatus(true);
    };

    const moveOneList = () => {
        updateMoveListModalStatus(true);
    };

    const showInfoModal = () => {
        updateListInfoModalStatus(true);
    };

    const activateItemMenu = useCallback( () => {
        const dimensions = itemMenu.current.getBoundingClientRect();
        updateHeight(dimensions.y);
        updateWidth(dimensions.x);
        updateItemMenuStatus(ItemMenuStatus ? false : true);
        
    }, [ItemMenuStatus]);

    const handleClickOutside = useCallback((e) => {
		if (itemMenu.current.contains(e.target)) {
			// inside click
			return;
		}
		// outside click 
        activateItemMenu(ItemMenuStatus)
	}, [ItemMenuStatus, activateItemMenu]);

	useEffect(() => {
		//this document.addEventListerner can only be used inside a useEffect
		if (ItemMenuStatus) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
    }, [ItemMenuStatus, handleClickOutside]);

    let dropdownItemClass;
	if (ItemMenuStatus) {
		dropdownItemClass = 'block__board--main--list--buttons__part active';
	} else {
		dropdownItemClass = 'block__board--main--list--buttons__part';
    };

    return <li className="block__board--main--list">
                <div className="block__board--main--list--menu">
                    <div className="block__board--main--list--menu--info">
                        <p className="block__board--main--list--menu--info--list-title" onClick={showInfoModal}>{x.todoTitle}</p>
                        {x.description.length > 0 ? <span className="block__board--main--list--menu--info--list-desc" onClick={showInfoModal}><IoMdList /></span> : null}
                        {listInfoModalStatus && <ListInfoModal 
                            todobox = {todobox}
                            todo = {todo}
                            userName = {userName}
                            updateTodobox = {updateTodobox}
                            x = {x}
                            updateListInfoModalStatus = {updateListInfoModalStatus}
                        />}
                    </div>
                    <div className="block__board--main--list--menu--infoDropdown" ref={itemMenu}>
                            <button onClick={activateItemMenu} >
                                <IoIosMore size="18px" />
                            </button>
                            <div className= {dropdownItemClass} style={{position:"fixed", top:height+25, left:width-100}}>
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
                    </div>
                </div>
        </li>        
};

export default ListBox;