// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from "App/Models/Profile"
import User from "App/Models/User"
import UserProfileValidator from "App/Validators/UserProfileValidator"
import {DateTime} from "luxon"

export default class ProfileController {

    public async view(){
        const profiles=await Profile.all()
        return profiles
    }

    public async showProfile({auth}){
        
        try{
            const profile=await Profile.findBy("user_id",auth.user.$attributes.id)
            const details={}

            const dob=profile.$attributes.dob.c.year+"-"+profile.$attributes.dob.c.month+"-"+profile.$attributes.dob.c.day
            const date = new Date(dob);
            
            const year = date.getFullYear();
            const month = date.toLocaleString('default', { month: 'short' });
            const day = date.getDate();
            const formattedDate = `${year} ${month} ${day}`;

            details.name=profile.$attributes.name
            details.email=auth.user.$attributes.email
            details.gender=profile.$attributes.gender
            details.dob=formattedDate

            return details
        }catch(err){
            return "Some error!"
        }
    }

    public async create({request,response,auth}){
        try{
            const payload=await request.validate(UserProfileValidator)
            payload.user_id=auth.user.$attributes.id

            const profile=await Profile.create(payload)
            return {"Profile created":profile}

        }catch(err){
            response.badRequest(err.messages)
        }
    }

    public async update({auth,request,response}){
        try{
            const payload=await request.validate(UserProfileValidator)
            await Profile.query().where("user_id", auth.user.$attributes.id).update(payload);
            return "User Updated!"

        }catch(err){
            response.badRequest(err.messages)
        }
    }

    public async delete({auth}){
        const profile=await Profile.findBy("user_id",auth.user.$attributes.id)
        const user=await User.findBy("id",auth.user.$attributes.id)
        
        if(profile){
            profile.delete()
            user?.delete()
            return "Profile and User deleted!"
        }
        
        return "Invalid mobile"
    }

}
