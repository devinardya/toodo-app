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

    return <div className ="modal-block-container">
                <form onSubmit = {(e) => onAddingList(e, todoIndex)}>
                    <label>Title</label>
                    <input onChange={addList} type="text" value={addListInput}/>
                    <label>Description</label>
                    <input onChange={addDesc} type="text" value={addDescInput}/>
                    <button>add new list to do box</button>
                </form>
            </div>
};

export default AddListModal;