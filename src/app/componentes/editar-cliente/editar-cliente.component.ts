import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id:string;

  constructor(private clientesServicio: ClienteServicio,
    private flasgMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    //console.log(this.id);
    this.clientesServicio.getCliente(this.id).subscribe( cli =>  {
    this.cliente = cli;
    //console.log(cli);
      /*this.cliente.nombre = cliente?.nombre;
      this.cliente.apellido = cliente?.apellido;
      this.cliente.email = cliente?.email;
      this.cliente.saldo = cliente?.saldo;*/
    })
  }

  guardarCliente(clienteForm: NgForm){
    //console.log(clienteForm.value);
    if(clienteForm.invalid){
      this.flasgMessages.show('Por favor llena el formulario correctamente!',{
        cssClass: 'alert-danger', timeout:4000
      });
    }
    else{
      clienteForm.value.id = this.id;
      //console.log(' guardarCliente ' + clienteForm.value.id);

     // console.log(clienteForm.value);

      this.clientesServicio.modificarCliente(clienteForm.value);

      //console.log(' Desde componente editar ' + clienteForm);

      this.router.navigate(['/']);
    }
  }

  eliminar(){
    if(confirm('¿Seguro que desea eliminar el cliente?')){
      this.clientesServicio.eliminarCliente(this.cliente)
      this.router.navigate(['/']);
    }
  }
}
