import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Activity } from '../shared/classes/activity';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }
  collectionName = 'user_data'; // Nombre de la colección en Firestore
    // addData(data: any): Observable<any> {
    //   return from(this.firestore.collection('user_data').add(data));
    // }

    // saveData(data: any[]): Observable<any> {
    //   // Aquí, guardamos el array de objetos que nos pasas como parámetro
    //   return new Observable((observer) => {
    //     this.firestore
    //       .collection(this.collectionName)
    //       .add({ data }) // Agregamos el array 'data' como un campo en el documento
    //       .then((docRef) => {
    //         observer.next(docRef);
    //         observer.complete();
    //       })
    //       .catch((error) => {
    //         observer.error(error);
    //       });
    //   });
    // }

    // saveData(data: any[]): Observable<any> {
    //   return new Observable((observer) => {
    //     this.firestore
    //       .collection(this.collectionName)
    //       .add(...data)  // Guarda directamente cada objeto como un documento
    //       .then((docRef) => {
    //         observer.next(docRef);
    //         observer.complete();
    //       })
    //       .catch((error) => {
    //         observer.error(error);
    //       });
    //   });
    // }
    saveData(data: any[]): Observable<any> {
      return new Observable((observer) => {
        const promises = data.map((item) =>
          this.firestore.collection(this.collectionName).add(item)  // Agrega cada objeto individualmente
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
    
    

    // getData(): Observable<any> {
    //   return this.firestore
    //     .collection(this.collectionName)
    //     .valueChanges(); // Devuelve un observable con los datos en tiempo real
    // }

      // Método para obtener los datos de Firebase Firestore
      // getData(): Observable<any[]> {
      //   return this.firestore.collection(this.collectionName).valueChanges(); // Obtiene los datos de la colección
      // }

      getData(): Observable<any[]> {
        return this.firestore.collection(this.collectionName).valueChanges();  // Retorna los datos de la colección directamente
      }
      

}
