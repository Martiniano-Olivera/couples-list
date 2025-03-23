import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

    // Subir los datos a Firestore
    addData(data: any): Observable<any> {
      return from(this.firestore.collection('user_data').add(data));
    }

}
