import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Repository } from 'src/app/models/repository';
import { GraphqlGithubService } from 'src/app/services/graphql-github.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnDestroy{
  loadingData: boolean = false;
  repositories: Repository[] = [];
  topic: string = '';
  isFindError:boolean = false;

  grapshSubscription:Subscription=new Subscription();

  get hasRepositories(){
    return this.repositories.length>0;
  }

  constructor(private readonly graphqlService:GraphqlGithubService) { }
  
  findRepositories(){
    this.loadingData=true;
    this.grapshSubscription = this.graphqlService.getRepositoriesDataByTopic(this.topic).subscribe(data=>{
      this.repositories = data.data.topic?.repositories.nodes || [];
      this.loadingData = data.loading;
      if(data.errors?.length){
        this.isFindError = true;
        setTimeout(() => {
          this.isFindError = false;
        }, 5000);
      }
    });
  }

  ngOnDestroy(){
    if(this.grapshSubscription){
      this.grapshSubscription.unsubscribe();
    }
  }

}
