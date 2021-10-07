import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private afs: AngularFirestore) {}

    public getById(userId: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.afs.firestore
                .collection('users')
                .doc(userId)
                .get()
                .then((doc) => {
                    resolve({ ...doc.data(), id: doc.id } as User);
                })
                .catch((error) => {
                    console.log('Error--->', error);
                    reject(error);
                });
        });
    }

    public saveUserToCollection(data: User) {
        return this.afs.firestore.collection('users').doc(data.id).set(data);
    }
}
