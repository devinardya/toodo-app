import React, {useState} from 'react';
import axios from 'axios';
import {IoMdClose, IoMdList} from 'react-icons/io';
import {MdModeEdit} from 'react-icons/md';
import '../index.scss';

let url = "https://lit-peak-62083.herokuapp.com"

const ListInfoDecription = ({
    todobox,
    todo,
    userName,
    updateTodobox,
    x,
}) => {

    const [editDescBox, updateDescBox] = useState(false);
    const [descChange, updateDescChange] = useState(x.description);


    const editDescription = () => {
        updateDescBox(true);
    };

    const inputChange = (e) => {
        let input = e.target.value;
        updateDescChange(input);
    };

    const editDescItem = (e, todoId, itemID) => {
        e.preventDefault();

        let data = {
                    todoTitle: x.todoTitle,
                    description: descChange
                }
        
        axios.patch(url+"/todos/"+todoId+"/item/"+itemID+"/user/"+userName, data)
        .then(response => {
            console.log(response);
            let copyData = [...todobox];
            let findIndex = copyData.findIndex(x => x._id === todoId);
            let findDataIndex = copyData[findIndex].data.findIndex(y => y.id === itemID);
            copyData[findIndex].data[findDataIndex].description = response.data.description;
            console.log("copyData before save", copyData);
            updateTodobox(copyData);
            updateDescBox(false);
        })
        .catch( err => {
            console.log(err);
        })
        
    };


    const cancel = () => {
        updateDescBox(false);
    };

    return <div className="modal-block-container--listinfo-box__descInfo">
                            <h3><IoMdList style={{position: "relative", top:"2px", marginRight:"10px"}}/>
                                Description 
                                {x.description.length !== 0 
                                ?
                                <span onClick={editDescription}>
                                    <MdModeEdit style={{position: "relative", top:"3px", left:"10px"}} />
                                </span>
                                : null }
                            </h3>
                            {editDescBox || x.description.length === 0 ? 
                            <form onSubmit={(e) => editDescItem(e, todo._id, x.id )}>
                                <input 
                                    onChange={inputChange} 
                                    type="text" 
                                    value={descChange} 
                                    placeholder={x.description.length === 0 ? "Add a more detailed description..." : null} 
                                />
                                <div className="modal-block-container--listinfo-box__descInfo--formbuttons">
                                    <button>Save</button>
                                    {x.description.length !== 0 
                                    ? 
                                    <div className="board-block-main-cancel" onClick={cancel}>
                                        <IoMdClose />
                                    </div> 
                                    : null}
                                </div>
                            </form>
                            : 
                            <div className="modal-block-container--listinfo-box__descInfo--text" onClick={editDescription}>
                                <p>{x.description}</p>
                            </div>
                            }
                        </div>
};

export default ListInfoDecription;