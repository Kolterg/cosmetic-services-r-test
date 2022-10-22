import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import LandingPage from "./app/shared/pages/landing/landing.page";
import AboutPage from "./app/shared/pages/about/about.page";
import AppointmentPage from "./app/shared/pages/appointment/appointment.page";

function App() {
    return (
        <div className={'wrapper'}>
            <Router>
                <header className={'lock-padding'}>
                    <Link to={''} className={'links'}>Головна</Link>
                    <Link to={'about'} className={'links'}>Про компанію</Link>
                    <Link to={'appointment'} className={'links'}>Запис на прийом</Link>
                </header>
                <div className={'contentBox'}>
                    <Switch className={'content'}>
                        <Route exact={true} path={'/'} render={() => (<LandingPage/>)}/>
                        <Route exact={true} path={'/about'} render={() => (<AboutPage/>)}/>
                        <Route exact={true} path={'/appointment'} render={() => (<AppointmentPage/>)}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
