import React, { Component } from "react";
import "react-step-progress-bar/styles.css";
import fire from '../../firebase';
import { QRCode } from 'react-qrcode-logo';
import { withRouter } from "react-router";
import lgmeeaa from "./componentes/logo_aposento nuevo-01.png"
import {
    Button,
    TextField,
  } from "@material-ui/core";
import firebase  from 'firebase/app'

export class verificar extends Component {
    
  state = {
    step: 1,
    cedula: "",
    html:"",
    asistencia:0,
    cofee:0
  };
  // Go to next step
  asistencia = uid =>{
    fire.firestore().collection("Formularios").doc("EJ13sh7uPVGgZLT2KIDg").update({
      "conteo.asistencia": firebase.firestore.FieldValue.increment(1)
    })
    fire.firestore().collection("cena-registros").doc(uid).update({
      asistencia: 1
    })
    .then(() => {
      
      this.setState({asistencia:1})
      alert("asistencia marcada")
      window.location.reload();
    })
  }

  cofee = async uid =>{
    fire.firestore().collection("cena-registros").doc(uid).update({
      cofee: firebase.firestore.FieldValue.increment(-1)
  }).then(() => {
    
    
    alert("Cofee marcado")
    window.location.reload();
  })
  
  }

  componentDidMount(){
      
    const id = this.props.match.params.id;
    console.log(id);
      this.buscar(id)
  }
  buscar = (uid) => {
      var newdata;
    fire.firestore().collection("cena-registros").where("uid","==",uid)
    .get()
    .then((querySnapshot) => {
     
      querySnapshot.forEach((doc) => {
       newdata = doc.data()
      
        });
        this.setState({cofee:newdata.cofee,asistencia:newdata.asistencia})

        var color = newdata.tipo == 1 ? '#1d7499' :newdata.tipo == 2 ? "#00ff15": newdata.tipo == 3 ? "#0030a1" : "#a6c1ff"
        if(newdata.tipo == 2 ){
          try {
            color = newdata.turno === 'AM' ? '#00ff15' : '#f6ff00'
          }
            
          catch{
            color = '#00ff15'
          }
            
        }
      var html = <div>
      <h4 className="textokoiform2">Este boleto: {newdata.verificado == 0 ? "Aun no esta verificado":"Ya esta verificado"}</h4>
      <div  style={{display:"flex",justifyContent:"center"}}>
      
        <div>
        <h4 className="textokoiform4"> {newdata.pagado == 0 ? "Abonado":newdata.pagado == 1 ?"Pagado":"Pendiente"}</h4>
      <h4 className="textokoiform4">Nombre: {newdata.nombre+" " +newdata.apellido}</h4>
            <h4 className="textokoiform4">Cédula: {newdata.cedula}</h4>
            <h4 className="textokoiform4">Sede: {newdata.igle}</h4>
            {newdata.igle == "Panamá" && <h4 className="textokoiform4">Red: {newdata.red}</h4> }
            
            <h4 className="textokoiform4">Boleto: {newdata.tipo == 1 ? 'Completo' :"Niño"}</h4>
            {newdata.tipo === 2 && <h4 className="textokoiform4">Turno: {newdata.turno}</h4> }
            <h4 className="textokoiform4">Cantidad de cofee: {this.state.cofee}</h4>
        </div>
        </div>

        <div style={{backgroundColor:color,height:"100px"}}>

        </div>
        <div style={{display:"flex",height:"40%",width:"100%", justifyContent:'center'}}>
        {this.state.cofee != 0 &&<Button
          style={{ background: "#fa7b25", color: "#ffff",width: "20%",marginRight:10, display:'block',marginTop:'20px'}}
          label="Siguiente"
          onClick={() => this.cofee(newdata.uid)}
        >
          Cofee tomado
        </Button>}

          {this.state.asistencia === 0 && <Button
             style={{ background: "#11a600", color: "#ffff",width: "20%", display:'block',marginTop:'20px'}}
            label="Continue"
            onClick={() => this.asistencia(newdata.uid)}
            
          >
            Asistió
          </Button>
          }
        </div>
        
     </div>

      if(newdata){
        this.setState({html:html})
      }
    })
    .catch((error) => {
    this.setState({html: <h4 className="textokoiform4">Este boleto No esta registrado</h4>})

    });
  
    
  };
  
  render() {


   return(
       <div className="datos"  >
       {this.state.html}


        </div>
  
   )
  }
}
export default withRouter(verificar);

