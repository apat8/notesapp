import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import {Provider } from "react-redux";
import store from "./store";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Main from "./components/main";
import ProtectedRoute from "./components/protectedRoute";
import PublicRoute from './components/publicRoute';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <PublicRoute exact path="/"><Main/></PublicRoute>
            <PublicRoute exact path="/login"><Login/></PublicRoute>
            <PublicRoute exact path="/register"><Register/></PublicRoute>
            <ProtectedRoute exact path="/home"><Home/></ProtectedRoute>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
