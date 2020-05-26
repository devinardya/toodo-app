import React from 'react';
import { Link } from 'react-router-dom';
import '../index.scss';
import logoicon from '../Image/toodo-logo2.svg';

const Header = ({userName, logout, initialPage}) => {

    let renderHeader;
    if (initialPage === "board") {
        renderHeader = <header className="board-block-header">
                            <div className="board-header--logo">
                                <figure className="board-logo">
                                    <img src={logoicon} alt="toodo logo" />
                                </figure>
                            </div>
                            <div className="board-header--text">
                                <div className="board-header--info">
                                    <h4>Welcome, {userName}</h4>
                                    <span>|</span>
                                    <button onClick={logout}>Log out</button>
                                </div>
                            </div>
                        </header>
    } else if (initialPage === "login") {
        renderHeader = <header className="board-block-header">
                            <div className="board-header--logo login">
                                <figure className="board-logo">
                                    <img src={logoicon} alt="toodo logo" />
                                </figure>
                            </div>
                            <div className="board-header--text">
                                <div className="board-header--info">
                                    <Link className="board-header-link" to="/">Home</Link>
                                </div>
                            </div>
                        </header>
    }


    return renderHeader;
}
const MemoHeader = React.memo(Header);


export default MemoHeader;