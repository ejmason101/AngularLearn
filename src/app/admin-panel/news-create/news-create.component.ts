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


  
  constructor(
    public newsService: NewsService,
     public route: ActivatedRoute,
     public authService: AuthService
  ) {}

  // runs when component is rendered
  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    // determingin if in 'create' or 'edit' mode
    // // executed whenever the url params change
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('todoId')) {
        // extract id and use, in edit mode
        this.mode = 'edit';
        this.newsId = paramMap.get('todoId');
        console.log('editMode todo-create deadline param:');
        
        this.isLoading = true;
        // this.todo = this.todosService.getTodo(this.todoId).subscribe();
        this.newsService.getNewsArticle(this.newsId).subscribe(newsArticles => {
          // stop showing loading here
          console.log("todo-create ngOnInit todo-create in edit mode:  " + newsArticles);
          console.log(newsArticles);
          this.isLoading = false;
          this.news = {
            id: newsArticles._id,
            title: newsArticles.title,
            content: newsArticles.content,
            postedDate: newsArticles.postedDate
            // TODO ADD postedDate here, then get the loadAll working in news-view
          };
        })

      } else {
        // there is no 'newsId' in the url params
        this.mode = 'create';
        this.newsId = null;
      }
    });
  }
  
  onSaveNews(form: NgForm) {
    if(form.invalid) {
        return;
    }

    this.isLoading = true;
    if (this.mode == 'create') {
        console.log('creating new News Article');
        this.newsService.addNewsArticle(form.value.title, form.value.content);
    }


    form.resetForm();

  }


  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
