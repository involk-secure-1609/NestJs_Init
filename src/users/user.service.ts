import { Inject, Injectable, Scope } from "@nestjs/common";
import { Cache } from "@nestjs/cache-manager";
// Scope.Default for injectable means that the injectable will be a singleton if
// it is shared among multiple classes->we are leaving the instantiation of the modules to Nest
@Injectable({scope:Scope.DEFAULT})
export class UserService
{
    constructor(@Inject('CACHE_MANAGER') private cacheManager:Cache){}
    users=[];

    async getAllUsers()
    {
        const cachedData=await this.cacheManager.get('users');
        if(cachedData)
        {
            console.log('Got data from cache');
            return cachedData;
        }
        const usersData=await this.retrieveUsersFromDb();
        await this.cacheManager.set('users',usersData,60000);
        return usersData;
    }

    async retrieveUsersFromDb()
    {
        return new Promise((resolve)=>{
            setTimeout(()=>{
                const users=[
                    {name:'Kevin',age:21,gender:'M'},
                    {name:'Kevin',age:22,gender:'M'},
                    {name:'Kevin',age:25,gender:'M'},
                ];
                resolve(users);
            },1000);
        });
    } 
    getLimitedUsers(limit: number)
    {
        const newUsers = []
        const size=Math.min(this.users.length,limit)
        for(let i=0;i<size;i++)
        {
            newUsers.push(this.users[i]);
        }

        return newUsers;
    }

    addUser(user:any)
    {
        this.users.push(user);
        return user;
    }
    
}