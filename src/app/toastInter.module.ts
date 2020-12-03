export interface Toasts{
    ttitle: string,
    content: string,
    color:boolean,
    showTitle: boolean,
    show?: () =>void,
    vert: string,
    horiz: string,
    hasCloseButton: boolean,
    showDuration: boolean,
    duration: number,
    close?: () => void;
}