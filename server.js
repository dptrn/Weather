const express=require("express")
const app=express()
const http=require("https")
const bodyparser=require("body-parser")
const {name}=require("ejs")
const { Console } = require("console")

app.use(bodyparser.urlencoded({extended:true}))
app.set("view engine", "ejs")
app.use(express.static("public"))
// app.use("/img",express.static("img"))

const port=process.env.port || 4000

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/html/index.html")
})
app.post("/",(req,res)=>{
    const city=req.body.cityname

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f3a419ab7ab02bcafdccf93381e74575`;
     
    http.get(url,(response)=>{
        response.on('data',(data)=>{
            const weatherdata=JSON.parse(data)
            console.log(weatherdata);
            res.render("result",{
                name:weatherdata.name,
                temp:weatherdata.main.temp,
                weather:weatherdata.weather[0].description,
                windspeed:weatherdata.wind.speed
            })
        })

    })

})

app.listen(port,()=>{
console.log(`server is up and running on port ${port}`);
})
