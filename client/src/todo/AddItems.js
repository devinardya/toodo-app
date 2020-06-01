import React, {useState} from 'react';
import axios from 'axios';
import {IoIosAddCircle, IoMdClose} from 'react-icons/io';
let url = "https://lit-peak-62083.herokuapp.com"


const AddItems = ({
    todobox,
    todo,
    userName,
    updateTodobox,
}) => {

    const [addListFormActive, updateAddListFormActive] = useState(false);
    const [addListInput, updateAddListText] = useState("");

    const onAddListChange = (e) => {
        let data = e.target.value;
        updateAddListText(data);
    };

    const addListActive = () => {
        updateAddListFormActive(true);
    };

    const addNewList = (e, id) => {

        e.preventDefault();


        if(addListInput.length !== 0){

            let input = {
                todoTitle : addListInput,
                description : "",
            }
            axios.post(url+"/todos/" + id + "/user/" + userName, input)
            .then(response => {   
                console.log("response after adding data", response.data);
                let copyData = [...todobox];
                let index = copyData.findIndex(x => x._id === id);
                copyData[index].data = [...copyData[index].data, response.data];
                updateTodobox(copyData);
                updateAddListFormActive(false);
            })
            .catch( err => {
                console.log(err);
            })

            updateAddListText("");
        } 
    };
    
    const cancel = () => {
        updateAddListFormActive(false);
    };

    return <div className="block__board--main--eachbox--addItem">
                {addListFormActive ? 
                    <form className="block__board--main--eachbox--addItem__addform" onSubmit = {(e) => addNewList(e, todo._id)} >
                        <div className="block__board--main--eachbox--addItem__addform--inputbox">
                            <input onChange={onAddListChange} placeholder="Enter title for this item..." type="text" value={addListInput}/>
                        </div>
                        <div className="block__board--main--eachbox--addItem__addform--formbutton">
                            <button className="block__board--main--eachbox--addItem__addform--formbutton--addList">Add Item</button>
                            <div className="block__board--main--eachbox--addItem__addform--formbutton--cancel" onClick={cancel}><IoMdClose /></div>
                        </div>
                    </form>
                    : 
                    <button className="block__board--main-addButton" onClick={() => addListActive()}>
                        <IoIosAddCircle style={{position:"relative", top: "2px", marginRight:"10px"}}/>
                        Add new item
                    </button>
                }
            </div>      
};

export default AddItems;