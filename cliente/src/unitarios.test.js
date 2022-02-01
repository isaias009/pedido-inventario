import React from "react";
import Exito from "./componentes/alertas/Exito";
import {CLIENTES_QUERY} from './queries/index';
import NuevoCliente from './componentes/clientes/NuevoCliente';


describe('Testean la funcion Exito', ()=> {

    it('Mensaje correcto', ()=>{
        const mensaje = "Registro exitoso"
        const res = Exito({mensaje});
        expect(res).toEqual(<p className="akert alert-success py-3 text-center">{mensaje}</p>)

    })
})

describe('Testean la query CLIENTES_QUERY', ()=> {

    it('Tipo de dato correcto', ()=>{

        const res = CLIENTES_QUERY;
        expect(typeof res).toEqual("object")

    })
})


describe('Testean los tipos de datos del Cliente', ()=> {

    it('Tipo de dato correcto del cliente', ()=>{

        const res = new NuevoCliente();
        const { nombre, apellido, domicilio, rfc, tipo } = res.state.cliente;
        expect(typeof nombre).toEqual("string")
        expect(typeof apellido).toEqual("string")
        expect(typeof domicilio).toEqual("string")
        expect(typeof rfc).toEqual("string")
        expect(typeof tipo).toEqual("string")

    })
})