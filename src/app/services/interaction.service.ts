import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private objectSource = new Subject<any>();
  object$ = this.objectSource.asObservable();

  constructor() { }

  sendObject(object :any){
     this.objectSource.next(object);
  }
}
