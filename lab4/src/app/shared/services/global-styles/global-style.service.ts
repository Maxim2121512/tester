// global-style.service.ts

import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GlobalStyleService {
    private renderer: Renderer2;

    constructor(private rendererFactory: RendererFactory2) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    setGlobalStyles(selector: string, styles: { [key: string]: string }): void {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            Object.keys(styles).forEach((style) => {
                this.renderer.setStyle(element, style, styles[style]);
            });
        });
    }
}
