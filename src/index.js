import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import LogIn from "./Components/LogIn/LogIn"

import User from './Components/User/User';
//import UserCreate from './Components/UserCreate/UserCreate';

import TransactCreate from './Components/TransactCreate.js/TransactCreate';
import Transact from './Components/Transact/Transact';

import Category from './Components/Category/Category';
import CategoryCreate from './Components/Category/CategoryCreate';

import Registration from './Components/Registration/Registration';

import LogOff from './Components/LogOff/LogOff';

import Main from './Components/Main/Main';

const App = () => {

  //объявление функций и переменных состояний

  const [users, setUsers] = useState({ });
  //const addUser = (user) => setUsers([...users, user])
  const removeUser = (removeId) => setUsers(users.filter(({ id }) => id !== removeId));

  const [transacts, setTransacts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [UpdateTrans, setUpdTrans] = useState({});

  const addCategory = (category) => setCategories([...categories, category]);
  const addTransact = (transact) => setTransacts([...transacts, transact]);

  const removeCategory = (removeId) => setCategories(categories.filter(({ id }) => id !== removeId));
  const removeTransact = (removeId) => setTransacts(transacts.filter(({ id }) => id !== removeId));

  const [user, setUser] = useState({ isAuthenticated: false, userName: "", userRole: "" });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} /> }>
          <Route path="/" element={<Main user={user} />} />
          <Route
            path="/transact"
            element={
              <> 
                <TransactCreate 
                  user={user}
                  addTransact={addTransact}
                  categories={categories} 
                  UpdateTrans={UpdateTrans}
                  setUpdTrans={setUpdTrans}
                  setTransacts={setTransacts}
                  transacts={transacts}
                />
                <Category 
                  user={user}
                  categories={categories}
                  setCategories={setCategories}
                  removeCategory={removeCategory}
                  addCategory={addCategory}
                />
                <CategoryCreate
                  user={user}
                  addCategory={addCategory} 
                /> 
                <Transact
                  user={user}
                  transacts={transacts}
                  setTransacts={setTransacts}
                  removeTransact={removeTransact}
                  setUpdTrans={setUpdTrans}
                />
                <User
                  user={user}
                  users={users}
                  setUsers={setUsers}
                  removeUser={removeUser}
                /> 
              </>
            }
          />
          <Route
            path="/register"
            element={<Registration user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<LogIn user={user} setUser={setUser} />}
          />
          <Route
            path="/logoff"
            element={<LogOff setUser={setUser} />}
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