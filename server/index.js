const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { auth } =require("./middleware/auth");
const { User } =require("./models/User");

//aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{

}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello World!~~안녕하세요!!!!!!!!!')
})


app.post('/api/users/register', (req, res) => {
    
    //회원 가입할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email  }, (err, user) => {       // findOne : 몽고디비에서 제공하는 메소드
      if(!user) { // 유저가 없는 경우
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        })
      }
    
  
    // 2. 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password , (err, isMatch) => { //req.body.password POSTMAN에서 우리가 요청하는 비밀번호
      if(!isMatch)
      return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
   
      // 3. 비밀번호까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err); //status(400) 무슨 에러가 있다는 의미 그리고 err메시지를 같이 보내준다.
  
        // 4. 토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지 일단은 쿠키에 저장 (cookieparser 다운 받아야됨)
        // 각 장점이 있다고만 알고 있자.
        res.cookie("x_auth", user.token) // "x_auth" 아무이름으로 하면 됨
          .status(200) // 성공했다는 표시
          .json({ loginSuccess: true, userId: user._id })
      })
     })
    })
   })

app.get('/api/users/auth', auth, (req, res) => {

    //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말.

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {

    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" },
         (err, user) => {
             if(err) return res.json({ success: false, err });
             return res.status(200).send({
                 success: true
             })
         })
})

app.get('/api/hello', (req, res) => {

  res.send("안녕하세요 ~")
})


const port = 5000
app.listen(port, () => { // 5000번 포트에서 이 앱을 실행하는 것
    console.log(`Example app listening on port ${port}`)
  })