import React from 'react';
import './App.scss';
import Navbar from './Navbar/Navbar';
import ListUser from './Manage-Users/listUsers';
import AddUser from './Add-User/addUser';
import EditUser from './Edit-User/editUser';
import TodoLists from './Todo-List/todoLists';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path={["/", "/manage-users/list"]} component={ListUser} />
            <Route exact path="/manage-users/add" component={AddUser} />
            <Route exact path="/manage-users/edit/:key" component={EditUser} />
            <Route exact path="/todo-lists" component={TodoLists} />
          </Switch>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
