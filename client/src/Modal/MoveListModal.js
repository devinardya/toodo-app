import React, {useState} from 'react';
import axios from 'axios';
import './moveListModal.scss'

const MoveListModal = ({todoID, listId, listTitle, updateMoveListModalStatus, todobox, updateTodobox}) => {

    const [selectValue, updateSelectValue] = useState("");

    const handleChange = (e) => {
        let data = e.target.value;
        console.log(data);
        updateSelectValue(data);
    }
 
    const moveOneList = (e, todoid, listid) => {
        e.preventDefault();

        axios.patch('/todos/'+todoid+'/todos/'+selectValue+'/list/'+listid)
        .then( response => {
            console.log(response)
            /* let copyData = [...todobox];
            let oldBoxIndex = copyData.findIndex(x => x._id === todoid);
            console.log("oldbox index", oldBoxIndex)
            let listIndex = copyData.findIndex(y => y.id === listid);
            console.log("list index", listIndex)
            let newBoxIndex = copyData.findIndex(z => z._id === selectValue);
            console.log("newbox index", newBoxIndex)
            let movedData = copyData[oldBoxIndex].data[listIndex];
            console.log("MOVED DATA", movedData)
            copyData[oldBoxIndex].data = copyData[oldBoxIndex].data.filter(h => h.id !== listid);
            copyData[newBoxIndex].data = [...copyData[newBoxIndex].data, movedData];

            console.log("copyData before save", copyData); */
            updateTodobox(response.data);
            updateMoveListModalStatus(false);
        })

    }

    const cancel = () => {
        updateMoveListModalStatus(false);
    }

    return <div className ="modal-block-container">
                <form onSubmit={(e) => moveOneList(e, todoID, listId)}>
                    <h2>Move list</h2>
                    <p>Which todo box do you want to move <span>{listTitle}</span> ?</p>
                    <select value={selectValue} onChange={handleChange}>
                        {todobox.map(todo => {
                            return <option value={todo._id} key={todo._id}>{todo.title}</option>
                        })}
                    </select>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button>Move list</button>
                    </div>
                </form>
            </div>
};

export default MoveListModal;