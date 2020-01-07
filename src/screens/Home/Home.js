import React from 'react';
import { FaHome } from "react-icons/fa";
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai"
import YouTube from 'react-youtube';
import {Link} from 'react-router-dom'
import axios from 'axios'
import './style.scss'


const API_URL = "http://localhost:4000"
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          email: '',
          password: '',
          isLogin: '0',
          movies: [],
          youtube_data: []
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.sendLogin = this.sendLogin.bind(this);
    }

    async sendlike(status, id){
        try{
            const response = await axios({
                method: 'put',
                url: API_URL+'/share',
                data:{
                    movie_id: id,
                    data: status
                }
              });
              this.movieList()
        }catch(error){
            console.error(error);
            
        }
    }

    async componentDidMount(){
        this.movieList()
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
    
    async movieList(){
        try{
            const response = await axios({
                method: 'get',
                url: API_URL+'/share'
              });
              await this.setState({
                  movies: response.data.result.movies
              })
        }catch(error){
            console.error(error);
            
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

    _onReady(event) {
        event.target.pauseVideo();
      }

      render (){
        const opts = {
            height: '320',
            width: '480',
            playerVars: { 
            autoplay: 0
            }
        };
        
        const user = localStorage.getItem('email');
        return (
            <div>
            { 
                (this.state.isLogin == '1') ?
                    <nav className="navbar shadow-sm p-3  bg-white ">
                    <div className="container">
                    <a className="navbar-brand">
                    <img src="https://www.pinclipart.com/picdir/middle/328-3280268_home-red-home-icon-png-clipart.png" width="30" height="30" className="d-inline-block align-top mr-2"/>
                    Funny Movies
                    </a>
                    <div className="form-inline">
                    <h4 className="mr-2 mb-2">Welcome {user}</h4>
                    <Link to={'/movie'}>
                            <button 
                                type="button" 
                                className="btn btn-outline-danger mr-2 my-sm-0 btn-animate"
                            >
                                    Share a Movie
                            </button>
                        </Link>
                        <button 
                            type="button" 
                            className="btn btn-danger my-2 my-sm-0 btn-animate"
                            onClick={() => this.sendLogout()}
                        >
                            Logout
                        </button>
                    </div>
                        </div>
                    </nav>
                    :
                  
                    <nav className="navbar navbar-light bg-light">
        <div className="container">
        <Link to ={'/'} className="navbar-brand">
        <img src="https://www.pinclipart.com/picdir/middle/328-3280268_home-red-home-icon-png-clipart.png" width="30" height="30" className="d-inline-block align-top mr-2"/>
        Funny Movies
      </Link>
            <div class="form-inline">
            <input className="inputd mr-sm-2"  type="text" 
            placeholder="Enter Your Email" 
            name="email"
            value={this.state.email}
            onChange={this.handleChange} />
            <input className="inputd mr-sm-2"  type="password" 
            placeholder="Enter Your Password" 
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            />
            <button className="btn btn-danger my-2 my-sm-0 btn-animate" type="submit"   onClick={() => this.sendLogin()}>Login / Register</button>
            </div>
        </div>
        </nav>       
            }
       <div className="jumbotron">
           <div className="container">
            <div className="row">
                <div className="col-lg">
                <img src="https://i.pinimg.com/originals/16/96/9a/16969a5049c707df133cd8639636bcf7.png" width="300" height="300"/>
                </div>
                <div className="col-lg">
                    <h1>SImple Get API YouTube</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam eum dicta, maxime consequuntur dolorum quas et nisi ex expedita accusantium, perspiciatis facilis labore adipisci. Commodi ex voluptatem nisi soluta deleniti.</p>
                </div>
            </div>
        </div>
      </div>
            <div className="container mb-10">
               {
                    this.state.movies.map((movie) => {
                        return(
                            <div class="container">
               <div class="shadow p-3 mb-5 bg-white rounded">
               <div class="row">
                   <div class="col-lg">
                   <YouTube
                    videoId={movie.link}
                    opts={opts}
                    onReady={this._onReady}
                    />
                   </div>
                   <div class="col-lg">
                       <h4>{movie.title}</h4>
                       <p>Shared by :  {movie.email} </p>
                       <span style={{fontSize:16}}>{movie.likes}</span> 
                       <button onClick={() => {this.sendlike("likes", movie.id)}}
                    class="btn">
                        <AiOutlineLike style={{fontSize:25 ,color : 'red'}}/>
                </button>
                <span style={{fontSize:16, marginLeft:20}}>{movie.unlikes}</span> 
                <button 
                 onClick={() => {this.sendlike("unlikes", movie.id)}}
                    class="btn"
                    style={{marginLeft:5, color : 'red'}}>
                    <AiOutlineDislike style={{fontSize:25}}/>
                </button><br/>
                <b>Description :</b>
                <p>{movie.description}</p>
                   </div>
               </div>
               </div>
           
               </div> 
                        )
                    }
                )}
            </div>
          
            </div>
            
        );
  }
  
}

export default Home;