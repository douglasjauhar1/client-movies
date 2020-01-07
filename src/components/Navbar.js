import React, { Component } from 'react'
import ListVideo from './ListVideo'
import ShareVideo from './ShareVideo'
import Share from './Share'
import axios from 'axios'

const API_URL = "http://localhost:4000"
export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          email: '',
          password: '',
          isLogin: '0',
        }
        this.handleChange = this.handleChange.bind(this);
        this.sendLogin = this.sendLogin.bind(this);
    }
    
    async componentDidMount(){
      
        let login = localStorage.getItem('Login');
        
        if(login == '1'){
            this.setState({
                isLogin: '1'
            });
        }else{
            this.setState({
                isLogin: '0'
            });
        }
      }
      handleChange(event) {
        const target = event.target;
        const value =  target.value;
        const name = target.name;
    
    
        this.setState({
        [name]: value
        });
    }
    async sendLogout(){
        try{
            let email = localStorage.getItem('email');
            let id = localStorage.getItem('id');
            const response = await axios({
                method: 'delete',
                url: API_URL+'/users',
                data: {
                  email: email,
                  id: id
                }
              });
              localStorage.setItem("Login", '0');
              this.setState({
                isLogin: '0'
              }) 
        }catch(error){

        }
    }
    async sendLogin() {
        if(this.state.email.length === 0){
            alert("email is empty");
            return;
        }
        else if(this.state.password.length === 0){
            alert("password is empty");
            return;
        }
        try{
          const response = await axios({
            method: 'put',
            url: API_URL+'/users',
            data: {
              email: this.state.email,
              password: this.state.password
            }
          });
          let data = response.data.result.data[0]
          const {
              id,
              email,
              status
          } = data;
          localStorage.setItem("id", id);
          localStorage.setItem("email", email);
          localStorage.setItem("Login", '1');
          this.setState({
            isLogin: '1'
          })
          }catch(error) {
            this.setState({
              isLogin: '0'
            })
            alert("the user was login");
          }
      }

    render() {
        const user = localStorage.getItem('email');
        return (
            <div>
            { 
                (this.state.isLogin == '1') ?
        <nav className="navbar navbar-light bg-light">
        <div className="container">
        <a className="navbar-brand">
        <img src="http://simpleicon.com/wp-content/uploads/home-3.png" width="30" height="30" className="d-inline-block align-top mr-2"/>
        Funny Movies
      </a>
        <form className="form-inline">
           <p>Welcome {email}</p>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Share a Movie</button>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit"   onClick={() => this.sendLogout()}>logout</button>
        </form>
        </div>
        </nav>
        :
        <nav className="navbar navbar-light bg-light">
        <div className="container">
        <a className="navbar-brand">
        <img src="http://simpleicon.com/wp-content/uploads/home-3.png" width="30" height="30" className="d-inline-block align-top mr-2"/>
        Funny Movies
      </a>
        <form className="form-inline">
            <input className="form-control mr-sm-2"  type="text" 
            placeholder="Email" 
            name="email"
            value={this.state.email}
            onChange={this.handleChange}/>
            <input className="form-control mr-sm-2"  type="password" 
            placeholder="Password" 
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit"   onClick={() => this.sendLogin()}>Login / Register</button>
        </form>
        </div>
        </nav>
            }
           <ListVideo/>
         <Share />
         </div>
      
        )
    }
}
