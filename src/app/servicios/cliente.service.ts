import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, throwError } from "rxjs";
import { Cliente } from "../modelo/cliente.model";
import { map, catchError } from 'rxjs/operators';
import { NgForm } from "@angular/forms";


@Injectable()
export class ClienteServicio{
    clientesColeccion: AngularFirestoreCollection<Cliente>;
    clienteDoc: AngularFirestoreDocument<Cliente>;
    clientes: Observable<Cliente[]>;
    cliente: Observable<Cliente>;

    constructor(private db:AngularFirestore){
        this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
    }

    getClientes(): Observable<Cliente[]>{
        this.clientes = this.clientesColeccion.snapshotChanges().pipe(
            map(cambios =>{
                return cambios.map(accion=>{
                    const datos = accion.payload.doc.data() as Cliente;
                    datos.id = accion.payload.doc.id;
                    return datos;
                })
            })
        );
        return this.clientes;
    }

    agregarCliente(clienteForm: NgForm){
      this.clientesColeccion.add(clienteForm.value)
    };

    getCliente(id: string){
      this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
      this.cliente = this.clienteDoc.snapshotChanges().pipe(
        map( accion => {
          //console.log(accion);
          /*if(accion.payload.exists === false){
            return null;
          }
          else{*/
            const datos = accion.payload.data() as Cliente;
            datos.id = accion.payload.id;
            return datos;
          //}
        }
        )
        ,
      catchError((error) => {
        return throwError(error);
      })
      );
      return this.cliente;
    }

    modificarCliente(cliente: Cliente){
      //console.log(cliente);
      this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
      this.clienteDoc.update(cliente);

    }

    eliminarCliente(cliente: Cliente){
      this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
      this.clienteDoc.delete();
    }
}
