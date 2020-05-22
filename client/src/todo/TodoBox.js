import React, {useState, useRef, useCallback, useEffect} from 'react';
import {IoMdMenu, IoIosAddCircle, IoMdClose} from 'react-icons/io';
import {TiDelete} from 'react-icons/ti';
import {MdModeEdit} from 'react-icons/md';
import axios from 'axios';
import RenameTitleModal from '../Modal/RenameTitleModal';
import RemoveToDoModal from '../Modal/RemoveTodoBoxModal';
import ListBox from './ListBox';

const TodoBox = ({
    todobox,
    todo,
    userName,
    updateTodobox,
}) => {

    const [renameTitleModalStatus, updateRenameTitleModalStatus] = useState(false);
    const [removeTodoBoxModalStatus, updateRemoveTodoBoxModalStatus] = useState(false);
    const [todoboxMenu, updateTodoboxMenu] = useState(false);
    const [addListFormActive, updateAddListFormActive] = useState(false);
    const [addListInput, updateAddListText] = useState("");
    const nodeDropdown = useRef();

    const onAddListChange = (e) => {
        let data = e.target.value;
        updateAddListText(data);
    };

    const removeTodoBox = () => {
        updateRemoveTodoBoxModalStatus(true);
    };

    const activateRename = () => {
        updateRenameTitleModalStatus(true);
    };

    const addListActive = () => {
        updateAddListFormActive(true);
    };

    const addNewList = (e, id) => {

        e.preventDefault();


        if(addListInput.length !== 0){

            let input = {
                todoTitle : addListInput,
                description : "",
            }
            axios.post("/list/" + id + "/user/" + userName, input)
            .then(response => {   
                console.log("response after adding data", response.data);
                let copyData = [...todobox];
                let index = copyData.findIndex(x => x._id === id);
                copyData[index].data = [...copyData[index].data, response.data];
                updateTodobox(copyData);
                updateAddListFormActive(false);
            })
            .catch( err => {
                console.log(err);
            })

            updateAddListText("");
        } 
    };

   
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
    };
    
    const cancel = () => {
        updateAddListFormActive(false);
    };

    return <div className="board-block-main--eachbox">
                <div className="title-menu-button" >
                    <h4>{todo.title}</h4>
                    <div className="title-menu-dropbox" ref={nodeDropdown}>
                        <button onClick={activateMenu} >
                            <IoMdMenu size="18px" />
                        </button>
                        <div className= {dropdownClass}>
                            <button onClick={() => removeTodoBox()}>
                                <TiDelete size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>
                                Remove
                            </button>
                            { removeTodoBoxModalStatus && <RemoveToDoModal 
                                todobox = {todobox}
                                updateTodobox = {updateTodobox}
                                todoID = {todo._id}
                                updateRemoveTodoBoxModalStatus = {updateRemoveTodoBoxModalStatus}
                                oldTitle = {todo.title}
                                userName = {userName}
                            />
                            }
                            <button onClick={() => activateRename()}>
                                <MdModeEdit size="18px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>
                                Rename
                            </button>
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
                    {addListFormActive ? 
                        <form className="board-block-addform" onSubmit = {(e) => addNewList(e, todo._id)} >
                            <div className="board-block-inputbox">
                                <input onChange={onAddListChange} placeholder="Enter title for this item..." type="text" value={addListInput}/>
                            </div>
                            <div className="board-block-formbutton">
                                <button className="board-block-main-addList">Add Item</button>
                                <div className="board-block-main-cancel" onClick={cancel}><IoMdClose /></div>
                            </div>
                        </form>
                        : 
                        <button className="board-block-main-addButton" onClick={() => addListActive()}>
                            <IoIosAddCircle style={{position:"relative", top: "2px", marginRight:"10px"}}/>
                            Add new item
                        </button>
                    }
                </div>
            </div>         
};

export default TodoBox;