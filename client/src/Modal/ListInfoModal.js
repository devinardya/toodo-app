import React, {useState} from 'react';
import axios from 'axios';
import {IoMdClose, IoIosList, IoMdList, IoMdInformationCircleOutline} from 'react-icons/io';
import {TiDelete, TiArrowForward} from 'react-icons/ti';
import {MdModeEdit} from 'react-icons/md';
import ReactDOM from 'react-dom';
import RenameListModal from '../Modal/RenameListModal';
import RemoveListModal from '../Modal/RemoveListModal';
import MoveListModal from '../Modal/MoveListModal';
import './listInfoModal.scss';
let url = "https://lit-peak-62083.herokuapp.com"

const ListInfoModal = ({
    todobox,
    todo,
    userName,
    updateTodobox,
    x,
    updateListInfoModalStatus,
}) => {

    const [editDescBox, updateDescBox] = useState(false);
    const [descChange, updateDescChange] = useState(x.description);
    const [renameListModalStatus, updateRenameListModalStatus] = useState(false);
    const [removeOneListModalStatus, updateRemoveOneListModalStatus] = useState(false);
    const [moveListModalStatus, updateMoveListModalStatus] = useState(false);
    const [styleChange, updateStyleChange] = useState(false);

    const editDescription = () => {
        updateDescBox(true);
    };

    const editTitle = () => {
        updateRenameListModalStatus(true); 
        updateStyleChange(true);
    };

    const inputChange = (e) => {
        let input = e.target.value;
        updateDescChange(input);
    };

    const renameDescList = (e, todoId, listID) => {
        e.preventDefault();

        let data = {
                    todoTitle: x.todoTitle,
                    description: descChange
                }
        
        axios.patch(url+"/todos/"+todoId+"/list/"+listID+"/user/"+userName, data)
        .then(response => {
            console.log(response);
            let copyData = [...todobox];
            let findIndex = copyData.findIndex(x => x._id === todoId);
            let findDataIndex = copyData[findIndex].data.findIndex(y => y.id === listID);
            copyData[findIndex].data[findDataIndex].description = response.data.description;
            console.log("copyData before save", copyData);
            updateTodobox(copyData);
            updateDescBox(false);
        })
        .catch( err => {
            console.log(err);
        })
        
    };

    const deleteList = () => {
        updateRemoveOneListModalStatus(true);
        updateStyleChange(true);
    };

    const cancel = () => {
        updateDescBox(false);
    };

    const exitModal = () => {
        updateListInfoModalStatus(false);
    };

    const moveList = () => {
        updateMoveListModalStatus(true);
        updateStyleChange(true);
    };

    let styleClass;
    if(!styleChange) {
        styleClass = "modal-block-container--listinfo"
    } else {
        styleClass = "modal-block-container--listinfo modalActive"
    }


    return ReactDOM.createPortal(
            <div className ={styleClass}>
                <div className="modal-block-container--listinfo-box">
                    <div className="modal-block-container--listinfo-box-contain">
                        <div className="modal-block-container--listinfo-box__titleInfo">
                            <h3><IoIosList style={{position: "relative", top:"2px", marginRight:"10px"}}/>
                                {x.todoTitle}
                                <span onClick={editTitle}><MdModeEdit style={{position: "relative", top:"3px", left:"10px"}} /></span>
                            </h3>
                            { renameListModalStatus && <RenameListModal 
                                todoID = {todo._id}
                                todoTitle = {todo.title}
                                updateRemoveOneListModalStatus = {updateRemoveOneListModalStatus}
                                listId = {x.id}
                                listTitle = {x.todoTitle}
                                listDesc = {x.description}
                                todobox = {todobox}
                                updateTodobox = {updateTodobox}
                                userName = {userName}
                                updateStyleChange = {updateStyleChange}
                                initialPage = "listInfoModal"
                            />
                            }
                            <p>in list <span>{todo.title}</span></p>
                        </div>
                    
                        <div className="modal-block-container--listinfo-box__descInfo">
                            <h3><IoMdList style={{position: "relative", top:"2px", marginRight:"10px"}}/>
                                Description 
                                {x.description.length !== 0 ?<span onClick={editDescription}><MdModeEdit style={{position: "relative", top:"3px", left:"10px"}} /></span>: null }
                            </h3>
                            {editDescBox || x.description.length === 0 ? 
                            <form onSubmit={(e) => renameDescList(e, todo._id, x.id )}>
                                <input onChange={inputChange} type="text" value={descChange} placeholder={x.description.length === 0 ? "Add a more detailed description..." : null} />
                                <div className="modal-block-container--listinfo-box__descInfo--formbuttons">
                                    <button>Save</button>
                                    {x.description.length !== 0 ? <div className="board-block-main-cancel" onClick={cancel}><IoMdClose /></div> : null}
                                </div>
                            </form>
                            : 
                            <div className="modal-block-container--listinfo-box__descInfo--text" onClick={editDescription}>
                                <p>{x.description}</p>
                            </div>
                            }
                        </div>
                        <div className="modal-block-container--listinfo-box__activityInfo">
                            <h3><IoMdInformationCircleOutline style={{position: "relative", top:"2px", marginRight:"10px"}}/>
                                Information
                            </h3>
                            <p><span>{userName}</span> added this item to {todo.title} </p>
                            <p>{x.created}</p>
                        </div>
                    </div>
                        <div className="modal-block-container--listinfo-box__optionButtons">
                            <button onClick={deleteList} className="modal-block-container--listinfo-box__removeList">
                                <TiDelete size="16px" style={{marginRight: "3px", position: "relative", top:"3px"}}/>   
                                Remove item
                            </button>
                            {removeOneListModalStatus && <RemoveListModal 
                                    todoID = {todo._id}
                                    updateRemoveOneListModalStatus = {updateRemoveOneListModalStatus}
                                    listId = {x.id}
                                    todoTitle = {todo.title}
                                    listTitle = {x.todoTitle}
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
                                    listId = {x.id}
                                    listTitle = {x.todoTitle}
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
                    <div className="exitInfoModal" onClick={exitModal}>
                        <span><IoMdClose/></span>
                    </div>
                </div>
            </div>,
		document.body
	);
};

export default ListInfoModal;