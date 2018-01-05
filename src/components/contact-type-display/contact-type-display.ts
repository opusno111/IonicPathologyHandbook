import { Component } from '@angular/core';

/**
 * Generated class for the ContactTypeDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contact-type-display',
  templateUrl: 'contact-type-display.html'
})
export class ContactTypeDisplayComponent {

  text: string;

  constructor() {
    console.log('Hello ContactTypeDisplayComponent Component');
    this.text = 'Hello World';
  }

}
