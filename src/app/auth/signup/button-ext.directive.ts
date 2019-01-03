import {
  Directive,
  Renderer2,
  ElementRef,
  AfterViewInit,
  Input,
  OnDestroy
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appButtonExt]'
})
export class ButtonExtDirective implements AfterViewInit, OnDestroy {
  @Input() form: NgModel;
  formStatusSub: Subscription;

  constructor(private renderer: Renderer2, private element: ElementRef) {}

  ngAfterViewInit() {
    this.renderer.setAttribute(this.element.nativeElement, 'disabled', 'true');
    this.formStatusSub = this.form.statusChanges.subscribe(status => {
      if (status === 'VALID') {
        this.renderer.removeAttribute(this.element.nativeElement, 'disabled');
      } else {
        this.renderer.setAttribute(
          this.element.nativeElement,
          'disabled',
          'true'
        );
      }
    });
  }

  ngOnDestroy() {
    this.formStatusSub.unsubscribe();
  }
}
