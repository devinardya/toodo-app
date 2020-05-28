import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../index.scss';

const ClearListItems = ({
    updateClearItemsStatus, 
    updateTodobox, 
    userName, 
    todobox,
    todo,
}) => {

    const deleteAllItems = (todoId) => {
     
        axios.delete("/todo/"+todoId+"/user/"+userName)
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
                    <p className="modal-block-box--text">Remove all items from <span>{todo.title}</span> todo list ?</p>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button className="modal-block-remove" onClick={() => deleteAllItems(todo._id)}>Remove</button>
                    </div>
                </div>
            </div>,
		document.body
	);
};

export default ClearListItems;