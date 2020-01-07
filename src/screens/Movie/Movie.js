import React from 'react';
import { FaHome } from "react-icons/fa";
import {Link, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import './style.scss'
import ListVideo from '../../components/ListVideo';

const API_URL = "http://localhost:4000"

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            url: '',
            isSend: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }

    
    async getDataYoutube(id){
        try{
            const response = await axios({
                method: 'get',
                url: 'https://www.googleapis.com/youtube/v3/videos',
                params: {
                  part: "snippet",
                  key: 'AIzaSyApCy9eVPhWHQC_32uJDRX-tbwCSlHjWys',
                  id: id
                }
            });

            const data = await response.data.items[0].snippet.localized;
            return(data)
        }catch(error){
            
        }
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
              console.log(response);
              localStorage.setItem("Login", '0');
              this.setState({
                isLogin: '0',
                isSend: 1
              }) 
        }catch(error){

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

    async newMovie (){
        try{
            const youtube_id = this.state.url.split("v=")
            console.log(youtube_id);
            let id = localStorage.getItem('id');
            const data = await this.getDataYoutube(youtube_id[1])
            console.log(data);
            const text = data.description.substr(0, 254);
            const response = await axios({
                method: 'post',
                url: API_URL+'/share',
                data: {
                  link: youtube_id[1],
                  id: id,
                  description: text,
                  title: data.title
                }
              });
              this.setState({
                isSend: 1
              })
        }catch(error){
            alert("the youtube URL is invalid");
            console.log(error);
        }
    }

    render(){
        const user = localStorage.getItem('email');
      return (
        <div>
          {(this.state.isSend == '1')&&<Redirect push to='/'></Redirect>}
          <nav className="navbar shadow-sm p-3  bg-white ">
                    <div className="container px-0 py-0">
                    <a className="navbar-brand">
                    <img src="https://www.pinclipart.com/picdir/middle/328-3280268_home-red-home-icon-png-clipart.png" width="30" height="30" className="d-inline-block align-top mr-2"/>
                    Funny Movies
                    </a>
                    <div className="form-inline">
                    <h4 className="mr-2 mb-2">Welcome {user}</h4>
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

                    <div class="container" style={{marginTop : 100, justifyContent :'center', alignItems : 'center', display : 'flex'}}>
                    <div class="mx-0"style={{width : 500, justifyItems : 'center', justifyContent : 'center'}}>
                <div class="box text-center" style={{width : 200, height : 50, backgroundColor : 'white', left : 450, marginTop : -20, position : 'absolute', zIndex : 1, justifyContent : 'center', alignItems : 'center', alignContent : 'center'}}>
                    <p className="text-center mt-2">Share a Youtube Movie</p>
                    </div>
                <div class="shadow p-3 mb-5 bg-white rounded card">
                <div class="row mt-5">
                    <div class="col-lg-3">
                        Youtube Link
                    </div>
                        <div class="col-lg-9">
                        <input 
                        className="inputs"
                        type="text" 
                        placeholder="URL" 
                        name="url"    
                        value={this.state.url}
                        onChange={this.handleChange} 
                         />
                        </div>
                </div>
                <br/>
                <div class="row text-center">
                    <div class="col-lg-12">
                    <button onClick={()=>this.newMovie()} class="btn btn-outline-danger" style={{width : 300}}>Share</button>
                    </div>
                </div>
                </div>
                
                </div>
            </div>
        </div>
      );
  }
}

export default Movie;