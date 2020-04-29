import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../hero.service';
import { Observable, of } from 'rxjs';
import { Hero } from '../hero';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
 
  beforeEach(async(() => {

    const spiderman:Hero ={id: 1,name:'spiderman' };
    const batman: Hero = {id: 2,name:'batman'};
    const greenLantern: Hero = {id: 3,name:'greenLantern'};
    const wonderWoman: Hero = {id: 4,name:'wonderWoman'}
    const flash : Hero ={id: 5, name: 'flash'};
    const superman: Hero = {id: 6, name: 'superman'};
    const heroes=[spiderman,batman,greenLantern,wonderWoman,flash,superman];

    const heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);

    heroService.getHeroes.and.returnValue( of(heroes) );

    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch 4 heroes',() =>{
    console.log(component.heroes);
    expect(component.heroes.length).toBe(4);
    expect(component.heroes[0].name).toBe('batman');
    expect(component.heroes[3].name).toBe('flash');
  });

});
