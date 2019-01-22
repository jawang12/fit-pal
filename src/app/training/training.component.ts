import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routerSlideInStateTrigger } from '../shared/routing-animations';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
  animations: [routerSlideInStateTrigger]
})
export class TrainingComponent {
  constructor(private router: Router) {}

  trainingInProgress() {
    return this.router.routerState.snapshot.url === '/training/current';
  }

  onRouteSlide(outlet: RouterOutlet): string {
    return outlet.activatedRouteData['animation'];
  }
}
