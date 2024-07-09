import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TextMessageEvent{
  file: File,
  prompt?: string | null;
}

@Component({
  selector: 'app-text-message-file',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './text-message-file.component.html',
  styleUrl: './text-message-file.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export  class TextMessageFileComponent {

  @Input() placeholder:string= '';

  @Output() onMessage = new EventEmitter<TextMessageEvent>();

  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [],
    file: [null, Validators.required ]
  });
  public file: File | undefined;



  handleSelectedFile( event: any){
    const file = event.targe.files.item(0);
    this.form.controls.file.setValue(file);

    console.log(file);
  }

  handleSubmit(){
   if(this.form.invalid)return;

   const { prompt, file } = this.form.value;

 this.onMessage.emit({ prompt, file: file! });
 this.form.reset();

  }
}
