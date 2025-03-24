import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

constructor(private firestore: AngularFirestore) { }
  collectionName = 'user_data'; // Nombre de la colección en Firestore
  saveData(data: any[]): Observable<any> {
    return new Observable((observer) => {
      const promises = data.map((item) =>
        this.firestore.collection(this.collectionName).add(item)
      );

      // Ejecutar todas las promesas y manejar el resultado
      Promise.all(promises)
        .then((docRefs) => {
          observer.next(docRefs);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getData(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges();
  }
}
