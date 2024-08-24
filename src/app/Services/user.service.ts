import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private jwtHelper: JwtHelperService = new JwtHelperService();
    private authState = new BehaviorSubject<boolean>(this.hasToken());

    baseURL: string = "http://localhost:5016/api/user";

    constructor(private http: HttpClient) { }

    signUp(newUser: User) {
        return this.http.post(`${this.baseURL}/register`, newUser);
    }

    private hasToken(): boolean {
        const token = localStorage.getItem('myPostToken');
        return !!token && !this.jwtHelper.isTokenExpired(token);
    }

    getAuthState(): Observable<boolean> {
        return this.authState.asObservable();
    }

    login(emailOrUsername: string, password: string): Observable<any> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('emailOrUsername', emailOrUsername);
        queryParams = queryParams.append('password', password);
      
        return this.http.get(`${this.baseURL}/login`, { params: queryParams, responseType: 'text' })
          .pipe(tap((response: any) => {
            localStorage.setItem('myPostToken', response);
            this.authState.next(true);
          }));
      }

    logout(): void {
        localStorage.removeItem('myPostToken');
        this.authState.next(false);
    }

    getCurrentUser(): User | null {
        const token = localStorage.getItem('myPostToken');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            const user: User = {
                userId: decodedToken.sub,
                email: decodedToken.email,
                userName: decodedToken.unique_name,
                firstName: decodedToken.firstName,
                lastName: decodedToken.lastName
            } as any;
            return user;
        } else {
            return null;
        }
    }

    getUserById(userId: string): Observable<User> {
        return this.http.get<User>(`${this.baseURL}/profile/${userId}`);
    }

}