import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from '../hero';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
  RouterTestingModule
} from '@angular/router/testing';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    const spiderman:Hero ={id: 1,name:'spiderman' };

    const heroService = jasmine.createSpyObj('HeroService', ['getHero']);
    heroService.getHero.and.returnValue( of(spiderman) );


    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports: [ RouterTestingModule],
      providers: [
        {
            provide: HeroService,
            useValue: heroService
        }
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
 
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get hero using id on url',() =>{
    expect(component.hero.name).toBe('spiderman');
  })
});
