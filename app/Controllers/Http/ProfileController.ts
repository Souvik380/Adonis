// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from "App/Models/Profile"
import User from "App/Models/User"
import UserProfileValidator from "App/Validators/UserProfileValidator"

export default class ProfileController {
    public async showProfile({auth}){
        try{
            const profile=await Profile.findBy("user_id",auth.user.id)
            const details={}

            const dob=profile.dob.year+"-"+profile.dob.month+"-"+profile.dob.day
            const date = new Date(dob);

            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);

            details.name=profile.name
            details.email=auth.user.email
            details.gender=profile.gender
            details.dob=formattedDate

            return details
        }catch(err){
            return "Invalid User_id given!"
        }
    }

    public async create({request,response,auth}){
        try{
            const payload=await request.validate(UserProfileValidator)
            payload.user_id=auth.user.id

            const profile=await Profile.create(payload)
            return {"Profile created":profile}

        }catch(err){
            response.badRequest(err.messages)
        }
    }

    public async update({auth,request,response}){
        try{
            const payload=await request.validate(UserProfileValidator)
            await Profile.query().where("user_id", auth.user.id).update(payload);
            const user=await Profile.findBy("user_id",auth.user.id)
            return {"Updated User":user}

        }catch(err){
            response.badRequest(err.messages)
        }
    }

    public async delete({params}){
        
        const profile=await Profile.findBy("mobile",params.mobile)
        const user=await User.findBy("id",profile?.userId)

        if(profile){
            profile.delete()
            user?.delete()
            return "Profile and User deleted!"
        }
        
        return "Wrong mobile number given"
    }

}
