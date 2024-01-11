import { atom } from 'recoil';

export const MANDALART_INITIAL_STATE = [
    {
        id: 0, 
        order: 0, 
        cells: [ '', '', '', '', '', '', '', '', '' ]
    }, 
    {
        id: 1, 
        order: 1, 
        cells: [ '', '', '', '', '', '', '', '', '' ]
    }, 
    {
        id: 2, 
        order: 2, 
        cells: [ '', '', '', '', '', '', '', '', '' ]
    }, 
    {
        id: 3, 
        order: 3, 
        cells: [ '', '', '', '', '', '', '', '', '' ]
    }, 
    {
        id: 4, 
        order: 4, 
        cells: [ '', '', '', '', '', '', '', '', '' ]
    }, 
    {
        id: 5, 
        order: 5, 
        cells: [ '', '', '', '', '', '', '', '', '' ]
    }, 
    {
        id: 6, 
        order: 6, 
        cells: [ '', '', '', '', '', '', '', '', '' ]
    }, 
    {
        id: 7, 
        order: 7, 
        cells: [ '', '', '', '', '', '', '', '', '' ]
    }, 
    {
        id: 8, 
        order: 8, 
        cells: [ '', '', '', '', '', '', '', '', '' ]
    }, 
]

export const mandalartState = atom({
    key: 'mandalart', 
    default: MANDALART_INITIAL_STATE   
})