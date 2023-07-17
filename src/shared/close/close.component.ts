import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'hangman-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss'],
})
export class CloseComponent {
  @Output() onClose = new EventEmitter();

  closeMenu(): void {
    this.onClose.emit();
  }
}
