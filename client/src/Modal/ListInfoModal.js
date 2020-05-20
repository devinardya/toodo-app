import React, {useState} from 'react';
import axios from 'axios';
import {IoMdClose, IoIosList, IoMdList} from 'react-icons/io';
import {MdModeEdit} from 'react-icons/md';
import ReactDOM from 'react-dom';
import './listInfoModal.scss'

const ListInfoModal = ({
    todobox,
    todo,
    userName,
    updateTodobox,
    x,
    updateListInfoModalStatus,
}) => {

    const [editDescBox, updateDescBox] = useState(false);
    const [descChange, updateDescChange] = useState(x.description)

    const editDescription = () => {
        updateDescBox(true);
    }

    const inputChange = (e) => {
        let input = e.target.value;
        updateDescChange(input);
    }

    const renameDescList = (e, todoId, listID) => {
        e.preventDefault();

        let data = {
                    todoTitle: x.todoTitle,
                    description: descChange
                }
        
        axios.patch("/todos/"+todoId+"/list/"+listID+"/user/"+userName, data)
        .then(response => {
            console.log(response);
            let copyData = [...todobox];
            let findIndex = copyData.findIndex(x => x._id === todoId);
            let findDataIndex = copyData[findIndex].data.findIndex(y => y.id === listID);
            //copyData[findIndex].data[findDataIndex].todoTitle = titleChange;
            copyData[findIndex].data[findDataIndex].description = descChange;
            console.log("copyData before save", copyData);
            updateTodobox(copyData);
            updateDescBox(false);
        })
        .catch( err => {
            console.log(err);
        })
        
    }

    const deleteList = (todoId, listID) => {
     
        axios.delete("/todos/"+todoId+"/list/"+listID+"/user/"+userName)
        .then(response => {
            console.log("response data", response);
            let copyData = [...todobox];
            let findIndex = copyData.findIndex(x => x._id === todoId);
            copyData[findIndex].data = copyData[findIndex].data.filter(y => y.id !== listID);
            updateTodobox(copyData);
            updateListInfoModalStatus(false);
        })
        .catch( err => {
            console.log(err);
        })
    }

    const cancel = () => {
        updateDescBox(false);
    }
    const exitModal = () => {
        updateListInfoModalStatus(false);
    }


    return ReactDOM.createPortal(
            <div className ="modal-block-container--listinfo">
                <div className="modal-block-container--listinfo-box">
                    <div className="modal-block-container--listinfo-box__titleInfo">
                        <h3><IoIosList style={{position: "relative", top:"2px", marginRight:"10px"}}/>{todo.title}</h3>
                        <p>in list <span>{x.todoTitle}</span></p>
                    </div>
                    <div className="modal-block-container--listinfo-box__descInfo">
                        <h3><IoMdList style={{position: "relative", top:"2px", marginRight:"10px"}}/>Description <span onClick={editDescription}><MdModeEdit /></span></h3>
                        {editDescBox || x.description.length === 0 ? 
                        <form onSubmit={(e) => renameDescList(e, todo._id, x.id )}>
                            <input onChange={inputChange} type="text" value={descChange} placeholder={x.description.length === 0 ? "Add a more detailed description" : null} />
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
                    <button onClick={() => deleteList(todo._id, x.id)} className="modal-block-container--listinfo-box__removeList">Remove list</button>
                    <div className="exitInfoModal" onClick={exitModal}>
                        <span><IoMdClose/></span>
                    </div>
                </div>
            </div>,
		document.body
	);
};

export default ListInfoModal;