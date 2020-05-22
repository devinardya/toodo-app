import React, {useState} from 'react';
import {IoMdList} from 'react-icons/io';
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

    return <li className="board-block-main--list">
                <p className="list-title" onClick={showInfoModal}>{x.todoTitle}</p>
                {x.description.length > 0 ? <span className="list-desc" onClick={showInfoModal}><IoMdList /></span> : null}
                {listInfoModalStatus && <ListInfoModal 
                    todobox = {todobox}
                    todo = {todo}
                    userName = {userName}
                    updateTodobox = {updateTodobox}
                    x = {x}
                    updateListInfoModalStatus = {updateListInfoModalStatus}
                />}
                
                <div className = "board-block-main--list--buttons">
                    <p className="list-date">{x.created}</p>
                    <div className="board-block-main--list--buttons__part">
                        <button onClick={() => deleteOneList()}>
                            <TiDelete size="16px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>
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
                            <MdModeEdit size="16px" style={{marginRight: "8px", position: "relative", top:"5px"}}/>
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
                            <TiArrowForward size="16px" style={{marginRight: "0px", position: "relative", top:"5px"}}/>
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
                    </div>
                </div>
        </li>        
};

export default ListBox;