import { ProsYcosResponse } from './../interfaces/pros-cos.interface';
import { from } from 'rxjs';
import { orthographyUseCase } from './../core/use-cases/orthography/orthography.use-case';
import { Injectable } from '@angular/core';
import { prosConsUseCase } from 'app/core/use-cases/pros-const.use-case';

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
}
