import React, {useState} from 'react';
import {IoMdList} from 'react-icons/io';
import ListInfoModal from '../Modal/ListInfoModal';
import Dropdown from './Dropdown';

const ListBox = ({
    todobox,
    todo,
    userName,
    updateTodobox,
    x,
}) => {

    const [listInfoModalStatus, updateListInfoModalStatus] = useState(false);

    const showInfoModal = () => {
        updateListInfoModalStatus(true);
    };


    return <li className="block__board--main--list">
                <div className="block__board--main--list--menu">
                    <div className="block__board--main--list--menu--info">
                        <p className="block__board--main--list--menu--info--list-title" onClick={showInfoModal}>{x.todoTitle}</p>
                        {x.description.length > 0 ? <span className="block__board--main--list--menu--info--list-desc" onClick={showInfoModal}><IoMdList /></span> : null}
                        {listInfoModalStatus && <ListInfoModal 
                            todobox = {todobox}
                            todo = {todo}
                            userName = {userName}
                            updateTodobox = {updateTodobox}
                            x = {x}
                            updateListInfoModalStatus = {updateListInfoModalStatus}
                        />}
                    </div>
                    <Dropdown 
                        todobox = {todobox}
                        updateTodobox = {updateTodobox}
                        todo = {todo}
                        userName = {userName}
                        initialElement = "items"
                        x = {x}
                    />
                </div> 
        </li>        
};

export default ListBox;