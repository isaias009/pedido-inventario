import React ,{Fragment,Component} from 'react';
import {Query,Mutation} from 'react-apollo';
import {Link} from 'react-router-dom';
import {CLIENTES_QUERY }from '../../queries';
import {ELIMINAR_CLIENTE }from '../../mutations';
import Paginador from '../Paginador';
import Exito from '../alertas/Exito';
class Contactos extends Component{
    limite=10;
    state={
            paginator:{
                offset:0,
                paginaActual:1,
               
            },
            alerta:{
                mostrar:false,
                mensaje:''
            }
           
        }
    
    /* 
        ! Codigo duplicado
        * funciones - paginaAnterior() | paginaSiguiente() en el archivo productos/Productos.js
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
    
     <Query query={CLIENTES_QUERY}   pollInterval={100} variables={{limite:this.limite,
      offset:this.state.paginator.offset
      }}>
         {({loading,error,data,startPolling,stopPolling})=>{
             if(loading) return "cargando";
             if(error) return `ERROR:${error.message}`;
             console.log(data);
             return (
                <Fragment>
                     <h2 className="text-center "> Listado Clientes</h2>
                     {alerta}
                 <ul className="list-group mt-4">
                     
                         { data.getClientes.map(item=>{
                          const {id}=item;
                          return(
                             <li key ={item.id} className="list-group-item">
                                 <div className="row justify-content-between align-items-center">
                                     <div className="col-md-8 d-flex justify-content-between align-items-center">
                                         {item.nombre} {item.apellido}
                                     </div>
                                     <div className="col-md-4 d-flex justify-content-end" >
                                         <Link to={`/pedidos/nuevo/${item.id}`} className="btn btn-primary d-block d-md-inline-block mr-2"
                                            >
                                                &#43;Nuevo Pedido
                                            </Link>
                                            <Link to={`/pedidos/${item.id}`} className="btn btn-warning d-block d-md-inline-block mr-2"
                                            >
                                                &#43;Ver Pedidos
                                            </Link>
                                            <Link to={`/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block mr-2"
                                            >
                                                Editar
                                            </Link>
                                          <Mutation mutation={ELIMINAR_CLIENTE}
                                             onCompleted={(data)=>{
                                                this.setState({
                                                   alerta:{
                                                       mostrar:true,
                                                       mensaje:data.eliminarCliente
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
                                           {eliminarCliente=>(
                                          
                                          <button type="button" className="btn btn-danger d-block d-md-inline-block"
                                            onClick={()=>{
                                                if(window.confirm('Desea eliminar este registro?')){
                                               
                                                eliminarCliente({
                                                    variables:{id}
                                                })
                                               }
                                            }}
                                            
                                            >
                                             &times;  Eliminar
                                           </button>
                                           )}
                                          </Mutation>
                                     </div>
                                 </div>
                             </li>
                             )
                         })}
                     
                    
                 </ul>
                 <Paginador actual={this.state.paginator.paginaActual}
                            total={data.totalClientes}
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

export default Contactos;