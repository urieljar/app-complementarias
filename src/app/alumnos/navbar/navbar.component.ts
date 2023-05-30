import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router,
    private solicitudService: SolicitudService) { }
  ngOnInit(): void {
   

  }
 
  limpiarStorage(){
    localStorage.removeItem('no_control');
    localStorage.removeItem('nombre_completo');
    localStorage.removeItem('carrera');
    this.router.navigate(['/inicio']);
  }
}
