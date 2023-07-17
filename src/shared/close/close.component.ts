import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'hangman-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss'],
})
export class CloseComponent {
  @Output() closeClicked = new EventEmitter();

  closeMenu(): void {
    this.closeClicked.emit();
  }
}
