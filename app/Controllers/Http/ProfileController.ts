// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from "App/Models/Profile"
import User from "App/Models/User"
import UserProfileValidator from "App/Validators/UserProfileValidator"

export default class ProfileController {
    public async showProfile({auth,response}){
        try{
            const profile=await Profile.findBy("user_id",auth.user.id)
            const details={}

            details.name=profile.name
            details.email=auth.user.email
            details.gender=profile.gender
            details.dob=profile.dob

            return details
            
        }catch(err){
            return response.send({ message: "Invalid User_id given!" });
        }
    }

    public async create({request,response,auth}){
        try{
            const payload=await request.validate(UserProfileValidator)
            payload.user_id=auth.user.id

            return Profile.create(payload)
        }catch(err){
            return response.send({ message: "Profile creation failed!" });
        }
    }

    public async update({auth,request,response}){
        try{
            const payload=await request.validate(UserProfileValidator)
            await Profile.query().where("user_id", auth.user.id).update(payload);
            return Profile.findBy("user_id",auth.user.id)
        }catch(err){
            return response.send({ message: "Profile updation failed!" });
        }
    }

    public async delete({params,response}){
        
        const profile=await Profile.findBy("mobile",params.mobile)
        const user=await User.findBy("id",profile?.userId)

        if(profile){
            await profile.delete()
            await user?.delete()
            return response.send({ message: "Profile and User deleted!" });
        }
        
        return response.send({ message: "Wrong mobile number!" });
    }

}
