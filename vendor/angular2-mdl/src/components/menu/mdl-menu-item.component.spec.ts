import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MdlMenuComponent, MdlMenuItemComponent, MdlMenuModule} from './index';

describe('Component: MdlMenuItem', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlMenuModule],
      declarations: [ MdlTestMenuItemComponent ],
    });
  });

  it('should add the css class mdl-menu__item to the host element', ( done ) => {

    TestBed.overrideComponent(MdlTestMenuItemComponent, { set: {
      template: '<mdl-menu><mdl-menu-item>x</mdl-menu-item></mdl-menu>' }
    });
    let fixture = TestBed.createComponent(MdlTestMenuItemComponent);
    fixture.detectChanges();

    let menuItemEl: HTMLElement = fixture.debugElement.query(By.directive(MdlMenuItemComponent)).nativeElement;
    expect(menuItemEl.classList.contains('mdl-menu__item')).toBe(true);

    done();
  });

  it('should call hideOnItemClicked on menu if the item is clicked', ( done ) => {

    TestBed.overrideComponent(MdlTestMenuItemComponent, { set: {
      template: '<mdl-menu><mdl-menu-item>x</mdl-menu-item></mdl-menu>' }
    });
    let fixture = TestBed.createComponent(MdlTestMenuItemComponent);
    fixture.detectChanges();

    let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

    let menuItemEl: HTMLElement = fixture.debugElement.query(By.directive(MdlMenuItemComponent)).nativeElement;

    spyOn(menu, 'hideOnItemClicked').and.callThrough();
    expect(menu.hideOnItemClicked).not.toHaveBeenCalled();

    menuItemEl.click();

    expect(menu.hideOnItemClicked).toHaveBeenCalled();

    done();

  });

  it('should call hideOnItemClicked on menu if the item is touched', ( done ) => {
    TestBed.overrideComponent(MdlTestMenuItemComponent, { set: {
      template: '<mdl-menu><mdl-menu-item>x</mdl-menu-item></mdl-menu>' }
    });
    let fixture = TestBed.createComponent(MdlTestMenuItemComponent);
    fixture.detectChanges();

    let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

    let menuItemEl: HTMLElement = fixture.debugElement.query(By.directive(MdlMenuItemComponent)).nativeElement;

    spyOn(menu, 'hideOnItemClicked').and.callThrough();
    expect(menu.hideOnItemClicked).not.toHaveBeenCalled();

    let event = new Event('touchstart', {});
    menuItemEl.dispatchEvent(event);

    expect(menu.hideOnItemClicked).toHaveBeenCalled();

    done();
  });

  it('should not call hideOnItemClicked on menu if the item is disbaled', ( done ) => {
    TestBed.overrideComponent(MdlTestMenuItemComponent, { set: {
      template: '<mdl-menu><mdl-menu-item disabled>x</mdl-menu-item></mdl-menu>' }
    });
    let fixture = TestBed.createComponent(MdlTestMenuItemComponent);
    fixture.detectChanges();

    let menu = fixture.debugElement.query(By.directive(MdlMenuComponent)).componentInstance;

    let menuItemEl: HTMLElement = fixture.debugElement.query(By.directive(MdlMenuItemComponent)).nativeElement;

    spyOn(menu, 'hideOnItemClicked').and.callThrough();
    expect(menu.hideOnItemClicked).not.toHaveBeenCalled();

    menuItemEl.click();

    expect(menu.hideOnItemClicked).not.toHaveBeenCalled();

    done();
  });

});


@Component({
  selector: 'test-menu',
  template: 'replaced by the test'
})
class MdlTestMenuItemComponent {}
