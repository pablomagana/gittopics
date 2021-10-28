import { Injectable } from '@angular/core';
import { Apollo , gql } from 'apollo-angular';


const GET_QUERY = gql`
query ($topicName: String!, $limit: Int!) {
  topic(name: $topicName) {
    repositories(first: $limit, orderBy: {field: STARGAZERS, direction: DESC}) {
      nodes {
        name
        description
        stargazerCount
      }
    }
  }
}`

@Injectable({
  providedIn: 'root'
})
export class GraphqlGithubService {
  limit: number= 10;

  constructor(private apollo: Apollo){}


  public getRepositoriesDataByTopic(topicName:String = 'flutter'){
    return this.apollo.watchQuery<any>({
      query:GET_QUERY,
      variables:{
        "topicName": topicName,
        "limit":10
      }
    }).valueChanges;
  }
}
