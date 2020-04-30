import { TestBed, inject ,getTestBed} from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClientModule } from '@angular/common/http';
import {Hero } from './hero';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { of } from 'rxjs';


describe('HeroService', () => {
  let injector: TestBed;
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HeroService]
    });
    injector = getTestBed();
    service = injector.get(HeroService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should get heroes',() => {

        const spiderman : Hero={id: 1, name: 'spiderman'}; 
        const ironman : Hero = {id: 1, name: 'ironman'};
        const dummyHeroes = [spiderman,ironman];
        

         service.getHeroes().subscribe(heroList =>{
           expect(heroList.length).toBe(2);
         });


         const req = httpMock.expectOne('api/heroes');
         expect(req.request.method).toEqual('GET');
        
         
         req.flush(dummyHeroes); 
        
         httpMock.verify();
      } 
  );

  it('should get a single hero with id',()=>{

     const silkwoman: Hero = {id:1,name: 'silkwoman'};
     service.getHero(1).subscribe(hero => expect(hero.name).toBe('silkwoman'));
     
     const req = httpMock.expectOne('api/heroes/1');
     expect(req.request.method).toEqual('GET');

     req.flush(silkwoman);
  });

;

});
