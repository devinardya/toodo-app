import React, {useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../index.scss';

const RenameTitleModal = ({
    todoID, 
    listId, 
    updateRenameListModalStatus, 
    listTitle, 
    listDesc, 
    todobox, 
    updateTodobox, 
    userName, 
    updateStyleChange,
    initialPage,
}) => {

    const [titleChange, updateTitleChange] = useState(listTitle);
    const [errorStatus, updateErrorStatus] = useState(false);

    const renameTitleChange = (e) => {
        let input = e.target.value;
        updateTitleChange(input)
    };

    const renameListTitle = (e, todoId, listID) => {
        e.preventDefault();

        if(titleChange.length !== 0){

            let data = {
                        todoTitle: titleChange,
                        description: listDesc
                    }
            
            axios.patch("/todos/"+todoId+"/list/"+listID+"/user/"+userName, data)
            .then(response => {
                console.log(response);
                let copyData = [...todobox];
                let findIndex = copyData.findIndex(x => x._id === todoId);
                let findDataIndex = copyData[findIndex].data.findIndex(y => y.id === listID);
                copyData[findIndex].data[findDataIndex].todoTitle = response.data.todoTitle;
                console.log("copyData before save", copyData);
                
                updateRenameListModalStatus(false);
                if(initialPage === "listInfoModal") {
                    updateRenameListModalStatus(false);
                    updateStyleChange(false);
                }

                updateTodobox(copyData);
                
            })
            .catch( err => {
                console.log(err);
            })
        } else {
            updateErrorStatus(true);
        }
        
    };

    const cancel = () => {
        updateRenameListModalStatus(false);
        if(initialPage === "listInfoModal") {
            updateRenameListModalStatus(false);
            updateStyleChange(false);
        }
    };

    return ReactDOM.createPortal(
            <div className ="modal-block-container">
                <form onSubmit = {(e) => renameListTitle(e, todoID, listId)}>
                    <h2>Edit Item</h2>
                    <label>New item title</label>
                    <input onChange={renameTitleChange} placeholder= {errorStatus ? "Title is not allowed to be empty" : null} type="text" value={titleChange}/>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button className="modal-block-rename">Save</button>
                    </div>
                </form>
            </div>,
		document.body
	);
};

export default RenameTitleModal;