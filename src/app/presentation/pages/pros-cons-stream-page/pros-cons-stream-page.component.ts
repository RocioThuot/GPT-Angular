import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GptMessageOrthographyComponent } from '@components/chatMessage/gptMessageOrthography/gptMessageOrthography.component';
import { ChatMessageComponent, MyMessageComponent, TypingLoaderComponent, TextBoxesComponent, TextMessageFileComponent } from '@components/index';
import { Message } from 'app/interfaces';
import { OpenaiServices } from 'app/services/openai.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,

    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    GptMessageOrthographyComponent,

    TextBoxesComponent,
    TextMessageFileComponent
  ],
  templateUrl: './pros-cons-stream-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ProsConsStreamPageComponent {


  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpenaiServices );

  public abortSignal = new AbortController();

  async handleMessage(prompt:string){

    this.abortSignal.abort();
    this.abortSignal = new AbortController()

    this.messages.update( (prev)=>[
      ...prev,
    {
      isGpt: false,
      text: prompt
    },{
      isGpt: true,
      text:'...'
    }
  ]);

   this.isLoading.set(true)
   const stream = this.openAiService.ckeckProsYConsstream(prompt, this.abortSignal.signal)
   for await (const text of stream) {
    this.handleStreamResponse(text)

   }

  }

  handleStreamResponse(menssage:string){

    this.messages().pop();
    const messages = this.messages();

    this.messages.set([...messages, { isGpt:true, text:menssage}])
  }
   }
