import React, {useState} from 'react';
import axios from 'axios';
import './addlistmodal.scss'

const AddListModal = ({ todoID, todobox, updateTodobox, updateAddListModalStatus, userName}) => {

    const [addListInput, updateAddListText] = useState("");
    const [addDescInput, updateAddDescInput] = useState("");
    const [errorStatus, updateErrorStatus] = useState(false);


    const onAddListChange = (e) => {
        let data = e.target.value;
        updateAddListText(data);
    };

    const onAddDescChange = (e) => {
        let data = e.target.value;
        updateAddDescInput(data);
    };

    const addNewList = (e, id) => {

        e.preventDefault();


        if(addDescInput.length !== 0 && addListInput.length !== 0){

            let input = {
                todoTitle : addListInput,
                description : addDescInput,
            }
            axios.post("/list/" + id + "/user/" + userName, input)
            .then(response => {   
                console.log("response after adding data", response.data);
                let copyData = [...todobox];
                let index = copyData.findIndex(x => x._id === id);
                copyData[index].data = [...copyData[index].data, response.data];
                updateTodobox(copyData);
            })
            .catch( err => {
                console.log(err);
            })

            updateAddDescInput("");
            updateAddListText("");
            updateAddListModalStatus(false);
        } else {
            updateErrorStatus(true);
        }
      
    };


    const cancel = () => {
        updateAddListModalStatus(false);
    }

    return <div className ="modal-block-container">
                <form onSubmit = {(e) => addNewList(e, todoID)}>
                    <h2>Add new list</h2>
                    <label>Title:</label>
                    <input onChange={onAddListChange} placeholder= {errorStatus ? "Title is not allowed to be empty" : null} type="text" value={addListInput}/>
                    <label>Description:</label>
                    <input onChange={onAddDescChange} placeholder= {errorStatus ? "Description is not allowed to be empty" : null} type="text" value={addDescInput}/>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button>Add list</button>
                    </div>
                </form>
            </div>
};

export default AddListModal;