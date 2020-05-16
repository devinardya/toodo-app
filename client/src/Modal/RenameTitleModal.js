import React, {useState} from 'react';
import axios from 'axios';
import './renameTitleModal.scss'

const RenameTitleModal = ({todoIndex, updateRenameTitleModalStatus, oldTitle, todobox, updateTodobox}) => {

    const [inputChange, updateInputChange] = useState(oldTitle);

    const renameChange = (e) => {
        let input = e.target.value;
        updateInputChange(input)
    }

    const renameTitle = (e, id) => {
        e.preventDefault();

        let data = {
                    title : inputChange
                   }

        axios.put("/todos/"+ id, data)
        .then( response => {
            console.log(response.data);
            let copyData = [...todobox];
            let index = copyData.findIndex( x => x._id === id);
            copyData[index].title = inputChange;
            console.log("copyData before save", copyData);
            updateTodobox(copyData);
            updateRenameTitleModalStatus(false);
        })
    }

    const cancel = () => {
        updateRenameTitleModalStatus(false);
    }

    return <div className ="modal-block-container">
                <form onSubmit = {(e) => renameTitle(e, todoIndex)}>
                    <h2>Rename Title</h2>
                    <label>Title:</label>
                    <input onChange={renameChange} type="text" value={inputChange}/>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button>Rename</button>
                    </div>
                </form>
            </div>
};

export default RenameTitleModal;