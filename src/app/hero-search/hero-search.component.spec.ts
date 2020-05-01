import { async, ComponentFixture, TestBed,getTestBed, async as realAsync} from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { HeroSearchComponent } from './hero-search.component';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';

function setTimeoutPromise(milliseconds: number): Promise<void> {
  return new Promise((resolve) => { 
    setTimeout(resolve, milliseconds);
  });
}

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let service: HeroService;
  let injector: TestBed;
  let heroSpy;
  let element : HTMLElement;;
  beforeEach(async(() => {

    const spiderman:Hero ={id: 1,name:'spiderman' };
    const scyteman:Hero ={id: 1, name:'scyteman'};
    const heroService = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    const heroArray = [spiderman,scyteman];
    heroSpy=heroService.searchHeroes.and.returnValue( of(heroArray) );

    TestBed.configureTestingModule({


      declarations: [ HeroSearchComponent ],
      providers: [
        {
          provide:HeroService,
          useValue: heroService
        }
      ]   
    })
    .compileComponents();
    injector = getTestBed();
    service = injector.get(HeroService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

 /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */

  //we need to test that the service was called
  //problem is that the html is the one subscribing
  //using | async
  it('should trigger search when given input', realAsync(async () => {
    component.search('s');
    await setTimeoutPromise(1000);
    fixture.detectChanges();
    console.log(element.getElementsByTagName('a'));
    expect(element.getElementsByTagName('a')[0].innerHTML).toEqual(' spiderman ');
  }));

});
