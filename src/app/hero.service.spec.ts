import { TestBed, inject ,getTestBed} from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClientModule } from '@angular/common/http';
import {Hero } from './hero';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { exec } from 'child_process';


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
     httpMock.verify();
  });

  //NO response when performing a PUT request
  it('should update a hero',()=>{
     const mrincredible: Hero = {id:1,name:'mrincredible'};
     service.updateHero(mrincredible).subscribe(response=>expect(response).toEqual({}));
     const req = httpMock.expectOne('api/heroes');
     expect(req.request.method).toEqual('PUT');
     expect(req.request.body).toEqual(mrincredible);
     req.flush({});
     httpMock.verify();
  });

  
  it('should create a hero',()=>{
    const mrincredible: Hero = {id:1,name:'mrincredible'};
    service.addHero(mrincredible).subscribe(response => expect(response).toEqual(mrincredible));
    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mrincredible);
    req.flush(mrincredible);
    httpMock.verify();
  });
  

  it('should delete a hero',()=>{
    const mrincredible: Hero = {id:1,name:'mrincredible'};
    service.deleteHero(1).subscribe(response => expect(response).toEqual(mrincredible));
    const req = httpMock.expectOne('api/heroes/1');
    expect(req.request.method).toEqual('DELETE');
    req.flush(mrincredible);
    httpMock.verify();
  })

  it('should search for a hero and find a match',()=>{
    const batman: Hero = {id:1,name:'batman'};
    const heroes = [batman];
    service.searchHeroes('batman').subscribe(response => expect(response.length).toBe(1));
    const req = httpMock.expectOne('api/heroes/?name=batman');
    expect(req.request.method).toEqual('GET');
    req.flush(heroes);
    httpMock.verify();
  });

  it('should be able to find several matches while searching',() =>{
    const batman: Hero = {id:1, name:'batman'};
    const batgirl: Hero = {id:2, name: 'batgirl'};
    const heroes: Hero[] = [batman,batgirl];
    service.searchHeroes('bat').subscribe(response => {
      expect(response.length).toBe(2);
      expect(response[0].name).toBe('batman');
      expect(response[1].name).toBe('batgirl')
     });
     const req = httpMock.expectOne('api/heroes/?name=bat');
     expect(req.request.method).toEqual('GET');
     req.flush(heroes);
     httpMock.verify();
  });

});
