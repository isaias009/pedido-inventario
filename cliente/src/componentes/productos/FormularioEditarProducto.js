import React, { Component ,Fragment} from 'react';
import {Mutation} from 'react-apollo';
import {ACTUALIZAR_PRODUCTO} from '../../mutations';
import {withRouter}  from 'react-router-dom';
const initialState={
    nombre:'',
    precio:'',
    stock:''
}


class FormularioEditar extends Component {
    state={
        ...this.props.producto.obtenerProducto
    }
    limpiarState=()=>{
        this.setState({
            ...initialState
        })
    }
    validar =()=>{
        const{nombre,precio,stock}=this.state;
        const noValido=!nombre||!precio||!stock;
        return noValido;
    }


    /* 
        ! Codigo duplicado
        * funciones - actualizarState() en el archivo productos/NuevoProducto.js
    */
    actualizarState=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    editarProductoForm=(e,actualizarProducto)=>{
        e.preventDefault();
        actualizarProducto().then(data=>{
            this.limpiarState();
            
        })

    }
    render() {
        const{nombre,precio,stock}= this.state;
        const {id}=this.props;
        const input={
            id,
            nombre,
            precio:Number(precio),
            stock:Number(stock)
        }
        return (
            <Fragment>
                <Mutation 
                  mutation={ACTUALIZAR_PRODUCTO} 
                  variables={{input}}
                  key={id}
                  onCompleted={()=>this.props.refetch().then(()=>{
                      this.props.history.push('/productos')
                  })}
                >
                    {(actualizarProducto,{loading,error,data})=>{
                        return(
                            <form 
                            className="col-md-8" 
                            onSubmit={e=>this.editarProductoForm(e,actualizarProducto)}
                            >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        onChange={this.actualizarState}
                                        type="text"
                                        name="nombre" 
                                        className="form-control" 
                                        placeholder="Nombre del Producto"
                                        value={nombre}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio:</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">$</div>
                                        </div>
                                        <input 
                                            onChange={this.actualizarState}
                                            type="number" 
                                            name="precio" 
                                            className="form-control" 
                                            placeholder="Precio del Producto"
                                            value={precio}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Stock:</label>
                                    <input 
                                        onChange={this.actualizarState}
                                        type="number" 
                                        name="stock" 
                                        className="form-control" 
                                        placeholder="stock del Producto" 
                                        value={stock}
                                    />
                                </div>
                                <button 
                                    disabled={ this.validar() }
                                    type="submit" 
                                    className="btn btn-success float-right">
                                            Guardar Cambios
                                </button>
                            </form>
        
                        )
                    }} 
                </Mutation>
            </Fragment>
        )
    }
}

export default  withRouter(FormularioEditar);