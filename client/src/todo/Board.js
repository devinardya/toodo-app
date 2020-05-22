import React, {useEffect, useState} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import MainBox from './MainBox'
import './board.scss';

const Board = ({location}) => {

    const [todobox, updateTodobox] = useState([]);
    const [pageStatus, updatePageStatus] = useState(false);
    let userName = location.state.user;
    

    useEffect( () => {

        let source = axios.CancelToken.source();

        axios.get("/todos/"+userName, {
            cancelToken: source.token
          })
        .then(response => {   
            console.log(response.data);
            updateTodobox(response.data);
        })
        .catch((error) => {
             console.log(error);
        });

        return () => {
          source.cancel('Operation canceled by the user.'); 
      }
 

    }, [userName]);

    

    const logout = () => {
        let source = axios.CancelToken.source();
        axios.get("/todos/", {
            cancelToken: source.token
          })
          .catch(function (thrown) {
            if (axios.isCancel(thrown)) {
              console.log('Request canceled', thrown.message);
            } else {
              // handle error
            }
          }); 
          source.cancel('Operation canceled by the user.'); 
          updatePageStatus(true);
    }

    if(pageStatus) {
        return <Redirect to="/login"/> 
   } 


    return <HelmetProvider>
                <Helmet>
                    <title>Toodo - {userName}</title>
                </Helmet>
                    <div className ="board-container-block">
                        <Header 
                            userName = {userName}
                            logout = {logout}
                            initialPage = "board"
                        />
                        <MainBox 
                            todobox = {todobox}
                            userName = {userName}
                            updateTodobox = {updateTodobox}
                        />
                </div>
            </HelmetProvider>
};

export default Board;