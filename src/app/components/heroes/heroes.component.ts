import { Component } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent {

  heroes: any[] = [];
  loading: boolean = true;

  constructor(private _service: HeroesService) {
    this._service.getHeroes().subscribe(
      heroes => {
        this.heroes = heroes;
        this.loading = false;
      },
      err => console.log(err)
    );
  }

  eliminar(key: string) {
    this._service.deleteHeroe(key)
      .subscribe(
        resp => {
          if (resp) {
            console.error(resp);
          } else {
            delete this.heroes[key];
          }
        },
        err => console.log(err)
      );
  }

}
