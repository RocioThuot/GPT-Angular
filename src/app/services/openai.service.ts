
import { from } from 'rxjs';
import { orthographyUseCase } from './../core/use-cases/orthography/orthography.use-case';
import { Injectable } from '@angular/core';
import { prosConsUseCase } from 'app/core/use-cases/pros-con/pros-const.use-case';
import { prosConsUseCaseStream } from 'app/core/use-cases/pros-con/pros-const-stream';


@Injectable({
  providedIn: 'root'
})
export class OpenaiServices {

  checkOrthography(prompt:string){
    return from(orthographyUseCase(prompt))
  }

  ckeckProsYCons(prompt:string){
    return from(prosConsUseCase(prompt));
  }

  ckeckProsYConsstream(prompt:string, abortSignal: AbortSignal){
    return (prosConsUseCaseStream(prompt, abortSignal));
  }

}
