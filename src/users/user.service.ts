import { Injectable, Scope } from "@nestjs/common";

// Scope.Default for injectable means that the injectable will be a singleton if
// it is shared among multiple classes->we are leaving the instantiation of the modules to Nest
@Injectable({scope:Scope.DEFAULT})
export class UserService
{
    users=[];

    getAllUsers()
    {
        return this.users;
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