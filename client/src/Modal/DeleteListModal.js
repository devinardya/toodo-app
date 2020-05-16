import React from 'react';
import axios from 'axios';
import './deleteListModal.scss'

const DeleteListModal = ({todoIndex, listId, updateRemoveOneListModalStatus, listTitle, todobox, updateTodobox}) => {

    const deleteList = (todoId, listID) => {
        axios.delete("/todos/"+todoId+"/list/"+listID)
        .then(response => {
            console.log(response);
            let copyData = [...todobox];
            let findIndex = copyData.findIndex(x => x._id === todoId);
            copyData[findIndex].data = copyData[findIndex].data.filter(y => y.id !== listID);
            updateTodobox(copyData);
            updateRemoveOneListModalStatus(false);
        })
    }
    const cancel = () => {
        updateRemoveOneListModalStatus(false);
    }    

    return <div className ="modal-block-container">
                <div className = "modal-block-box">
                    <h2>Delete List</h2>
                    <p>Are you sure you want to delete <span>{listTitle}</span></p>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button onClick={() => deleteList(todoIndex, listId)}>Delete</button>
                    </div>
                </div>
            </div>
};

export default DeleteListModal;