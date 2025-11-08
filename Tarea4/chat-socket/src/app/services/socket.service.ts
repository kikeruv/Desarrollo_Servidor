import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

export interface ChatMessage {
  user: string;
  text: string;
  at: number; 
}

@Injectable({ providedIn: 'root' })
export class SocketService implements OnDestroy {
  private socket?: Socket;
  private connected = false;

  private messageSub = new Subject<ChatMessage>();
  private userConnectedSub = new Subject<string>();

    // Conectamos con el servidor 
  connect(): void {
    if (this.connected) return;
    
    this.socket = io(environment.socketUrl, { 
      transports: ['websocket'] 
    });
      // Cuando la conexxion se hace correctamente
    this.socket.on('connect', () => {
      this.connected = true;
    });
      // Cunado el socke se desconecta 
    this.socket.on('disconnect', () => {
      this.connected = false;
    });
      //Cuando el serv manda un mensaje
    this.socket.on('message', (data: ChatMessage) => {
      this.messageSub.next(data);
    });
      // Cunaod el serv notifica quien se conecto
    this.socket.on('user_connected', (username: string) => {
      this.userConnectedSub.next(username);
    });
  }

    // Notifica al serv que el usuario se acaba de unir
  emitUserConnected(username: string): void {
    this.socket?.emit('user_connected', username);
  }

    // NEnvia un mensaje al serv
  sendMessage(msg: ChatMessage): void {
    this.socket?.emit('message', msg);
  }

    // Dejamos este observable para nos retorne los mensajes que vea
  onMessage$(): Observable<ChatMessage> {
    return this.messageSub.asObservable();
  }

    // Dejamos este observable para que nos diga que alguien se conecto
  onUserConnected$(): Observable<string> {
    return this.userConnectedSub.asObservable();
  }
    // Destruimos todo
  ngOnDestroy(): void {
    this.socket?.disconnect();
  }
}
