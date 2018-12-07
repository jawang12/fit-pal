import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {

  constructor(private router: Router) { }

  trainingInProgress() {
    return this.router.routerState.snapshot.url === '/training/current';
  }

}
