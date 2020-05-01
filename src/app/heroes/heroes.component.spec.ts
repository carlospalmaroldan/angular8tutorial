import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  const spiderman:Hero ={id: 1,name:'spiderman' };
  beforeEach(async(() => {

    
    const batman: Hero = {id: 2,name:'batman'};
    const heroes=[spiderman,batman];
    const talker: Hero={id:3,name:'talker'};
    const heroService = jasmine.createSpyObj('HeroService', ['getHeroes','addHero','deleteHero']);
    const messageService = jasmine.createSpyObj('MessageService',['add']);

    heroService.getHeroes.and.returnValue( of(heroes) );
    heroService.addHero.and.returnValue(of(talker));
    heroService.deleteHero.and.returnValue(of(spiderman));


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
  
  it('should call add service',()=>{
    expect(component.heroes.length).toBe(2);
    const talker:Hero = {id:3,name:'talker'};
    component.add('talker');
    expect(component.heroes.length).toBe(3);
  });

  it('should call delete service',()=>{
    expect(component.heroes.length).toBe(2);
    component.delete(spiderman);
    expect(component.heroes.length).toBe(1);

  });


});
