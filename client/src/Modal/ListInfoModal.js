import React, {useState} from 'react';
import {IoMdClose, IoMdInformationCircleOutline} from 'react-icons/io';
import ReactDOM from 'react-dom';
import ListInfoTitle from '../Modal/ListInfoTitle';
import ListInfoDecription from '../Modal/ListInfoDescription';
import ListInfoButtons from '../Modal/ListInfoButtons';
import '../index.scss';

const ListInfoModal = ({
    todobox,
    todo,
    userName,
    updateTodobox,
    x,
    updateListInfoModalStatus,
}) => {

    const [styleChange, updateStyleChange] = useState(false);

    const exitModal = () => {
        updateListInfoModalStatus(false);
    };

    let styleClass;
    if(!styleChange) {
        styleClass = "modal-block-container--listinfo"
    } else {
        styleClass = "modal-block-container--listinfo modalOff"
    }


    return ReactDOM.createPortal(
            <div className ={styleClass}>
                <div className="modal-block-container--listinfo-box">
                    <div className="modal-block-container--listinfo-box-contain">
                        <ListInfoTitle 
                            x = {x}
                            todobox = {todobox}
                            todo = {todo}
                            userName = {userName}
                            updateTodobox = {updateTodobox}
                            updateStyleChange = {updateStyleChange}
                        />
                        <ListInfoDecription 
                            x = {x}
                            todobox = {todobox}
                            todo = {todo}
                            userName = {userName}
                            updateTodobox = {updateTodobox}
                        />
                        <div className="modal-block-container--listinfo-box__activityInfo">
                            <h3><IoMdInformationCircleOutline style={{position: "relative", top:"2px", marginRight:"10px"}}/>
                                Information
                            </h3>
                            <p><span>{userName}</span> added this item to {todo.title} </p>
                            <p>{x.created}</p>
                        </div>
                    </div>
                    <ListInfoButtons 
                        x = {x}
                        todobox = {todobox}
                        todo = {todo}
                        userName = {userName}
                        updateTodobox = {updateTodobox}
                        updateListInfoModalStatus = {updateListInfoModalStatus}
                        updateStyleChange = {updateStyleChange}
                    />
                    <div className="exitInfoModal" onClick={exitModal}>
                        <span><IoMdClose/></span>
                    </div>
                </div>
            </div>,
		document.body
	);
};

export default ListInfoModal;