import React, {useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {MdExpandMore} from 'react-icons/md';
import '../index.scss';

const MoveListModal = ({
    todoID, 
    itemId, 
    itemTitle, 
    updateMoveListModalStatus, 
    todobox, 
    updateTodobox, 
    userName,
    initialPage,
    updateStyleChange,
}) => {

    const [selectValue, updateSelectValue] = useState("");

    const handleChange = (e) => {
        let data = e.target.value;
        console.log(data);
        updateSelectValue(data);
    }
 
    const moveOneList = (e, todoid, itemId) => {
        e.preventDefault();
        
        if(selectValue.length !== 0 && selectValue !== undefined) {
            axios.patch('/todos/'+todoid+'/newtodo/'+selectValue+'/item/'+itemId+'/user/'+userName)
            .then( response => {
                console.log(response.data)
                
                updateMoveListModalStatus(false);
                if(initialPage === "listInfoModal") {
                    updateStyleChange(false);
                }

                updateTodobox(response.data);
            })
            .catch( err => {
                console.log(err);
            })
        }
    };

    const cancel = () => {
        updateMoveListModalStatus(false);
        if(initialPage === "listInfoModal") {
            updateStyleChange(false);
        }
    };

    return ReactDOM.createPortal(
            <div className ="modal-block-container">
                <form onSubmit={(e) => moveOneList(e, todoID, itemId)}>
                    <h2>Move Item</h2>
                    <p>Please choose a new todo list for <span>{itemTitle}</span>.</p>
                    <div className="select-container">
                        <select value={selectValue} onChange={handleChange}>
                            <option value="">---- Todo list ----</option>
                            {todobox.map(todo => {
                                if(todo._id !== todoID) {
                                    return <option value={todo._id} key={todo._id}>{todo.title}</option>
                                } else {
                                    return null;
                                }
                            })}
                        </select>
                        <MdExpandMore className="select-icon" />
                    </div>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button className="modal-block-move">Move</button>
                    </div>
                </form>
            </div>,
		document.body
	);
};

export default MoveListModal;