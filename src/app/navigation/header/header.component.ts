import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('menu') menu: MatIcon;
  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>();

  toggle() {
    this.toggleSidebar.emit();
    this.menu._elementRef.nativeElement.blur();
  }

}
