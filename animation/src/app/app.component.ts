import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        trigger('divState', [
            state('normal',style({
                'background-color': 'red',
                transform: 'translateX(0)'
            })),
            state('highlighted', style({
                'background-color': 'blue',
                transform: 'translateX(100px)'
            })),
            transition('normal <=> highlighted', animate(1800))
        ]), //to manage the state of div element

        trigger('wildState', [
            state('normal',style({
                'background-color': 'red',
                transform: 'translateX(0) scale(1)'
            })),
            state('highlighted', style({
                'background-color': 'blue',
                transform: 'translateX(100px) scale(1)'
            })),
            state('shrunken', style({
                'background-color': 'green',
                transform: 'translateX(0) scale(0.5)'
            })),
            transition('normal => highlighted', animate(800)),
            transition('highlighted => normal', animate(1800)),
            // * can stand for any state
            transition('shrunken <=> *', animate(500))
        ]) //to manage the state of div element
    ]

})
export class AppComponent {
    state = 'normal';//default state
    wildState = 'normal';//default state
    list = ['Milk', 'Sugar', 'Bread'];

    onShrik() {
        this.wildState = 'shrunken';
    }

    onAnimate() {
        this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal';
        this.wildState == 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
    }

    onAdd(item) {
        this.list.push(item);
    }
}
