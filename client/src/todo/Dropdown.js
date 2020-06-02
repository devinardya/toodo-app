import React, {useRef, useEffect, useState, useCallback} from 'react';
import {IoMdMenu} from 'react-icons/io';
import ButtonsList from './ButtonsLists';
import ButtonsItems from './ButtonsItems';

const Dropdown = ({
    todobox,
    updateTodobox,
    todo,
    userName,
    x,
    initialElement,
}) => {

    const [dropdownMenu, updateDropdownMenu] = useState(false);
    const [height, updateHeight] = useState(0);
    const [width, updateWidth] = useState(0);
    const nodeDropdown = useRef();

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

        renderMenus = <ButtonsList 
                            todobox = {todobox}
                            todo = {todo} 
                            dropdownClass = {dropdownClass}
                            updateTodobox = {updateTodobox}
                            userName = {userName}
                       />
    } else if (initialElement === "items") {
        dropdownBlock = "block__board--main--list--menu--infoDropdown";

        if (dropdownMenu) {
            dropdownClass = 'block__board--main--list--buttons__part active';
            dropdownStyle = {position:"fixed", top:height+25, left:width-100}
        } else {
            dropdownClass = 'block__board--main--list--buttons__part';
        };

        renderMenus = <ButtonsItems
                            todobox = {todobox}
                            todo = {todo} 
                            dropdownClass = {dropdownClass}
                            updateTodobox = {updateTodobox}
                            userName = {userName}
                            dropdownStyle = {dropdownStyle}
                            x = {x}
                      />
    } 

    return <div className={dropdownBlock} ref={nodeDropdown}>
                <button onClick={activateMenu} >
                    <IoMdMenu size="18px" />
                </button>
                {renderMenus}
            </div>
};

export default Dropdown;