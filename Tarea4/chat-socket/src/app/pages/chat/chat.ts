import { Component, OnDestroy } from '@angular/core';
import { SocketService, ChatMessage } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat implements OnDestroy {
  me = localStorage.getItem('username') ?? 'Anónimo';
  text = '';
  messages: ChatMessage[] = [];
  notices: string[] = [];

  private subs: Subscription[] = [];

  constructor(private sockets: SocketService) {
    this.sockets.connect();

    this.subs.push(
      this.sockets.onMessage$().subscribe(m => this.messages.push(m)),
      this.sockets.onUserConnected$().subscribe(u => this.notices.push(`${u} se unió`))
    );
  }

  send(): void {
    const text = this.text.trim();
    if (!text) return;
    const msg: ChatMessage = { user: this.me, text: text, at: Date.now() };
    this.sockets.sendMessage(msg);
    this.text = '';
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
