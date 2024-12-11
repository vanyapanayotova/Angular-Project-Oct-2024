import { Component, OnInit, signal } from '@angular/core';
import { ErrorMsgService } from './error-msg.service';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.css',
})
export class ErrorMsgComponent implements OnInit {
  errorMsg = signal('');
  constructor(private errorMsgService: ErrorMsgService) {}

  ngOnInit(): void {
    this.errorMsgService.apiError$.subscribe((err: any) => {
      this.errorMsg.set(err?.error?.message);
      scroll(0,0); //scroll to top to see the error
      setTimeout(() => this.errorMsg.set(''), 5000); //hide error after 5 sec
    });
  }
}
