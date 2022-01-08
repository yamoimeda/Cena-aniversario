import React, { Component } from "react";
import {
  Button,
  TextField
} from "@material-ui/core";
import Dropzone, {useDropzone} from 'react-dropzone';
import fire from '../../firebase'
import { withRouter } from "react-router";
import firebase  from 'firebase/app'
export class Nuevopago extends Component {
  


  

  render() {

  
    return (
      <div className="App">

      <div >
          

          <div className="wave-containerkoi">
          
              <div className="logokoi">
              <div id="mainerror">
                  <div class="fof">
                          <h1>Lo sentimos, la plataforma está cerrada</h1>
                  </div>
              </div>

              </div>

              
              
          </div>
         
          
      </div>

    
  </div>
        
    );
  }
}

export default withRouter(Nuevopago);
