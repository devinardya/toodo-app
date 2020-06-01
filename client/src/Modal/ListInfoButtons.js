import React, {useState} from 'react';
import {IoMdClose} from 'react-icons/io';
import {TiDelete, TiArrowForward} from 'react-icons/ti';
import RemoveListModal from '../Modal/RemoveListModal';
import MoveListModal from '../Modal/MoveListModal';
import '../index.scss';

const ListInfoButtons = ({
    todobox,
    todo,
    userName,
    updateTodobox,
    x,
    updateListInfoModalStatus,
    updateStyleChange,
}) => {

    const [removeOneListModalStatus, updateRemoveOneListModalStatus] = useState(false);
    const [moveListModalStatus, updateMoveListModalStatus] = useState(false);

    const deleteList = () => {
        updateRemoveOneListModalStatus(true);
        updateStyleChange(true);
    };

    const exitModal = () => {
        updateListInfoModalStatus(false);
    };

    const moveList = () => {
        updateMoveListModalStatus(true);
        updateStyleChange(true);
    };


    return <div className="modal-block-container--listinfo-box__optionButtons">
                        <button onClick={deleteList} className="modal-block-container--listinfo-box__removeList">
                            <TiDelete size="16px" style={{marginRight: "3px", position: "relative", top:"3px"}}/>   
                            Remove item
                        </button>
                        {removeOneListModalStatus && <RemoveListModal 
                                todoID = {todo._id}
                                updateRemoveOneListModalStatus = {updateRemoveOneListModalStatus}
                                itemId = {x.id}
                                todoTitle = {todo.title}
                                itemTitle = {x.todoTitle}
                                todobox = {todobox}
                                updateTodobox = {updateTodobox}
                                userName = {userName}
                                updateStyleChange = {updateStyleChange}
                                initialPage = "listInfoModal"
                            />
                            }
                        <button onClick={moveList} className="modal-block-container--listinfo-box__moveList">
                        <TiArrowForward size="16px" style={{marginRight: "3px", position: "relative", top:"3px"}}/>
                            Move item
                        </button>
                        {moveListModalStatus && <MoveListModal 
                                todoID = {todo._id}
                                itemId = {x.id}
                                itemTitle = {x.todoTitle}
                                updateMoveListModalStatus = {updateMoveListModalStatus}
                                todobox = {todobox}
                                updateTodobox = {updateTodobox}
                                userName = {userName}
                                updateStyleChange = {updateStyleChange}
                                initialPage = "listInfoModal"
                            />
                            }
                        <button onClick={exitModal} className="modal-block-container--listinfo-box__closeModal">
                            <IoMdClose size="16px" style={{marginRight: "3px", position: "relative", top:"3px"}}/>
                            Close
                        </button>
                    </div>
};

export default ListInfoButtons;