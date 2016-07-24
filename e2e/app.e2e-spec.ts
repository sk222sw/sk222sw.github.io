import { BtaPage } from './app.po';

describe('bta App', function() {
  let page: BtaPage;

  beforeEach(() => {
    page = new BtaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
