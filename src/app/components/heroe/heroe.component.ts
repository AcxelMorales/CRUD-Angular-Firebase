import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Heroe from 'src/app/models/Heroe';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent {

  heroe: Heroe = {
    nombre: '',
    casa: 'Marvel',
    bio: ''
  };
  id: any;

  key: string;
  nuevo: boolean = false;
  boton: string = 'Guardar'

  constructor(private _service: HeroesService, private router: Router, private active: ActivatedRoute) {
    this.getParams();
  }

  getParams() {
    this.active.params.subscribe(
      parametros => {
        this.key = parametros['id'];
        if (this.key !== 'new') {
          this.boton = 'Actualizar';
          this._service.getHeroe(this.key)
            .subscribe(heroe => this.heroe = heroe
              , err => console.log(err))
        }
      },
      err => console.log(err)
    );
  }

  guardar() {
    if (this.key === 'new') {
      this._service.postHeroe(this.heroe)
        .subscribe(
          heroes => {
            this.id = heroes;
            this.id = this.id.name;
            this.router.navigate(['/heroe', this.id]);
          },
          err => console.log(err)
        );
    } else {
      this._service.putHeroe(this.heroe, this.key)
        .subscribe(
          data => this.router.navigate(['/']),
          err => console.log(err)
        );
    }
  }

  reset(forma): void {
    this.router.navigate(['/heroe', 'new']);
    forma.reset({
      casa: 'Marvel'
    });
    this.boton = 'Guardar';
  }

}
