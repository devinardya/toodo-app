import React, {useState} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './renameTitleModal.scss';
let url = "https://lit-peak-62083.herokuapp.com"

const RenameTitleModal = ({
    todoID, 
    updateRenameTitleModalStatus, 
    oldTitle, 
    todobox, 
    updateTodobox, 
    userName
}) => {

    const [inputChange, updateInputChange] = useState(oldTitle);
    const [errorStatus, updateErrorStatus] = useState(false);
    const [renameBoxInputError , updateRenameBoxInputError] = useState(false);

    const renameChange = (e) => {
        let input = e.target.value;
        updateInputChange(input);

        if(input.length > 20) {
            updateRenameBoxInputError(true);
        } else {
            updateRenameBoxInputError(false);
        }
    };

    const renameTitle = (e, id) => {
        e.preventDefault();

        if ( inputChange.length !== 0 && inputChange.length <= 20){
            let data = {
                        title : inputChange
                    }

            axios.put(url+"/todos/"+ id + "/user/" + userName, data)
            .then( response => {
                console.log(response);
                let copyData = [...todobox];
                let index = copyData.findIndex( x => x._id === id);
                copyData[index].title = response.data.title;
                console.log("copyData before save", copyData);

                updateRenameTitleModalStatus(false);
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
        updateRenameTitleModalStatus(false);
    };

    return ReactDOM.createPortal(
            <div className ="modal-block-container--rename">
                <form onSubmit = {(e) => renameTitle(e, todoID)}>
                    <h2>Rename Todo List Title</h2>
                    <label>New Title</label>
                    <input onChange={renameChange} placeholder= {errorStatus ? "Title is not allowed to be empty" : null} type="text" value={inputChange} style={ renameBoxInputError ? { color : "red"} : {color : "#737373"}} />
                    {renameBoxInputError ? <p className="board-block-main--form-inputError">Title is not allowed to be longer than 20 characters</p> : <p className="board-block-main--form-input">Title length is minimun 1 character and maximum 20 characters</p>}
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