import React, { useState, useEffect} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import News from './components/News/News';
import AddNews from './components/News/AddNews';
import './App.css';
import NewsDetails from './components/News/NewsDetails';
import Sliders from './components/Sliders/Sliders';
import Users from './components/Users/Users';
import EmailList from './components/EmailList/EmailList';
import Messages from './components/Messages/Messages';
import Dashboard from './components/Dashboard/Dashboard'; 
import Signin from './components/Auth/Signin';
import Signout from './components/Auth/Signout';


function App() {
  const [apiBaseUrl,setApiBaseUrl]=useState('https://charity-backend-july.herokuapp.com')
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const [url,setUrl]=useState('')
  const [token,setToken]=useState('')

  useEffect(() => {
        setToken(JSON.parse(sessionStorage.getItem('token')))
        setUrl(JSON.parse(sessionStorage.getItem('url')))
    }, [])

  return (
    <div className="App">
     <Router>
            <Route
	        exact path="/"
                render={() => <Signin apiBaseUrl={apiBaseUrl} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} token={token}/>}
	        />
    <Route
		exact path="/signout"
		render={() => <Signout apiBaseUrl={apiBaseUrl} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}  token={token}/>}
		/>
        {
              isLoggedIn || token ?  
              <div>
                      <Header url={url} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} />
       <Footer/>
       
         <Switch>
         <div className="content-wrapper">
       
           <Route
                    exact path="/dashboard"
                    render={() => <Dashboard apiBaseUrl={apiBaseUrl} />}
                    /> 
            <Route
                    exact path="/news"
                    render={() => <News apiBaseUrl={apiBaseUrl} />}
                    />
            <Route
                    exact path="/addnews" 
                    render={() => <AddNews apiBaseUrl={apiBaseUrl} />}
                    />
            <Route
                    exact path="/newsdetails/:id"
                    render={() => <NewsDetails apiBaseUrl={apiBaseUrl} />}
                    />
            <Route
                    exact path="/sliders"
                    render={() => <Sliders apiBaseUrl={apiBaseUrl} />} 
                    />
            <Route
                    exact path="/users"
                    render={() => <Users apiBaseUrl={apiBaseUrl} />}
                    />
            <Route
                    exact path="/emaillist"
                    render={() => <EmailList apiBaseUrl={apiBaseUrl} />}
                    />
            <Route
                    exact path="/messages"
                    render={() => <Messages apiBaseUrl={apiBaseUrl} />}
                    />
         </div>
         </Switch>
       
              </div>
              
              
              : null

        }
     </Router>   
    </div>
  );
}

export default App;
