import { OpenchirpWebsitePage } from './app.po';

describe('openchirp-website App', function() {
  let page: OpenchirpWebsitePage;

  beforeEach(() => {
    page = new OpenchirpWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
