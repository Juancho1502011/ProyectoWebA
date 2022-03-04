import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-ruta-inicio-sesion',
  templateUrl: './ruta-inicio-sesion.component.html',
  styleUrls: ['./ruta-inicio-sesion.component.css']
})
export class RutaInicioSesionComponent implements OnInit {

  constructor(
    private readonly _authService: AuthService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    //this._authService.estaLogeado = false;

  }

  @Input()
  cedula = '1234567890';

  @Input()
  password = '12345678';

  iniciarSesion() {
    if (this.cedula !== '' && this.password !== '') {
      this._authService.login(this.cedula, this.password).subscribe(
        (usuario: any) => {
          console.log(usuario);
          this._authService.saveSesion(usuario[0]);
          this._authService.usuarioLogeado = usuario[0];
          if (usuario[0].tipo_Usuario === 'Admin') {
            console.log('Admin');
            this.router.navigate(['/listarViajes']);
          } else if (usuario[0].tipo_Usuario === 'usuario') {
            console.log('usuario');
            this.router.navigate(['/comprarPasajes']);
          }
        }
      );
    } else {
      this._authService.estaLogeado = false;
    }

  }

}
