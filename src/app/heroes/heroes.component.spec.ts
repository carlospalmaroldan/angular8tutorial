import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {

    const spiderman:Hero ={id: 1,name:'spiderman' };
    const batman: Hero = {id: 2,name:'batman'};
    const heroes=[spiderman,batman];

    const heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    const messageService = jasmine.createSpyObj('MessageService',['add']);

    heroService.getHeroes.and.returnValue( of(heroes) );


    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      providers: [
        {
           provide: MessageService,
           useValue: messageService
        },
        {
          provide: HeroService,
          useValue: heroService
        }
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
