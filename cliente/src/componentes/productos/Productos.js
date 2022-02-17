import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import React, { Component,Fragment } from 'react'
import {Query,Mutation} from 'react-apollo';
import {PRODUCTOS_QUERY} from '../../queries'
import {ELIMINAR_PRODUCTO} from '../../mutations';
import Paginador from '../Paginador';
import Exito from '../alertas/Exito';
export default class Productos extends Component{
    limite=10;
    state={
        alerta:{
            mostrar:false,
            mensaje:'' 
         },
        paginator:{
           
            offset:0,
            paginaActual:1,
           
        },
    }


    /* 
        ! Codigo duplicado
        * funciones - paginaAnterior() | paginaSiguiente() en el archivo clientes/Clientes.js
    */
    paginaAnterior =()=>{
        this.setState({
            paginator:{
                offset:this.state.paginator.offset-this.limite,
                paginaActual:this.state.paginator.paginaActual-1,
             
            }
        })
    }
    paginaSiguiente =()=>{
      
         this.setState({
             paginator:{
                 offset:this.state.paginator.offset+this.limite,
                 paginaActual:this.state.paginator.paginaActual+1,
             
             }
         })
    }
    render(){
        const {alerta:{mostrar,mensaje}}=this.state;
        const alerta=(mostrar)?<Exito mensaje={mensaje}/>:'';
        return(
            
                

             
              <Query query={PRODUCTOS_QUERY}   pollInterval={100} variables={{limite:this.limite,
                offset:this.state.paginator.offset
                }}>
                   {({loading,error,data,startPolling,stopPolling})=>{
                       if(loading) return "cargando";
                       if(error) return `ERROR:{error.message}`;
                       console.log(data);
                       return (
                          <Fragment>
                              <h1 className="text-center mb-5">Productos</h1>
                         
                               
                                {alerta}
                                  
                                   
                                       <table className="table">
                                           <thead>
                                               <tr className="table-primary">
                                                   <th scope="col">Nombre</th>
                                                   <th scope="col">Precio</th>
                                                   <th scope="col">Stock</th>
                                                   <th scope="col">Editar</th>
                                                   <th scope="col">Eliminar</th>
                                               </tr>
                                           </thead>
                                           <tbody>
                                            
                                           {data.obtenerProductos.map(e=>{
                                               const {id}=e;
                                                        return(
                                                       <tr key={id}>
                                                        <td>{e.nombre}</td>
                                                        <td>{e.precio}</td>
                                                        <td>{e.stock}</td>
                                                        <td><Link className="btn btn-success" to={`/productos/editar/${id}`} >Editar</Link></td>
                                                        <td>
                                                            
                                                      
                                                        <Mutation mutation={ELIMINAR_PRODUCTO}
                                                                   onCompleted={(data)=>{
                                                                     this.setState({
                                                                        alerta:{
                                                                            mostrar:true,
                                                                            mensaje:data.eliminarProducto
                                                                        } 
                                                                     },()=>{
                                                                        setTimeout(() => {
                                                                            this.setState({
                                                                                alerta:{
                                                                                    mostrar:false,
                                                                                    mensaje:''
                                                                                } 
                                                                             })
                                                                         }, 3000);  
                                                                     })
                                                                    
                                                                   }}
                                                        >
                                                            {eliminarProducto =>(                                                   
                                                                                                               
                                                        
                                                         <button className="btn btn-danger"
                                                          onClick={()=>{
                                                          if(window.confirm('Desea eliminar este registro?')){
                                                            eliminarProducto({
                                                                variables:{id}
                                                            })
                                                          } 
                                                        } }                                                      
                                                         >&times;Eliminar</button>
                                                                                                                                                                   
                                                        
                                                           )} 
                                                         </Mutation>  
                                                        </td>
                                                        </tr>
                                                        )
                                           })}
                                                   
                                            
                                          
                                           </tbody>
                                       </table>
                                       
                                  
                               
                              
                           
                           <Paginador actual={this.state.paginator.paginaActual}
                                      total={data.totalProductos}
                                      limite={this.limite}
                                      paginaAnterior={this.paginaAnterior}
                                      paginaSiguiente={this.paginaSiguiente}
          
                           />
                          </Fragment>
                          
                          )
                   }}
               </Query>
        )
    }
}
