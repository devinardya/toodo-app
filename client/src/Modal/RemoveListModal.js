import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './removeModal.scss'

const DeleteListModal = ({
    todoID, 
    listId, 
    updateRemoveOneListModalStatus, 
    listTitle, 
    todobox, 
    updateTodobox, 
    userName, 
    updateStyleChange,
    initialPage,
}) => {

    const deleteList = (todoId, listID) => {
     
        axios.delete("/todos/"+todoId+"/list/"+listID+"/user/"+userName)
        .then(response => {
            console.log("response data", response);
            let copyData = [...todobox];
            let findIndex = copyData.findIndex(x => x._id === todoId);
            copyData[findIndex].data = copyData[findIndex].data.filter(y => y.id !== listID);
            updateTodobox(copyData);
            updateRemoveOneListModalStatus(false);
            if(initialPage === "listInfoModal") {
                updateStyleChange(false);
            }
        })
        .catch( err => {
            console.log(err);
        })
    }
    const cancel = () => {
        updateRemoveOneListModalStatus(false);
        if(initialPage === "listInfoModal") {
            updateStyleChange(false);
        }
    }    

    return ReactDOM.createPortal(
            <div className ="modal-block-container">
                <div className = "modal-block-box">
                    <h2>Delete List</h2>
                    <p className="modal-block-box--text">Remove <span>{listTitle}</span> from the todo list box ?</p>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button className="modal-block-remove" onClick={() => deleteList(todoID, listId)}>Remove</button>
                    </div>
                </div>
            </div>,
		document.body
	);
};

export default DeleteListModal;