import { DailyOldNewsPage } from './app.po';

describe('daily-old-news App', () => {
  let page: DailyOldNewsPage;

  beforeEach(() => {
    page = new DailyOldNewsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
