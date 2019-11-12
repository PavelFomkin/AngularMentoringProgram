import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appTopRated]'
})
export class TopRatedDirective {

  @Input('appTopRated') set topRated(isTopRated) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    if (isTopRated) {
      const startEl = document.createElement('h4');
      startEl.innerHTML = '&nbsp;&#10032;';
      this.templateRef.elementRef.nativeElement.nextSibling.after(startEl);
    }
  }

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

}
