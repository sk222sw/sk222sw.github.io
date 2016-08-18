import { DynamicComponentLoader, Injector, ViewContainerRef, Compiler } from '@angular/core';
import { MdlError } from '../common/mdl-error';
export declare class MdlSnackbarError extends MdlError {
    constructor(message: string);
}
export declare class MdlSnackbarComponent {
    message: string;
    actionText: string;
    private showIt;
    onAction: () => void;
    onClick(): void;
    isActive(): boolean;
    show(): Promise<void>;
    hide(): Promise<void>;
}
export interface IMdlSnackbarMessage {
    message: string;
    timeout?: number;
    action?: {
        handler: () => void;
        text: string;
    };
    vcRef?: ViewContainerRef;
}
export declare class MdlSnackbarService {
    private injector;
    private dynamicComponentLoader;
    private compiler;
    private defaultViewContainerRef;
    constructor(injector: Injector, dynamicComponentLoader: DynamicComponentLoader, compiler: Compiler);
    setDefaultViewContainerRef(vcRef: ViewContainerRef): void;
    showToast(message: string, timeout?: number, vcRef?: ViewContainerRef): Promise<MdlSnackbarComponent>;
    showSnackbar(snackbarMessage: IMdlSnackbarMessage): Promise<MdlSnackbarComponent>;
}
