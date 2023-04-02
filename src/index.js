import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import LogIn from "./Components/LogIn/LogIn"

//import User from './Components/User/User';
//import UserCreate from './Components/UserCreate/UserCreate';

import TransactCreate from './Components/TransactCreate.js/TransactCreate';
import Transact from './Components/Transact/Transact';

import Category from './Components/Category/Category/Category';


const App = () => {
  //const [users, setUsers] = useState({ isAuthenticated: false, userName: "" })
  //const addUser = (user) => setUsers([...users, user])
  //const removeUser = (removeId) => setUsers(users.filter(({ id }) => id !== removeId));

  const [transacts, setTransacts] = useState([]);
  const addTransact = (transact) => setTransacts([...transacts, transact]);
  const removeTransact = (removeId) =>
    setTransacts(transacts.filter(({ id }) => id !== removeId));

  const [user, setUser] = useState({ isAuthenticated: false, userName: "" });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<h3>Главная страница</h3>} />
          <Route
            path="/transact"
            element={
              <>
                {/* <UserCreate
          addUser={addUser}
        />
        <User
          users={users}
          setUsers={setUsers}
          removeUser={removeUser}
        />   */}
                <TransactCreate user={user} addTransact={addTransact} />
                <Transact
                  user={user}
                  transacts={transacts}
                  setTransacts={setTransacts}
                  removeTransact={removeTransact}
                />
                <Category />
              </>
            }
          />
          <Route
            path="/login"
            element={<LogIn user={user} setUser={setUser} />}
          />
          <Route path="*" element={<h3>404</h3>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <App />
  //</React.StrictMode>
);