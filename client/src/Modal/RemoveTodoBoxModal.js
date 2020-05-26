import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../index.scss';
let url = "https://lit-peak-62083.herokuapp.com"


const RemoveTodoBoxModal = ({
    todoID, 
    updateRemoveTodoBoxModalStatus, 
    oldTitle, 
    todobox, 
    updateTodobox, 
    userName
}) => {

    const removeTodoBox = (id) => {
      
        axios.delete(url+"/todos/" + id+"/user/"+userName)
        .then(response => {
            //console.log("RESPONSE", response);
            let copy = [...todobox];
            let newData = copy.filter(x => x._id !== id);

            updateRemoveTodoBoxModalStatus(false);
            updateTodobox(newData);
        })
        .catch(err => {
            console.log(err);
          }); 
          
    };

    const cancel = () => {
        updateRemoveTodoBoxModalStatus(false);
    }; 

    return ReactDOM.createPortal(
            <div className ="modal-block-container">
                <div className = "modal-block-box">
                    <h2>Remove Todo List</h2>
                    <p className="modal-block-box--text">Are you sure you want to delete <span>{oldTitle}</span> ?</p>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button className="modal-block-remove" onClick={() => removeTodoBox(todoID)}>Remove</button>
                    </div>
                </div>
            </div>,
		document.body
	);
};

export default RemoveTodoBoxModal;