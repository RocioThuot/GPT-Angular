import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-boxes-message',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl:'./textBoxMessage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextBoxesMessageComponent {
  @Input() placeholder:string= '';
  @Input() disableCorrection: boolean = true;
  @Output() onMessage = new EventEmitter<string>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
     prompt: [],
     file:   [null, Validators.required]
   });


  handleSubmit(){
   if(this.form.invalid)return;

   const { prompt  } = this.form.value;

  this.onMessage.emit(prompt ?? '');
  this.form.reset();
  }
  }
