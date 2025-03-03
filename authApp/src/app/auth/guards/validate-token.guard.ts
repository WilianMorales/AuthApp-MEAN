import { Injectable } from '@angular/core';
import { Router, CanMatch } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanMatch {
  constructor(private _authService: AuthService, private _router: Router) {}

  canMatch(): Observable<boolean> | boolean {
    return this._authService.validarToken().pipe(
      map(valid => {
        if (!valid) {
          this._router.navigateByUrl('/auth'); // Redirige al módulo de autenticación si no es válido
        }
        return valid; // Devuelve el estado de validación
      })
    );
  }
}
