import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  // Vamos a guardar al usuario
 username = '';
    // inyectamos los servicios de Router para las rutas y de SocketService 
  constructor(private router: Router, private sockets: SocketService) {
    this.sockets.connect(); 
  }
  // Metodo que se ejecuta cuando el ususario preciona el boton
  enter(): void {
    const user = this.username.trim();

    if (!user) return;
    // Guardamos al usuraio en el almacenamiento del navegador
    localStorage.setItem('username', user);
    // Notificamos que laguien se conecto
    this.sockets.emitUserConnected(user);
    
    this.router.navigateByUrl('/chat');
  }
}
