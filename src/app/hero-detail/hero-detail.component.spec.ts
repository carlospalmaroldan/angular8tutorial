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
  let heroSpy;
  let heroSpyUpdate;

  beforeEach(async(() => {
    const spiderman:Hero ={id: 1,name:'spiderman' };

    const heroService = jasmine.createSpyObj('HeroService', ['getHero','updateHero']);
    heroSpy=heroService.getHero.and.returnValue( of(spiderman) );
    

    heroSpyUpdate = heroService.updateHero.and.returnValue(of(spiderman));

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
    expect(heroSpy.calls.any()).toBe(true);
  })

  it('should update hero ',()=>{
    component.save();
    expect(heroSpyUpdate.calls.any()).toBe(true);
  })

});
