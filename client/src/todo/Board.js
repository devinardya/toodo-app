import React, {useEffect, useState} from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import MainBox from './MainBox'
import '../index.scss';

let url = "https://lit-peak-62083.herokuapp.com"

const Board = ({location}) => {

    const [todobox, updateTodobox] = useState([]);
    const [pageStatus, updatePageStatus] = useState(false);
    const [loaderActive, updateLoaderActive] = useState(false);
    let userName = location.state.user;

    useEffect( () => {
        updateLoaderActive(true);
        let source = axios.CancelToken.source();

        axios.get(url+"/todos/"+userName, {
            cancelToken: source.token
          })
        .then(response => {   
            //console.log(response.data);
            updateLoaderActive(false);
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
              //console.log('Request canceled', thrown.message);
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
                    <div className ="block__board">
                        <Header 
                            userName = {userName}
                            logout = {logout}
                            initialPage = "board"
                        />
                         {loaderActive ? 
                          <Loader className="loader"
                              type="Oval"
                              color="#D56F85"
                              height={100}
                              width={100}
                              timeout={0}
                          /> 
                              : 
                        <MainBox 
                            todobox = {todobox}
                            userName = {userName}
                            updateTodobox = {updateTodobox}
                        />
                         }
                </div>
            </HelmetProvider>
};

export default Board;