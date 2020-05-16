import React from 'react';
import axios from 'axios';
import './removeModal.scss'

const RemoveTodoBoxModal = ({todoID, updateRemoveTodoBoxModalStatus, oldTitle, todobox, updateTodobox}) => {

    const removeTodoBox = (id) => {
        axios.delete("/todos/" + id)
        .then(response => {
            console.log("RESPONSE", response)
            let copy = [...todobox];
            let newData = copy.filter(x => x._id !== id)
            updateTodobox(newData);
            updateRemoveTodoBoxModalStatus(false);
        })
    };

    const cancel = () => {
        updateRemoveTodoBoxModalStatus(false);
    }    

    return <div className ="modal-block-container">
                <div className = "modal-block-box">
                    <h2>Delete Todo Box</h2>
                    <p>Are you sure you want to delete <span>{oldTitle}</span> ?</p>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button onClick={() => removeTodoBox(todoID)}>Delete</button>
                    </div>
                </div>
            </div>
};

export default RemoveTodoBoxModal;