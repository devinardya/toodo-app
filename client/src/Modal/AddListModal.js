import React from 'react';
import './addlistmodal.scss'

const AddListModal = ({addNewList, onAddListChange, onAddDescChange, todoIndex, addDescInput, addListInput, updateAddListModalStatus}) => {


    const onAddingList = (e, todoIndex) => {
        e.preventDefault();
        addNewList(todoIndex);
        updateAddListModalStatus(false);
    }

    const addList = (e) => {
        onAddListChange(e.target.value)
    };

    const addDesc = (e) => {
        onAddDescChange(e.target.value)
    }

    const cancelAdd = () => {
        updateAddListModalStatus(false);
    }

    return <div className ="modal-block-container">
                <form onSubmit = {(e) => onAddingList(e, todoIndex)}>
                    <h2>Add new list</h2>
                    <label>Title:</label>
                    <input onChange={addList} type="text" value={addListInput}/>
                    <label>Description:</label>
                    <input onChange={addDesc} type="text" value={addDescInput}/>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancelAdd}>Cancel</div>
                        <button>add new list to do box</button>
                    </div>
                </form>
            </div>
};

export default AddListModal;