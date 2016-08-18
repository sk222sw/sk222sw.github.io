import {
  inject,
  TestBed
} from '@angular/core/testing';
import { By, DOCUMENT } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlSliderComponent, MdlSliderModule } from './mdl-slider.component';
import { FormsModule } from '@angular/forms';

describe('Component: MdlSlider', () => {

  var doc: HTMLDocument;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MdlSliderModule, FormsModule ],
      declarations: [ MdlTestSliderComponent],
    });
  });

  beforeEach(inject([DOCUMENT], function (document) {
    doc = document;
  }));

  it('should add the css class mdl-slider__container to the host element', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestSliderComponent);
    fixture.detectChanges();

    let iconEl: HTMLElement = fixture.nativeElement.children.item(0);
    expect(iconEl.classList.contains('mdl-slider__container')).toBe(true);

    done();
  });

  it('should support ngModel', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestSliderComponent);
    fixture.detectChanges();

    let instance = fixture.componentInstance;
    let component = fixture.debugElement.query(By.directive(MdlSliderComponent)).componentInstance;

    instance.currentValue = 67;
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      expect(component.value).toEqual(67);

      component.value = 88;
      fixture.detectChanges();

      expect(instance.currentValue).toEqual(88);

      done();
    });


  });

  it('should call blur on mouseup events on the host element', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestSliderComponent);
    fixture.detectChanges();

    let hostElement = fixture.debugElement.query(By.css('mdl-slider')).nativeElement;

    spyOn(hostElement, 'blur');

    var evt = doc.createEvent('HTMLEvents');
    evt.initEvent('mouseup', true, true);
    hostElement.dispatchEvent(evt);

    fixture.detectChanges();

    expect(hostElement.blur).toHaveBeenCalled();

    done();

  });

  it('should propagate mousedown events on the host to the input element', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestSliderComponent);
    fixture.detectChanges();

    let hostElement = fixture.debugElement.query(By.css('mdl-slider')).nativeElement;

    let inputElement =  fixture.debugElement.query(By.css('input')).nativeElement;

    spyOn(inputElement, 'dispatchEvent').and.callThrough();

    var evt = doc.createEvent('HTMLEvents');
    evt.initEvent('mousedown', true, true);
    hostElement.dispatchEvent(evt);

    fixture.detectChanges();

    expect(inputElement.dispatchEvent).toHaveBeenCalledTimes(1);

    done();

  });


  it('should not propagate mousedown events to the input element on other elements than the host', ( done ) => {

    let fixture = TestBed.createComponent(MdlTestSliderComponent);
    fixture.detectChanges();

    let inputElement =  fixture.debugElement.query(By.css('input')).nativeElement;

    spyOn(inputElement, 'dispatchEvent').and.callThrough();

    var evt = doc.createEvent('HTMLEvents');
    evt.initEvent('mousedown', true, true);
    inputElement.dispatchEvent(evt);

    fixture.detectChanges();

    // if it would be propagated dispatchEvent would have been called 2 times.
    expect(inputElement.dispatchEvent).toHaveBeenCalledTimes(1);

    done();

  });


});


@Component({
  selector: 'test-icon',
  template: "<mdl-slider [min]='min' [max]='max' [(ngModel)]='currentValue'></mdl-slider>"
})
class MdlTestSliderComponent {
  public min = 0;
  public max = 100;
  public currentValue = 50;
}
