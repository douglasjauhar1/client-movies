import React from 'react'
import  { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Home from './screens/Home/Home'
import Movie from './screens/Movie/Movie'
// import Share from './screen/share/share'

class App extends React.Component{
  render(){
    return(
      <Router>
        <Route exact path ={'/'} component={Home}/>
        <Route exact path ={'/movie'} component={Movie}/>
      </Router>
    )
  }
}

export default App