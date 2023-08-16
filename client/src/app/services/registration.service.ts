import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Registration, RegistrationResult } from '../models';
import { firstValueFrom, map, tap } from 'rxjs';

const URL = 'http://localhost:8080/api/register'

// @Service in spring boot
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private http = inject(HttpClient);

  registerAsPromise(registration: Registration): Promise<RegistrationResult> {
    // convert to promise
    return firstValueFrom(
      // post returns an observable
      this.http.post<RegistrationResult>(URL, registration)
    )
  }

  registerAsObservable(registration: Registration){
    //list.stream()
    return this.http.post<RegistrationResult>(URL, registration)
      .pipe(
        tap(result => { console.info('>>> tap: ', result) }),
        map(result => result.message)
      )
  }
}
