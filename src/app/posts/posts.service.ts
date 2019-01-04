import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient
  ){}

  getPosts() {
    this.http
    .get<{message:string, posts:any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      //Estas lineas suoer rebuscadas son para transformar el _id que viene del back en el id de angular
      return postData.posts.map(post =>{
        return {
          title: post.title,
          content: post.content,
          id: post._id,
        };
      });
    }))
    .subscribe((posts)=>{
      this.posts = posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return {...this.posts.find(p => p.id === id)};
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message:string,postId:string }>('http://localhost:3000/api/posts', post)
    .subscribe((responseData)=>{
      const postId = responseData.postId
      post.id = postId;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  updatePost(id:string, title: string, content: string){
      const post : Post = {id:id, title:title, content:content};
      this.http.put('http://localhost:3000/api/posts/' + id, post)
      .subscribe((response)=>{
        console.log(response);
      });
  }

  deletePost(postId:string){
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(()=>{
      this.posts = this.posts.filter(post => post.id !== postId);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
