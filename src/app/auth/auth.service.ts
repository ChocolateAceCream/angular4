//service for authentication
import * as firebase from 'firebase';

export class AuthService {
    signupUser(email: string, password: string) {
        //method used to sign user up
        //auth method listen to the resovle of method call
        //createUserWithEmailAndPassword, then auth method will return a promise
        //since auth will return a promise, we can use then method to subscribe
        //to it, but here we only want to catch errors:
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            )

    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => console.log(response)
            )
            .catch(
                error => console.log(error)
            )
    }
}
