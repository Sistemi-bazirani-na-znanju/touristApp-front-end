// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Message } from '../model/message';
// import { map } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class SocketService {
//   socketUrl: string = "http://localhost:8080/api/socket";

//   constructor(private http: HttpClient) { }

//   post(data: Message) {
//     return this.http.post<Message>(this.socketUrl, data)
//       .pipe(map((data: Message) => { return data; }));
//   }


// }