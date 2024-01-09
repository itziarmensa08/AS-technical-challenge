import { Component, Input, Output, EventEmitter, Inject   } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent {

  @Input() type: string = 'success';
  @Input() message: string = '';
  @Input() buttonAcceptText: string = 'Button 1';
  @Input() buttonCancelText: string = 'Button 2';
  @Input() onButtonAcceptClick: () => void = () => {};
  @Input() onButtonCancelClick: (event: Event) => void = () => {};
  @Output() closeAlert = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  get alertClass(): string {
    return `alert-${this.data.type}`;
  }

  cancelClick(event: Event): void {
    event.stopPropagation();
    this.onButtonCancelClick(event);
    this.closeAlert.emit();
  }

}
