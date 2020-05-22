import React, {useState} from 'react';
import axios from 'axios';
let url = "https://lit-peak-62083.herokuapp.com"

const AddBoxForm = ({userName, todobox, updateTodobox}) => {

    const [createBoxInputError, updateCreateBoxInputError] = useState(false);
    const [inputAddTodoBox, updateInputAddTodoBox] = useState("");

    const onAddingToDoBox = (e) => {
        let input = e.target.value;
        updateInputAddTodoBox(input);

        if(input.length > 20) {
            updateCreateBoxInputError(true);
        } else {
            updateCreateBoxInputError(false);
        }
    };

    const addNewTodoBox = (e) => {
        e.preventDefault();

        if (inputAddTodoBox.length !== 0 && inputAddTodoBox.length <= 20) {
             let input = {
                title : inputAddTodoBox
            }

            axios.post(url+"/todos/"+userName, input)
            .then(response => {   
                console.log(response);
               //updateTodobox(response.data)
               let copy = [...todobox];
               let newData = [...copy, response.data]
               updateTodobox(newData);
              })
              .catch( err => {
                console.log(err);
            })

            updateInputAddTodoBox("");
        } else {
            updateCreateBoxInputError(true);
        }
    };

    return  <div className="board-block-main--form">
                <form onSubmit={addNewTodoBox}>
                    <input onChange={onAddingToDoBox} type="text" value={inputAddTodoBox} style={ createBoxInputError ? { color : "red"} : {color : "#737373"}}/>
                    {createBoxInputError ? <p className="board-block-main--form-inputError">Can not create box with empty title or more than 20 characters</p> : <p className="board-block-main--form-input">Title length is minimun 1 character and maximum 20 characters</p>}
                    <button>Create todo box</button>
                </form>
            </div>  
};

export default AddBoxForm;