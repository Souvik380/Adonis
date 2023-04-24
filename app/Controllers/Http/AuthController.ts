// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import {schema,rules} from "@ioc:Adonis/Core/Validator"

export default class AuthController {

    public async register({request}){
        
        const validationData=await schema.create({
            email:schema.string({},[
                rules.email(),
                rules.unique({table:"users",column:"email"})
            ]),

            password:schema.string({},[
                rules.minLength(8),
                rules.maxLength(16)
            ])
        })

        const data=await request.validate({schema:validationData})
        return User.create(data)
    } 

    public async login({request,auth,response}){
        const email=request.input("email")
        const pass=request.input("password")

        try{
            const token=await auth.attempt(email,pass)
            return token.toJSON()
        }catch(err){
            return response.send({ message: "Invalid email or password!" });
        }
    }

    public async logout({auth,response}){
        await auth.logout();
        return response.send({ message: 'Logged out successfully' });
    }
}
