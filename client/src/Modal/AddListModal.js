import React, {useState} from 'react';
import uuid from 'react-uuid';
import axios from 'axios';
import './addlistmodal.scss'

const AddListModal = ({ todoID, todobox, updateTodobox, updateAddListModalStatus}) => {

    const [addListInput, updateAddListText] = useState("");
    const [addDescInput, updateAddDescInput] = useState("");

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

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes();
        let dateTime = date+' '+time;

        let input = {
            todoTitle : addListInput,
            description : addDescInput,
            created : dateTime
        }
        axios.post("/list/" + id, input)
        .then(response => {   
            console.log("response after adding data", response);
            let copyData = [...todobox];
            let index = copyData.findIndex(x => x._id === id);
            input.id = uuid();
            copyData[index].data = [...copyData[index].data, input];
            updateTodobox(copyData);
          })

          updateAddDescInput("");
          updateAddListText("");
          updateAddListModalStatus(false);
    };


    const cancel = () => {
        updateAddListModalStatus(false);
    }

    return <div className ="modal-block-container">
                <form onSubmit = {(e) => addNewList(e, todoID)}>
                    <h2>Add new list</h2>
                    <label>Title:</label>
                    <input onChange={onAddListChange} type="text" value={addListInput}/>
                    <label>Description:</label>
                    <input onChange={onAddDescChange} type="text" value={addDescInput}/>
                    <div className="modal-block-buttons">
                        <div className="modal-block-cancel" onClick={cancel}>Cancel</div>
                        <button>Add list</button>
                    </div>
                </form>
            </div>
};

export default AddListModal;