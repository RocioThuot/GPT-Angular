import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-text-boxes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule
  ],
  templateUrl: './text-boxes.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBoxesComponent {

 @Input() placeholder:string= '';
 @Input() disableCorrection: boolean = true;
 @Output() onMessage = new EventEmitter<string>();

 public fb = inject(FormBuilder);
 public form = this.fb.group( {

  prompt: [ '', Validators.required ]

} );


 handleSubmit(){
  if(this.form.invalid)return;

  const { prompt  } = this.form.value;

 this.onMessage.emit(prompt ?? '');
 this.form.reset();
 }


}
