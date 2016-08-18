import {
  TestBed,
  async
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import {
  MdlLayoutModule,
  MdlLayoutComponent,
  MdlLayoutContentComponent,
  MdlLayoutDrawerComponent,
  MdlLayoutHeaderComponent
} from './index';
import { MdlRippleModule } from './../common/mdl-ripple.directive';
import { MdlTabsModule } from './../tabs/index';

describe('Component: MdlLayout', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdlLayoutModule, MdlRippleModule, MdlTabsModule],
      declarations: [ MdlTestLayoutComponent ],
    });
  });

  it('should add the css class mdl-layout__container to the child of the host element', ( done ) => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: '<mdl-layout>x</mdl-layout>' }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();

    let layoutEl: HTMLElement = fixture.debugElement.query(By.directive(MdlLayoutComponent)).nativeElement;
    let layoutContainer: HTMLElement = <HTMLElement>layoutEl.children.item(0);
    expect(layoutContainer.classList.contains('mdl-layout__container')).toBe(true);

    let layoutMainElement = <HTMLElement>layoutContainer.children.item(0);
    expect(layoutMainElement.classList.contains('mdl-layout')).toBe(true);
    done();

  });

  it('should configure layout mode standard if no mode is provided', (done) => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: '<mdl-layout mdl-layout-mode="">x</mdl-layout>' }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance.mode).toBe('standard');

    done();
  });

  it('should throw if an unsupported layout type is provided', (done) => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: '<mdl-layout mdl-layout-mode="test">x</mdl-layout>' }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);

    expect( () => {
      fixture.detectChanges();
    }).toThrow();

    done();
  });

  it('should close the obfuscator if the escape key is pressed', (done) => {
    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: `
          <mdl-layout>
            <mdl-layout-header></mdl-layout-header>
            <mdl-layout-drawer></mdl-layout-drawer>
            <mdl-layout-content></mdl-layout-content>
          </mdl-layout>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();

    let layoutComponent = fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance;
    layoutComponent.isDrawerVisible = true;

    let obfuscatorElement =  fixture.debugElement.query(By.css('.mdl-layout__obfuscator')).nativeElement;

    // dirty hack to provide an event with keyCode
    var e = <any>new Event('keydown');
    e.keyCode = 27;
    obfuscatorElement.dispatchEvent(e);

    expect(layoutComponent.isDrawerVisible).toBe(false);

    done();

  });

  it('should unregister the scroll listener if a content is present', ( done ) => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: `
          <mdl-layout>
            <mdl-layout-header></mdl-layout-header>
            <mdl-layout-drawer></mdl-layout-drawer>
            <mdl-layout-content></mdl-layout-content>
          </mdl-layout>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);

    fixture.detectChanges();

    let layoutComponent = fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance;

    expect(layoutComponent.scrollListener).toBeDefined();

    layoutComponent.ngOnDestroy();

    expect(layoutComponent.scrollListener).toBeNull();

    done();

  });

  it('should safely unregister the scroll listener if no content is present', ( done ) => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: `
          <mdl-layout>
            <mdl-layout-header></mdl-layout-header>
            <mdl-layout-drawer></mdl-layout-drawer>
          </mdl-layout>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();

    let layoutComponent = fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance;

    expect(layoutComponent.scrollListener).toBeUndefined();

    layoutComponent.ngOnDestroy();

    expect(layoutComponent.scrollListener).toBeUndefined();

    done();

  });

  it('should change the small screen css on small screens', ( done ) => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: `
          <mdl-layout>
            <mdl-layout-header></mdl-layout-header>
            <mdl-layout-drawer></mdl-layout-drawer>
            <mdl-layout-content></mdl-layout-content>
          </mdl-layout>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();

    let layoutComponent = fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance;

    // small screen
    layoutComponent.onQueryChange(true);
    fixture.detectChanges();
    let mdlLayoutElement =  fixture.debugElement.query(By.css('.mdl-layout')).nativeElement;
    expect(mdlLayoutElement.classList.contains('is-small-screen')).toBe(true);

    // large screen
    layoutComponent.onQueryChange(false);
    fixture.detectChanges();
    expect(mdlLayoutElement.classList.contains('is-small-screen')).toBe(false);


    done();
  });

  it('should call onscroll if the content is getting ascroll event', ( done ) => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: `
          <mdl-layout>
            <mdl-layout-content></mdl-layout-content>
          </mdl-layout>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();

    let layoutDebugElement = fixture.debugElement.query(By.directive(MdlLayoutComponent));
    let layoutComponent = layoutDebugElement.componentInstance;

    let contentEl = fixture.debugElement.query(By.directive(MdlLayoutContentComponent)).nativeElement;

    spyOn(layoutComponent, 'onScroll');

    var scrollEvent = new CustomEvent('scroll');
    contentEl.dispatchEvent(scrollEvent);

    expect(layoutComponent.onScroll).toHaveBeenCalled();

    done();

  });

  it('should activate the first tab if no index is set', ( done ) => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: `
          <mdl-layout>
            <mdl-layout-header></mdl-layout-header>
            <mdl-layout-content>
               <mdl-layout-tab-panel mdl-layout-tab-panel-title="t1"></mdl-layout-tab-panel>
               <mdl-layout-tab-panel mdl-layout-tab-panel-title="t2"></mdl-layout-tab-panel>
            </mdl-layout-content>
          </mdl-layout>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();

    let mdlLayoutComponent: MdlLayoutComponent =
      fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance;

    expect(mdlLayoutComponent.selectedIndex).toBe(0);

    done();

  });

  it('should activate the selected tab if the selectedIndex changed programmatically', ( done ) => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: `
          <mdl-layout [mdl-layout-tab-active-index]="activeIndex">
            <mdl-layout-header></mdl-layout-header>
            <mdl-layout-content>
               <mdl-layout-tab-panel mdl-layout-tab-panel-title="t1"></mdl-layout-tab-panel>
               <mdl-layout-tab-panel mdl-layout-tab-panel-title="t2"></mdl-layout-tab-panel>
            </mdl-layout-content>
          </mdl-layout>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.activeIndex).toBe(0);

    fixture.componentInstance.activeIndex = 1;

    fixture.detectChanges();

    let mdlLayoutComponent: MdlLayoutComponent =
      fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance;

    expect(mdlLayoutComponent.selectedIndex).toBe(1);

    done();

  });

  it('should be possible to listen to chanegs to the active tab', ( done ) => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: `
          <mdl-layout [mdl-layout-tab-active-index]="1" (mdl-layout-tab-active-changed)="tabChanged($event)">
           <mdl-layout-header></mdl-layout-header>
            <mdl-layout-content>
               <mdl-layout-tab-panel mdl-layout-tab-panel-title="t1"></mdl-layout-tab-panel>
               <mdl-layout-tab-panel mdl-layout-tab-panel-title="t2"></mdl-layout-tab-panel>
            </mdl-layout-content>
         </mdl-layout>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();

    let testComponent = fixture.componentInstance;

    let mdlTabsComponent: MdlLayoutComponent =
      fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance;

    expect(mdlTabsComponent.selectedIndex).toBe(1);
    let aDebugElements = fixture.debugElement.queryAll(By.css('a'));

    // select the first tab
    aDebugElements[0].nativeElement.click();

    fixture.detectChanges();

    expect(mdlTabsComponent.selectedIndex).toBe(0);


    expect(testComponent.selectedIndexOutput).toBe(0);

    // click again should change nothing
    aDebugElements[0].nativeElement.click();
    expect(mdlTabsComponent.selectedIndex).toBe(0);

    done();
  });


  it('should be possible to create rich tabs', async(() => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: `
          <mdl-layout>
           <mdl-layout-header></mdl-layout-header>
            <mdl-layout-content>
               <mdl-layout-tab-panel>
                 <mdl-tab-panel-title>
                    <span class="test">Test</span>
                  </mdl-tab-panel-title>
                  <mdl-tab-panel-content>
                    <span class="content">The content</span>
                  </mdl-tab-panel-content>
                </mdl-layout-tab-panel>
            </mdl-layout-content>
         </mdl-layout>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();

    // must have a MdlLayoutHeaderComponent
    let layoutHeader = fixture.debugElement.query(By.directive(MdlLayoutHeaderComponent));
    let titleDebugElement = layoutHeader.query(By.css('.test'));

    expect(titleDebugElement.nativeElement.nodeName).toEqual('SPAN');
  }));

  it('should close the drawer on small screens if closeDrawerOnSmallScreens is called', ( done ) => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: `
          <mdl-layout mdl-layout-fixed-drawer>
            <mdl-layout-header></mdl-layout-header>
            <mdl-layout-drawer></mdl-layout-drawer>
            <mdl-layout-content></mdl-layout-content>
          </mdl-layout>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();
    let layoutComponent = fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance;

    layoutComponent.toggleDrawer();
    fixture.detectChanges();

    let drawer = fixture.debugElement.query(By.directive(MdlLayoutDrawerComponent)).componentInstance;
    expect(drawer.isDrawerVisible).toBe(true);

    // small screen
    layoutComponent.onQueryChange(true);
    fixture.detectChanges();

    expect(layoutComponent.isSmallScreen).toBe(true);

    layoutComponent.closeDrawerOnSmallScreens();
    expect(drawer.isDrawerVisible).toBe(false);

    done();
  });

  it('should set the drawer to null, if the drawer is not a direct child of the layout', (done) => {

    TestBed.overrideComponent(MdlTestLayoutComponent, { set: {
      template: `
          <mdl-layout mdl-layout-fixed-drawer>
            <mdl-layout-header></mdl-layout-header>
            <mdl-layout-content>
               <mdl-layout>
                  <mdl-layout-drawer></mdl-layout-drawer>
               </mdl-layout>
            </mdl-layout-content>
          </mdl-layout>
        ` }
    });
    let fixture = TestBed.createComponent(MdlTestLayoutComponent);
    fixture.detectChanges();
    let layoutComponent = fixture.debugElement.query(By.directive(MdlLayoutComponent)).componentInstance;

    fixture.detectChanges();

    expect(layoutComponent.hasDrawer()).toBe(false);


    done();
  });
});


@Component({
  selector: 'test-layout',
  template: 'replaced by the test'
})
class MdlTestLayoutComponent {

  public activeIndex = 0;

  public selectedIndexOutput: number;

  public tabChanged($event) {
    this.selectedIndexOutput = $event.index;
  }
}
