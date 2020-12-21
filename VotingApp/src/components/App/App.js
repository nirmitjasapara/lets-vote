import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import { CustomProvider } from '../../contexts/CustomContext';
import Header from '../Header/Header';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import AddPage from '../../routes/AddPage/AddPage';
import MainPage from '../../routes/MainPage/MainPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import './App.css'

class App extends Component {
    renderMainRoutes() {
        return (
            <Switch>
                {['/', '/poll/:pollId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={MainPage}
                    />
                ))}
                <PublicOnlyRoute
                    path={'/login'}
                    component={LoginPage}
                />
                <PublicOnlyRoute
                    path={'/register'}
                    component={RegistrationPage}
                />
                <PrivateRoute
                    path={'/add'}
                    component={AddPage}
                />
            </Switch>
        );
    }
    render() {
        return (
            <CustomProvider>
                <div className="App">
                    <Route component={Header} />
                    <main className="App_main">{this.renderMainRoutes()}</main>
                </div>
            </CustomProvider>
        );
    }
}

export default App;
