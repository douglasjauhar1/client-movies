import React, { Component } from 'react'
import ListVideo from './ListVideo'
import ShareVideo from './ShareVideo'

export default class Navbar extends Component {
    render() {
        return (
            <div>
        <nav className="navbar navbar-light bg-light">
        <div className="container">
        <a className="navbar-brand">
        <img src="http://simpleicon.com/wp-content/uploads/home-3.png" width="30" height="30" className="d-inline-block align-top mr-2"/>
        Funny Movies
      </a>
        <form className="form-inline">
            <input className="form-control mr-sm-2" type="email" placeholder="Email" aria-label="Search" />
            <input className="form-control mr-sm-2" type="password" placeholder="Password" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login / Register</button>
        </form>
        </div>
        </nav>
         <ListVideo />
         <ShareVideo/>
         </div>
        )
    }
}
