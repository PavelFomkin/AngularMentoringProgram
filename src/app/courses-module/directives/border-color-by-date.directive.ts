import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

const TWO_WEEKS_AS_MILLISECONDS: number = 14 * 24 * 60 * 60 * 1000; // days * hours * minutes * seconds * milliseconds

@Directive({
  selector: '[appBorderColorByDate]'
})
export class BorderColorByDateDirective implements OnChanges {

  @Input('appBorderColorByDate') creationDate: Date;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnChanges(): void {
    if (this.isCreationDateFresh()) {
      this.el.nativeElement.style.border = '1px solid green';
    } else if (this.isCreationDateWillBeReleased()) {
      this.el.nativeElement.style.border = '1px solid blue';
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'border');
    }
  }

  private isCreationDateFresh(): boolean {
    const now = Date.now();
    return this.creationDate.getTime() < now &&
      this.creationDate.getTime() >= now - TWO_WEEKS_AS_MILLISECONDS;
  }

  private isCreationDateWillBeReleased(): boolean {
    return this.creationDate.getTime() > Date.now();
  }
}
