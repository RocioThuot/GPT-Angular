import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextBoxesComponent, TextMessageFileComponent } from '@components/index';
import { Message } from 'app/interfaces';
import { OpenaiServices } from 'app/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextBoxesComponent,
  ],
  templateUrl: './pros-cons-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProsConsPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpenaiServices );

  handleMessage(prompt: string){

    this.messages.update( (prev)=>[
      ...prev,
    {
      isGpt: false,
      text: prompt
    }
  ]);


    this.isLoading.set(true)
    this.openAiService.ckeckProsYCons(prompt)
   .subscribe( resp =>{
     this.isLoading.set(false);

     this.messages.update( prev => [
      ...prev,

      {
        isGpt:true,
        text: resp.content

      }
     ])



      }
     )
   }
    }




