import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import 'rxjs/Rx';
//inject http service into this service
@Injectable()
export class DataStorageService {
    //inject Http service and Recipe in order to reach Recipe and http method
    constructor(
        private httpClient: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) {}

    storeRecipes() {
        //example of setting headers:
        //const headers = new HttpHeaders().set('Authorization', 'Bearer some_token').append('Header_name', 'Value');

        //const token = this.authService.getToken();

        //since we will get back an observable from http.put, we also need to
        //return this observable.
        //
        //replace http with httpClient, httpClient stil have a put method

        /*
        return this.httpClient.put(
            'https://superhacker-dc8b8.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(),
            //append a JS object inside put method for custerming
            {
                //add/modify headers:
                //headers: headers,

                //observe: 'events'
                observe: 'body', //this is the default setting of observe

                //add query params:
                params: new HttpParams().set('auth', token)
                //this will set query url to:
                //'https://superhacker-dc8b8.firebaseio.com/recipes.json?auth'+token

            }
        );

         */

        //listen to progress of response made(usually for uploading/downloading
        //process)

        const req = new HttpRequest('PUT','https://superhacker-dc8b8.firebaseio.com/recipes.json',this.recipeService.getRecipes(), {reportProgress: true})

        //we create a req but haven't use it, now we can use it this way, return
        //a observable as before.
        return this.httpClient.request(req);
    }

    getRecipes() {
            /*if we retrive token with the .then block, the token can only be
             * used inside block, which is not good, so we do it in AuthService
            .then(
                (token: string) => {

                }
            );
             */
        //add an auth query params in URL
        const token = this.authService.getToken();
        //get method is generic, so we can tell the httpClient which type of
        //data we getting back, now we know we getting back Recpie[], so we can
        //use:
        //alternativly we can write (recipes: Recipe[]) inside map method.
        this.httpClient.get<Recipe[]>('https://superhacker-dc8b8.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json',
            //those tow arguments from the second argument in get method are
            //default setting of get method, which return the response body in
            //type of json.
        })
            .map(
                /*
                #(response: Response) => {
                   # const recipes: Recipe[] = response.json();
                now httpClient can explicily define the type of response, and we don;t need to extract json from response body,  however, if we want to override this reponse to get raw response, we can do so
                 */
                (recipes) => {
                    //pass recipes fetched from server to recipeService, then
                    //from there to whoever interested to listen
                    //
                    //loop through the recipes to check if every recipes has ingredient property.
                    for(let recipe of recipes) {
                        //
                        //if no ingredient presented
                        if (!recipe['ingredients']) {
                            //now it still doesnt have ingredient, but now it
                            //has ingredient property empty array
                            recipe.ingredients = [];
                            //backet notation also works
                            //recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                //now we getting back recipes from map
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);

                }
            );
    }
}
