
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return "Hello Adonis!"
})

Route.group(()=>{

  Route.group(()=>{
    // Route.get("/user/profile","ProfileController.view")
    Route.get("/user/profile","ProfileController.showProfile")
    Route.post("/user/profile","ProfileController.create")
    Route.put("/user/profile","ProfileController.update")
    Route.delete("/user/profile","ProfileController.delete")
  }).middleware('auth')


  Route.post("/register","AuthController.register")
  Route.post("/login","AuthController.login")
})




  
