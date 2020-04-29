import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { HeroSearchComponent } from './hero-search.component';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {

    const spiderman:Hero ={id: 1,name:'spiderman' };
    const heroService = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    heroService.searchHeroes.and.returnValue( of(spiderman) );

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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
