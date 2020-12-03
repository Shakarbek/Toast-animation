import {animate, state, style, transition, trigger} from '@angular/animations';

export const TOAST_ANIMATION_STATES = trigger('toastAnimation', [
    state('shiftL', style({opacity: 1, overflow:'hidden', transform: 'translateX(-15px)'})),
    transition('void=>shiftL', [style({opacity: 0}), animate('5s')]),
    state('shiftC', style({opacity: 1})),
    transition('void=>shiftC', animate('5s')),
    state('shiftR', style({opacity: 1,transform: 'translateX(15px)'})),
    transition('void=>shiftR', animate('5s')),

    state('backL', style({transform: 'translateX(15px)'})),
    transition('shiftL=>backL', [style({opacity:1}), animate(500)] ),
    state('backC', style({})),
    transition('shiftC=>backC', [style({opacity:1}), animate(500)] ),
    state('backR', style({transform: 'translateX(-15px)'})),
    transition('shiftR=>backR', [style({opacity:1}), animate(500)] )
])
