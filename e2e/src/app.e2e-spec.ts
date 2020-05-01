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

  it('should go to dashboard',() =>{
    page.navigateTo();
    element(by.linkText('Dashboard')).click();
    expect(element(by.tagName('app-root app-dashboard')).all(by.tagName('a')).get(0).getText()).toBe('Narco');
    expect(element(by.tagName('app-root app-dashboard')).all(by.tagName('a')).get(1).getText()).toBe('Bombasto');
    expect(element(by.tagName('app-root app-dashboard')).all(by.tagName('a')).get(2).getText()).toBe('Celeritas');
    expect(element(by.tagName('app-root app-dashboard')).all(by.tagName('a')).get(3).getText()).toBe('Magneta');
  });

  it('should search for a hero',()=>{
    page.navigateTo;
    element(by.id('search-box')).sendKeys('s');
    
    browser.sleep(1000);
    expect( element(by.tagName('app-root app-dashboard app-hero-search')).all(by.tagName('a')).get(0).getText()).toBe('Bombasto');
    expect( element(by.tagName('app-root app-dashboard app-hero-search')).all(by.className('search-result')).all(by.tagName('a')).get(1).getText()).toBe('Celeritas');
  });

  it('should show initial messages',()=>{
    page.navigateTo();
    expect(element(by.tagName('app-root app-messages div')).all(by.tagName('div')).get(0).getText()).toBe('HeroService: fetched heroes');
  });

  it('should show two messages after clicking on heroes',()=>{
    page.navigateTo();
    element(by.linkText('Heroes')).click();
    expect(element(by.tagName('app-root app-messages div')).all(by.tagName('div')).get(0).getText()).toBe('HeroService: fetched heroes');
    expect(element(by.tagName('app-root app-messages div')).all(by.tagName('div')).get(1).getText()).toBe('HeroService: fetched heroes');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
