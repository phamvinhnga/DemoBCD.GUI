import { EMTemplatePage } from './app.po';

describe('EM App', function() {
  let page: EMTemplatePage;

  beforeEach(() => {
    page = new EMTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
