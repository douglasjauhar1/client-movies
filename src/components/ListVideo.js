import React, { Component } from 'react'
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

export default class ListVideo extends Component {
    render() {
        return (
            <div class="container mt-5">
            <div class="card">
            <div class="card-header">
              Featured
            </div>
            <div class="card-body">
              <div class="row">
              <div class="col-lg">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9u14cHmJJpWkkFHT20hPKwYtJDXZi9gNbqgJ2KssPPNm_ngh7&s" width="450" height="200"/>
                </div>
                  <div class="col-lg">
                    <p>Title Video</p>
                    <p>douglasjauhar@mail.com</p>
                  <div class="col-lg">
                  <h6>70 <AiFillLike/>
                  70 <AiFillDislike/></h6>
                  </div>
                  <p class="card-text">Description : With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
              </div>
            </div>
          </div>
            </div>
     
        )
    }
}
