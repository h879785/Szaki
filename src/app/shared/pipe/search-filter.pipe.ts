import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(users: User[], searchText: string ):  any{
    if(!users){
      return [];
    }
    if(!searchText){
      return users;
    }
    searchText = searchText.toLowerCase();

    return users.filter(user =>{
      return (
        user.name?.firstname?.toLocaleLowerCase().includes(searchText) ||
        user.name?.lastname?.toLocaleLowerCase().includes(searchText)
      )
    })

  }

}
