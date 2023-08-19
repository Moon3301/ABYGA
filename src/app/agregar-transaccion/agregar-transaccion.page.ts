import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-agregar-transaccion',
  templateUrl: './agregar-transaccion.page.html',
  styleUrls: ['./agregar-transaccion.page.scss'],
})
export class AgregarTransaccionPage implements OnInit {
  IconTransaccion:string = "remove-circle-outline"

  constructor(private router:Router) { }

  ngOnInit() {
  }

  GoHome(){
    
    this.router.navigate(['home'])

  }
}
