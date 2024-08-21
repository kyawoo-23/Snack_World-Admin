import { TestBed } from '@angular/core/testing';
import { authInterceptor } from './auth.interceptor';
import { HttpInterceptorFn } from '@angular/common/http';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
