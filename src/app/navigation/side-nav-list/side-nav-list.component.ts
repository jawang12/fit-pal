import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})

export class SideNavListComponent {
  @Output() clickClose: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.clickClose.emit();
  }
}