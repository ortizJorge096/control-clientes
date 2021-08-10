import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private clientesServicio: ClienteServicio,
    private flasgMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe(
      clientes => {
          this.clientes = clientes;
      }
    )
  }

  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes){
      this.clientes.forEach(cliente =>{
        if(cliente.saldo)
        saldoTotal += cliente.saldo;
      })
    }
    return saldoTotal;
  }

  agregar(clienteForm: NgForm){
    //console.log("Form invalido 0");
    if(clienteForm.invalid){
      //console.log("Form invalido 1");
      this.flasgMessages.show('Por favor llena el formulario correctamente!',{
        cssClass: 'alert-danger', timeout:4000
      });
    }
    else{
      // Agregar el nuevo cliente

      //console.log(clienteForm.value);
      this.clientesServicio.agregarCliente(clienteForm);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }
}
