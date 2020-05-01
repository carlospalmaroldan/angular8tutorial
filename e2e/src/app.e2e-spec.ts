import { AppPage } from './app.po';
import { browser, logging, element ,by} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('angular-tour-of-heroes app is running!');
  });

  it('should go to heroes list', () =>{
    page.navigateTo();
    element(by.linkText('Heroes')).click();
    expect(element(by.tagName('app-root app-heroes h2')).getText()).toBe('My Heroes');
    expect(element(by.tagName('app-root app-heroes')).all(by.tagName('a')).get(0).getText()).toBe('11 Dr Nice');
    expect(element(by.tagName('app-root app-heroes')).all(by.tagName('a')).get(1).getText()).toBe('12 Narco');
    expect(element(by.tagName('app-root app-heroes')).all(by.tagName('a')).get(9).getText()).toBe('20 Tornado');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
