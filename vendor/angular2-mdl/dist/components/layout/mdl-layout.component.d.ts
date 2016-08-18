import { AfterContentInit, OnDestroy, Renderer, ElementRef, EventEmitter, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { MdlError } from './../common/mdl-error';
export declare class MdLUnsupportedLayoutTypeError extends MdlError {
    constructor(type: string);
}
export declare class MdlLayoutComponent implements AfterContentInit, OnDestroy, OnChanges {
    private renderer;
    private evm;
    private el;
    private ngZone;
    private header;
    private drawer;
    private content;
    mode: string;
    isFixedDrawer: boolean;
    isFixedHeader: boolean;
    isSeamed: boolean;
    selectedIndex: number;
    protected isRipple: boolean;
    isNoDrawer: boolean;
    selectedTabEmitter: EventEmitter<{}>;
    isDrawerVisible: boolean;
    isSmallScreen: boolean;
    private scrollListener;
    private windowMediaQueryListener;
    constructor(renderer: Renderer, evm: EventManager, el: ElementRef, ngZone: NgZone);
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): any;
    private updateSelectedTabIndex();
    private validateMode();
    private onScroll(scrollTop);
    private onQueryChange(isSmall);
    toggleDrawer(): void;
    closeDrawer(): void;
    obfuscatorKeyDown($event: any): void;
    ngOnDestroy(): void;
    tabSelected(tab: any): void;
    closeDrawerOnSmallScreens(): void;
    hasDrawer(): boolean;
}
