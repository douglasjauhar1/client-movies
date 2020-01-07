import React, { Component } from 'react'


export default class ListVideo extends Component {
    render() {
        return (
            <div  style={{width : 500, justifyItems : 'center'}}>
                <div class="box text-center" style={{width : 200, height : 50, backgroundColor : 'white', left : 200, marginTop : -20, position : 'absolute', zIndex : 1, justifyContent : 'center', alignItems : 'center', alignContent : 'center'}}>
                    <p className="text-center mt-2">Share a Youtube Movie</p>
                    </div>
                <div class="hadow p-3 mb-5 bg-white rounded">
                <div class="row mt-5">
                    <div class="col-lg-3">
                        Youtube Link
                    </div>
                        <div class="col-lg-9">
                        <input 
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
        )
    }
}
