import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../index.scss';

let url = "https://lit-peak-62083.herokuapp.com"

const ClearListItems = ({
    todoID, 
    updateClearItemsStatus, 
    updateTodobox, 
    userName, 
    todobox,
    todoTitle,
}) => {

    const deleteAllItems = (todoId) => {
     
        axios.delete(url+"/todo/"+todoId+"/user/"+userName)
        .then(response => {
            console.log("response data", response);
            let copyData = [...todobox];
            let indexList = copyData.findIndex( x => x._id === todoId);
            copyData[indexList].data = [];
            updateClearItemsStatus(false);
            updateTodobox(copyData);
        })
        .catch( err => {
            console.log(err);
        })
    };

    const cancel = () => {
        updateClearItemsStatus(false);
    };

    return ReactDOM.createPortal(
            <div className ="modal-block-container">
                <div className = "modal-block-box">
                    <h2>Remove All Items</h2>
                    <p className="modal-block-box--text">Remove all items from <span>{todoTitle}</span> todo list ?</p>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button className="modal-block-remove" onClick={() => deleteAllItems(todoID)}>Remove</button>
                    </div>
                </div>
            </div>,
		document.body
	);
};

export default ClearListItems;