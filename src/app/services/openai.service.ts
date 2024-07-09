import { from } from 'rxjs';
import { orthographyUseCase } from './../core/use-cases/orthography/orthography.use-case';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenaiServices {

  checkOrthography(prompt:string){
    return from(orthographyUseCase(prompt))
  }
}
