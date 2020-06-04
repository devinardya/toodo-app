import React from 'react';
import { Link } from 'react-router-dom';
import '../index.scss';

const Header = ({userName, logout, initialPage}) => {

    let renderHeader;
    if (initialPage === "board") {
        renderHeader = <header className="board-block-header">
                            <div className="board-header--logo">
                                <div className="board-logo"></div>
                            </div>
                            <div className="board-header--text">
                                <div className="board-header--info">
                                    <h4>Welcome, {userName}</h4>
                                    <span>|</span>
                                    <button onClick={logout}></button>
                                </div>
                            </div>
                        </header>
    } else if (initialPage === "login") {
        renderHeader = <header className="board-block-header">
                            <div className="board-header--logo login">
                                <div className="board-logo"></div>
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