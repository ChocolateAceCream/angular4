//import everything from firebase package alian as firebase
import * as firebase from 'firebase';
import {OnInit, Component } from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loadedFeature = 'recipe';

    ngOnInit() {
        firebase.initializeApp({
            //initializeApp method expect a JS object as argument
            //apiKey and authDomain can be obtain from SETUP option in firebase
            apiKey: "AIzaSyDcMU0KrsRXhixri73WpjvOiX1UYWweaMk",
            authDomain: "superhacker-dc8b8.firebaseapp.com"
            //finish initialize firebase
        });
    }
    onNavigate(feature: string) {
        this.loadedFeature = feature;

    }
}
