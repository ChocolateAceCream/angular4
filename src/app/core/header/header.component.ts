import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ) {}
    onSaveData() {
        //one way is to subscribe the observable returned from http.put in that
        //service component, the other way is to subscribe in the actual
        //component which use that service. we choosed the second way because we
        //now are able to customise error message for different component.

        this.dataStorageService.storeRecipes()
            .subscribe(
                (response: Response) => {
                    console.log(response);
                }
            );
    }

    onFetchData() {
        //since we already subscribe in our data-storage, we dont need to do
        //here
       this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
    }
}
