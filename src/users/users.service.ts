import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

    private Users: Array<CreateUserDto> = [
        {user_name: "Don1ongo", password: "123321", access_level: "Admin"},
        {user_name: "Samra", password: "987789", access_level: "Admin"}
    ]

    getUsers(){
        return this.Users.map(({ user_name, access_level }) => ({ user_name, access_level }));
    }

    getUser(user_name: string){
        let user =  this.Users.find(Usr => Usr.user_name === user_name);

        if(!user) {
            throw new Error('User not found');
        }

        return user;
    }

    update_user(user_name: string, UpdatedUserData: UpdateUserDto){

        this.Users = this.Users.map( Usr => {
            if(Usr.user_name === user_name){
                return {...Usr, ...UpdatedUserData};
            }

            return Usr
        })

        return this.getUsers()
    }

    adduser(user: CreateUserDto){

        let Trigger:boolean = true;

        this.Users.map(nt =>{
            nt.user_name === user.user_name ? Trigger = false: null
        })

        Trigger? this.Users.push({user_name: Date.now(), ...user}): null;
    }

    removeUser(user_name: string){
        let removedUser = this.getUser(user_name)
        this.Users = this.Users.filter(user => user.user_name !== user_name)

        return removedUser
    }

    confirm_user(user_name: string, password: string){
        let user = this.Users.find(user => user.user_name === user_name)

        if(user.password === password){
            return true
        }else{
            return false
        }
    }
}
