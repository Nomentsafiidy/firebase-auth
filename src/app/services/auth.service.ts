import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Login, User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

    public signIn(login: Login) {
        return this.afAuth.signInWithEmailAndPassword(login.email, login.password);
    }

    public signOut() {
        return this.afAuth.signOut();
    }

    private async sendVerificationMail() {
        return this.afAuth.currentUser.then((user: any) => {
            return user.sendEmailVerification().then(() => {});
        });
    }

    public getCurrentUser(): Promise<any> {
        return this.afAuth.currentUser.then((user: any) => {
            return user;
        });
    }

    private saveUserToCollection(data: User) {
        return this.afs.firestore.collection('users').doc(data.id).set(data);
    }

    public async signUp(user: User) {
        try {
            const fireRes = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
            await this.sendVerificationMail();
            user.id = fireRes.user?.uid;
            user.password = '';
            user.avatar = false;
            this.saveUserToCollection(user);
        } catch (error) {
            if (error.message === 'The email address is already in use by another account.') {
                throw new Error('Email already in use');
            } else {
                throw new Error(error.message);
            }
        }
    }

    public async checkPseudo(pseudo: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.afs.firestore
                .collection('users')
                .where('pseudo', '==', pseudo)
                .get()
                .then((response) => {
                    if (response.docs.length > 0) {
                        resolve(true);
                    } else resolve(false);
                });
        });
    }

    public forgotPassword(email: string) {
        return this.afAuth.sendPasswordResetEmail(email);
    }

    public async verifyEmail(oobCode: string) {
        return await this.afAuth.applyActionCode(oobCode);
    }

    public async resetPassword(oobCode: string, newPassword: string) {
        return await this.afAuth.confirmPasswordReset(oobCode, newPassword);
    }
}
