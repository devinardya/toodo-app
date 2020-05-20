import React, {useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './renameListModal.scss'

const RenameTitleModal = ({todoID, listId, updateRenameListModalStatus, listTitle, listDesc, todobox, updateTodobox, userName}) => {

    const [titleChange, updateTitleChange] = useState(listTitle);
    const [errorStatus, updateErrorStatus] = useState(false);

    const renameTitleChange = (e) => {
        let input = e.target.value;
        updateTitleChange(input)
    }

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
                copyData[findIndex].data[findDataIndex].todoTitle = titleChange;
                console.log("copyData before save", copyData);
                updateTodobox(copyData);
                updateRenameListModalStatus(false);
            })
            .catch( err => {
                console.log(err);
            })
        } else {
            updateErrorStatus(true);
        }
        
    }

    const cancel = () => {
        updateRenameListModalStatus(false);
    }

    return ReactDOM.createPortal(
            <div className ="modal-block-container">
                <form onSubmit = {(e) => renameListTitle(e, todoID, listId)}>
                    <h2>Edit List</h2>
                    <label>New list title</label>
                    <input onChange={renameTitleChange} placeholder= {errorStatus ? "Title is not allowed to be empty" : null} type="text" value={titleChange}/>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button className="modal-block-rename">Rename</button>
                    </div>
                </form>
            </div>,
		document.body
	);
};

export default RenameTitleModal;