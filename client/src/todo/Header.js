import React from 'react';
import logoicon from '../Image/toodo-logo.svg';

const Header = ({userName, logout}) => {


    return <header className="board-block-header">
                <div className="board-header--logo">
                    <figure className="board-logo">
                        <img src={logoicon} alt="toodo logo" />
                    </figure>
                </div>
                <div className="board-header--text">
                    <h4>Welcome, {userName}</h4>
                    <span>|</span>
                    <button onClick={logout}>Log out</button>
                </div>
            </header>
}
const MemoHeader = React.memo(Header);


export default MemoHeader;