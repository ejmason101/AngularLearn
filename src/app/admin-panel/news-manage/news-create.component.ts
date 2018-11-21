// create blueprint for an object, never instantiated, angular will use and inst
import { Component, OnInit, ModuleWithComponentFactories, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';

import { ActivatedRoute, ParamMap } from '@angular/router';

import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { News } from 'src/app/home/news.model';
import { NewsService } from 'src/app/home/news.service';


// attach to class to tell angular this is a component1
@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit, OnDestroy {
  enteredContent = "";
  enteredTitle = "";

  news: News;
  isLoading = false;
  private mode = 'create';
  private newsId: string;
  private authStatusSub: Subscription;
  private newsSub: Subscription;

  public newsList: News[] = [];

  
  constructor(
    public newsService: NewsService,
     public route: ActivatedRoute,
     public authService: AuthService,
  ) {}

  // runs when component is rendered
  ngOnInit() {
    this.newsService.getNews(); // get the news articles

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }      
    );
    
    // Get and load the news articles to the view state
    console.log("news items:");
    this.newsSub = this.newsService.getNewsUpdateListener()
        .subscribe((news: News[]) => {
            console.log('news subscription updated with new values!');
            this.isLoading = false;
            this.newsList = news;
    });
        
    console.log(this.news); //has been undefinded?

    // determingin if in 'create' or 'edit' mode
    // // executed whenever the url params change
    // this.route.paramMap.subscribe((paramMap: ParamMap) => {
    //   if (paramMap.has('todoId')) {
    //     // extract id and use, in edit mode
    //     this.mode = 'edit';
    //     this.newsId = paramMap.get('todoId');
    //     console.log('editMode todo-create deadline param:');
        
    //     this.isLoading = true;
    //     // this.todo = this.todosService.getTodo(this.todoId).subscribe();
    //     this.newsService.getNewsArticle(this.newsId).subscribe(newsArticles => {
    //       // stop showing loading here
    //       console.log("todo-create ngOnInit todo-create in edit mode:  " + newsArticles);
    //       console.log(newsArticles);
    //       this.isLoading = false;
    //       this.news = {
    //         id: newsArticles._id,
    //         title: newsArticles.title,
    //         content: newsArticles.content,
    //         postedDate: newsArticles.postedDate
    //         // TODO ADD postedDate here, then get the loadAll working in news-view
    //       };
    //     })

    //   } else {
    //     // there is no 'newsId' in the url params
    //     this.mode = 'create';
    //     this.newsId = null;
    //   }
    // });
  }
  
  onSaveNews(form: NgForm) {
    console.log('onSaveNews() --> saving news article');
    if(form.invalid) {
        return;
    }

    this.isLoading = true;

    if (this.mode == 'create') {
        console.log('creating new News Article');
        this.newsService.addNewsArticle(form.value.title, form.value.content);
        form.resetForm();
    } else if(this.mode == 'edit') {
      console.log('updating old News Article');
      this.newsService.updateNewsArticle(
        this.news.id,
        form.value.title,
        form.value.content
      );
      this.mode = 'create';
      this.news = null;
      this.newsId = null;
      form.resetForm();
    }

  }


    // FOR ADMIN-PANEL VIEW/EDIT NEWS POSTS

    loadNewsForEdit(id: string){
      // change mode --> 'edit'
      // search newslist for article with id == this
      // set news to the news artcile to edit
      console.log('loading news for edit');
      this.mode = 'edit';
      let editNewsIndex = this.newsList.findIndex(n => n.id === id);
      this.news = this.newsList[editNewsIndex];
      this.newsId = this.news.id; 
  }

  onDeleteNews(form: NgForm) {
    // only have the option if the article is in edit mode
    // use this.news.id and send that to newsService to delete it
    console.log('current news id in edit box:');
    console.log(this.newsId);
    if(!this.newsId) {
      return;
    }
    else {
      this.newsService.deleteNewsArticle(this.newsId);
      form.resetForm();
    }
    
  
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
