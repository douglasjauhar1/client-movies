import React from 'react';
import { FaHome } from "react-icons/fa";
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai"
import YouTube from 'react-youtube';
import {Link} from 'react-router-dom'
import axios from 'axios'
import './style.scss'
import ListVideo from '../../components/ListVideo';
import Navbar from '../../components/Navbar';


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
        
        return (
            <div>
                <Navbar islogin={this.state.isLogin} />
       <div className="jumbotron">
           <div className="container">
            <div className="row">
                <div className="col-lg">
                <img src="https://i.pinimg.com/originals/16/96/9a/16969a5049c707df133cd8639636bcf7.png" width="300" height="300"/>
                </div>
                <div className="col-lg mt-5">
                    <h1>Simple Get API YouTube</h1>
                    <p>Technichal Test From PT Nastha</p>
                </div>
            </div>
        </div>
      </div>
            <div className="container mb-10">
               {
                    this.state.movies.map((movie) => {
                        return(
                            //melempar ke list video
                            <div class="container">
                            <ListVideo 
                            link={movie.link}
                            opt={opts}
                            ready={this._onReady}
                            title={movie.title}
                            email={movie.email}
                            id={movie.id}
                            likes={movie.likes}
                            unlikes={movie.unlikes}
                            description={movie.description}
                            />
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