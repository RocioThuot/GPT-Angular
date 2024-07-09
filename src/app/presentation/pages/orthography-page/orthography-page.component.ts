
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chatMessage/chat-message.component';
import { GptMessageOrthographyComponent } from '@components/chatMessage/gptMessageOrthography/gptMessageOrthography.component';
import { TextBoxesComponent, TypingLoaderComponent } from '@components/index';
import { MyMessageComponent } from '@components/my-message/my-message.component';
import { TextMessageEvent, TextMessageFileComponent } from '@components/text-boxes/text-message/text-message-file.component';
import { Message } from 'app/interfaces';
import { OpenaiServices } from 'app/services/openai.service';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    GptMessageOrthographyComponent,

    TextBoxesComponent,
    TextMessageFileComponent],
  templateUrl: './orthography-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpenaiServices );


  handleMessage(prompt:string){
    this.isLoading.set(true);

    this.messages.update( (prev)=>[
    ...prev,
  {
    isGpt:false,
    text:prompt
  }
]);

this.openAiService.checkOrthography(prompt)
 .subscribe( resp =>{
   this.isLoading.set(false);

   this.messages.update( prev => [
    ...prev,
    {
      isGpt: true,
      text: resp.message,
      info: resp,
    }
   ])
 })
  }


}
