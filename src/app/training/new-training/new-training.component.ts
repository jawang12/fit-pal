import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent {

  constructor(private router: Router) { }

  startTraining() {
    this.router.navigate(['/', 'training', 'current']);
  }
}
