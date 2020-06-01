import React, {useState} from 'react';
import {IoIosList} from 'react-icons/io';
import {MdModeEdit} from 'react-icons/md';
import RenameListModal from '../Modal/RenameListModal';
import '../index.scss';

const ListInfoTitle = ({
    todobox,
    todo,
    userName,
    updateTodobox,
    x,
    updateStyleChange,
}) => {

    const [renameListModalStatus, updateRenameListModalStatus] = useState(false);

    const editTitle = () => {
        updateRenameListModalStatus(true); 
        updateStyleChange(true);
    };


    return <div className="modal-block-container--listinfo-box__titleInfo">
                <h3><IoIosList style={{position: "relative", top:"2px", marginRight:"10px"}}/>
                    {x.todoTitle}
                    <span onClick={editTitle}><MdModeEdit style={{position: "relative", top:"3px", left:"10px"}} /></span>
                </h3>
                { renameListModalStatus && <RenameListModal 
                    todoID = {todo._id}
                    itemId = {x.id}
                    updateRenameListModalStatus = {updateRenameListModalStatus}
                    itemTitle = {x.todoTitle}
                    itemDesc = {x.description}
                    todobox = {todobox}
                    updateTodobox = {updateTodobox}
                    userName = {userName}
                    updateStyleChange = {updateStyleChange}
                    initialPage = "listInfoModal"
                />
                }
                <p>in list <span>{todo.title}</span></p>
            </div>
};

export default ListInfoTitle;