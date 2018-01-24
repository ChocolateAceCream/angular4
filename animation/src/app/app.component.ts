import {
	Component,
	trigger,
	state,
	style,
	transition,
	animate,
    group,
    keyframes
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

		trigger('list1', [
			state('in',style({
				opacity: 1,
				transform: 'translateX(0)'
			})),
			transition('void => *', [
				style({ //the style here define the initial style of element in the list, when we add a new list item, angular will automatically apply this style on that item, then transition through animate(1000), to its final state 'in'
					opacity: 0,
					transform:'translateX(-100px)'
				}),
				animate(1000)
			]),
			//for deleating items, since we are in a state, we dont need to
            //define the initial state
			transition('* => void', [
				animate(800,style({
					opacity: 0,
					transform: 'translateX(100px)'
				}))
			])
		]),
		trigger('list2', [
			state('in',style({
				opacity: 1,
				transform: 'translateX(0)'
			})),
			transition('void => *', [
                animate(1000, keyframes([
                    style({
                        transform: 'translateX(-100px)',
                        opacity: 0,
                        offset: 0//this is the initial state
                    }),
                    style({
                        transform: 'translateX(-50px)',
                        opacity: 0.5,
                        offset: 0.3
                    }),
                    style({
                        transform: 'translateX(-20px)',
                        opacity: 1,
                        offset: 0.8
                    }),
                    style({
                        transform: 'translateX(-20px)',
                        opacity: 1,
                        offset: 1//this will be the final state
                    }),

                ]))
			]),
			//for deleating items, since we are in a state, we dont need to
            //define the initial state
			transition('* => void', [
                group([
                    animate(800,style({
                        color: 'red'
                    })),
                    animate(800,style({
                        opacity: 0,
                        transform: 'translateX(100px)'
                    }))
                ])
			])
		]),
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
			transition('normal => highlighted', animate(300)),
			transition('highlighted => normal', animate(800)),
			transition('shrunken <=> *', [
				style({
					'background-color': 'orange'
				}),
				animate(1000, style({
					//this style element must be present in all related state
					//'border-radius': '50px'
					transform: 'translateX(0) scale(0.2)'
				})),
				animate(500)
			])
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
	onDelete(item) {
		this.list.splice(this.list.indexOf(item), 1);
	}

    animationStarted(event) {
        console.log(event);
    }
    animationEnded(event) {
        console.log(event);
    }

}
