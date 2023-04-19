
import Route from '@ioc:Adonis/Core/Route'
// import ProfileController from 'App/Controllers/Http/ProfileController'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.group(()=>{

  Route.group(()=>{
    Route.get("/user/profile","ProfileController.view")
    Route.get("/user/profile/:mobile","ProfileController.showProfile")
    Route.post("/user/profile","ProfileController.create")
    Route.put("/user/profile/:mobile","ProfileController.update")
    Route.delete("/user/profile/:mobile","ProfileController.delete")
  }).middleware('auth')


  Route.post("/register","AuthController.register")
  Route.post("/login","AuthController.login")

})




  
