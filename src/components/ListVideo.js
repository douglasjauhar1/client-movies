import React, { Fragment } from 'react'
import {AiOutlineLike, AiOutlineDislike} from "react-icons/ai"
import YouTube from 'react-youtube';

//get props from screen
const ListVideo = (props) => {

        return (
            <Fragment>
                <div class="shadow p-3 mb-5 bg-white rounded">
                    <div class="row">
                        <div class="col-lg">
                        <YouTube
                            videoId={props.link}
                            opts={props.opt}
                            onReady={props.ready}
                            />
                        </div>
                        <div class="col-lg">
                            <h4>{props.title}</h4>
                            <p>Shared by :  {props.email} </p>
                            <span style={{fontSize:16}}>{props.likes}</span> 
                            <button onClick={() => {this.sendlike("likes", props.id)}}
                            class="btn">
                                <AiOutlineLike style={{fontSize:25 ,color : 'red'}}/>
                        </button>
                        <span style={{fontSize:16, marginLeft:20}}>{props.unlikes}</span> 
                        <button 
                        onClick={() => {this.sendlike("unlikes", props.id)}}
                            class="btn"
                            style={{marginLeft:5, color : 'red'}}>
                            <AiOutlineDislike style={{fontSize:25}}/>
                        </button><br/>
                        <b>Description :</b>
                        <p>{props.description}</p>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
}

export default ListVideo