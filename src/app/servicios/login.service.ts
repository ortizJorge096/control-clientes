import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(private authService: AngularFireAuth) {}

  login(email: string, password: string) {
    //console.log(this.authService);
    return new Promise((resolve, reject) => {
      //console.log(this.authService);
      this.authService.signInWithEmailAndPassword(email, password).then(
        (datos) => resolve(datos),
        (error) => reject(error)
      );
    });
  }

  getAuth() {
    return this.authService.authState.pipe(map((auth) => auth));
  }

  logout() {
    this.authService.signOut();
  }

  registro(email: string, password: string) {
    //console.log(this.authService);
    return new Promise((resolve, reject) => {
      //console.log(this.authService);
      this.authService.createUserWithEmailAndPassword(email, password).then(
        (datos) => resolve(datos),
        (error) => reject(error)
      );
    });
  }
}
