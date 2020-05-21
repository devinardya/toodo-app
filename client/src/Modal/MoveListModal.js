import React, {useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './moveListModal.scss'

const MoveListModal = ({
    todoID, 
    listId, 
    listTitle, 
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
 
    const moveOneList = (e, todoid, listid) => {
        e.preventDefault();
        
        if(selectValue.length !== 0 && selectValue !== undefined) {
            axios.patch('/todos/'+todoid+'/todos/'+selectValue+'/list/'+listid+'/user/'+userName)
            .then( response => {
                console.log(response.data)
                updateTodobox(response.data);
                updateMoveListModalStatus(false);
                if(initialPage === "listInfoModal") {
                    updateStyleChange(false);
                }
            })
            .catch( err => {
                console.log(err);
            })
        }
    }

    const cancel = () => {
        updateMoveListModalStatus(false);
        if(initialPage === "listInfoModal") {
            updateStyleChange(false);
        }
    }

    return ReactDOM.createPortal(
            <div className ="modal-block-container">
                <form onSubmit={(e) => moveOneList(e, todoID, listId)}>
                    <h2>Move list</h2>
                    <p>Please choose a new todo box for <span>{listTitle}</span>.</p>
                    <select value={selectValue} onChange={handleChange}>
                        <option value="">---- Todo box list ----</option>
                        {todobox.map(todo => {
                            if(todo._id !== todoID) {
                                return <option value={todo._id} key={todo._id}>{todo.title}</option>
                            } else {
                                return null;
                            }
                        })}
                    </select>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button className="modal-block-move">Move list</button>
                    </div>
                </form>
            </div>,
		document.body
	);
};

export default MoveListModal;