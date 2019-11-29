import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comments, Comment } from 'src/app/interfaces/config-interface';
import { COMMENT } from 'src/app/constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getListComment(slug: string): Observable<Comments> {
    return this.httpClient.get<Comments>(COMMENT.getComments + `/${slug}/comments`);
  }

  addComment(slug: string, value: any): Observable<Comment> {
    return this.httpClient.post<Comment>(COMMENT.getComments + `/${slug}/comments`, {
      "comment": {
        "body": value
      }
    })
  }

  deleteComment(slug: string, id: number): Observable<Comment> {
    return this.httpClient.delete<Comment>(COMMENT.getComments + `/${slug}/comments/${id}`);
  }

}
