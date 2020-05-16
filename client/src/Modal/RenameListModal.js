import React, {useState} from 'react';
import axios from 'axios';
import './renameListModal.scss'

const RenameTitleModal = ({todoID, listId, updateRenameListModalStatus, listTitle, listDesc, todobox, updateTodobox, userName}) => {

    const [titleChange, updateTitleChange] = useState(listTitle);
    const [descChange, updateDescChange] = useState(listDesc)

    const renameTitleChange = (e) => {
        let input = e.target.value;
        updateTitleChange(input)
    }

    const renameDescChange = (e) => {
        let input = e.target.value;
        updateDescChange(input)
    }

    const renameListTitle = (e, todoId, listID) => {
        e.preventDefault();
        let data = {
                    todoTitle: titleChange,
                    description: descChange
                   }
        
        axios.patch("/todos/"+todoId+"/list/"+listID+"/user/"+userName, data)
        .then(response => {
            console.log(response);
            let copyData = [...todobox];
            let findIndex = copyData.findIndex(x => x._id === todoId);
            let findDataIndex = copyData[findIndex].data.findIndex(y => y.id === listID);
            copyData[findIndex].data[findDataIndex].todoTitle = titleChange;
            copyData[findIndex].data[findDataIndex].description = descChange;
            console.log("copyData before save", copyData);
            updateTodobox(copyData);
            updateRenameListModalStatus(false);
        })
        
    }

    const cancel = () => {
        updateRenameListModalStatus(false);
    }

    return <div className ="modal-block-container">
                <form onSubmit = {(e) => renameListTitle(e, todoID, listId)}>
                    <h2>Rename Title</h2>
                    <label>Title:</label>
                    <input onChange={renameTitleChange} type="text" value={titleChange}/>
                    <label>Description:</label>
                    <input onChange={renameDescChange} type="text" value={descChange}/>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button>Rename</button>
                    </div>
                </form>
            </div>
};

export default RenameTitleModal;