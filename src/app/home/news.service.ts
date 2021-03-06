import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject } from 'rxjs';
import { map } from 'rxjs/operators'

import { Router } from "@angular/router";

// import { Todo } from './todo.model';
import { AuthService } from '../auth/auth.service';
import { News } from './news.model';
import { strictEqual } from 'assert';

// allows angjular to see at the root level, and it only creates 1 instance in the entire app
// there would be multiple copies of the todos else
@Injectable({providedIn: 'root'})
export class NewsService {
    
    // holds the list of Todos recieved from the server
    private news: News[] = [];

    /*
        Services, how angular achieves multicasting
            multicasting is forwarding 'notifications'
            from one obseervable to one or more destination observers
    
    
    */

    private newsUpdated = new Subject<News[]>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}

    

    // ----------- GETs HERE --> Single and All
    getNews(){
        this.http
            .get<{message: string, news: any}>('http://localhost:3000/api/news')
            .pipe(map((newsData) => {
                console.log("newsData:");
                console.log(newsData);
                return newsData.news.map(newsArticle => {
                    let postedDate = new Date(newsArticle.postedDate);
                    return {
                        id: newsArticle._id,
                        title: newsArticle.title,
                        content: newsArticle.content,
                        postedDate: postedDate
                    };
                });
            }))
            .subscribe((transformedNews) => {
                console.log("News: ");
                console.log(transformedNews);

                // set the news stored in instance of this service
                this.news = transformedNews;
                // push out copy of the news to all listening components
                this.newsUpdated.next([...this.news]);
            })
    }

    getNewsArticle(id: string) {
        return this.http.get<{ 
            _id: string;
            title: string;
            content: string;
            postedDate: string;
            }>(
            'http://localhost:3000/api/todos/' + id
            );
    }


    getNewsUpdateListener(){
        return this.newsUpdated.asObservable();
    }

    // ------------ POSTING NEWS ARTICLE
    addNewsArticle(
        title: string,
        content: string
    ) {
        
        var today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		
		if(dd<10) {
			 dd = Number('0'+dd);
		} 
		
		if(mm<10) {
			 mm = Number('0'+mm);
		}
		let postDate = mm + '/' + dd + '/' + yyyy;
	 
        console.log("news article date: ");
        console.log(postDate);
        const newNews: News = {
            id: null,
            title: title,
            content: content,
            postedDate: postDate
        }
        console.log('addNewsArticle() --> adding single news article');
        console.log(newNews);

        // make the http request to the backen
        this.http
            .post<{message: string, newsId: string}>('http://localhost:3000/api/news', newNews)
            .subscribe((responseData) => {
                // data that the server returns from this post request
                const id = responseData.newsId;
                newNews.id = id;
                this.news.push(newNews); // push the new news article WITH db id to the service list

                // give updated data to all components that are listenening
                this.newsUpdated.next([...this.news]);
                // TODO MAYBE ADD REDIRECT HERE?
            });
    }
    updateNewsArticle(
        id: string,
        title: string,
        content: string) {
            let updateDate = new Date().toString();
            // Update a specific article in the DB
            const updateNews: News = {
                id: id,
                title: title,
                content: content,
                postedDate: updateDate
            }
            console.log("updateNewsArticle() --> updating single news article");
            console.log(updateNews);
        
            this.http
            .put("http://localhost:3000/api/news/" + id, updateNews)
            .subscribe(response => {
                const updatedNews = [...this.news];
                const oldNewsIndex = updatedNews.findIndex(n => n.id === id);
                // console.log("setting this: ");
                // console.log(updatedNews[oldNewsIndex]);
                // console.log("to updated value: ");
                // console.log(updateNews);
                updatedNews[oldNewsIndex] = updateNews;
                this.news = updatedNews;
                this.newsUpdated.next([...this.news]); // sending the correct dataset to all subscribers
                
            })
        
        }


        // DELETE news article
    deleteNewsArticle(newsId: string) {
        var urlString = "http://localhost:3000/api/news/" + newsId;
        console.log("deleting post --> ");
        console.log(urlString);
        this.http.delete(urlString)
            .subscribe(() => {
                console.log('http delete request finished');
                // keep the elements that are not the same id
                const updatedNews = this.news.filter(newsArt => newsArt.id !== newsId );
                this.news = updatedNews;
                console.log('updated news list: ');
                console.log(this.news);

                this.newsUpdated.next([...this.news]);
            })
    };

    

}