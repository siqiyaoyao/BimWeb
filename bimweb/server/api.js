// server/api.js
/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Event = require('./models/Event');
const Rsvp = require('./models/Rsvp');
/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

module.exports = function(app, config) {
  // Authentication middleware // 需要用这个来确认登录信息
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

  // auth0 rule中会发送该请求 "http://myapp.com/roles": ["admin"]
  const adminCheck = (req,res,next) =>{
    const roles = req.user[config.NAMESPACE] || [];//获取请求中的req 符合特定auth0 api的user信息
    if(roles.indexOf('admin')>-1){ //如果是admin权限 则进行下一步
      next();
    }else{
      res.status(401).send({message:'没有获得准入权限'});
    }

  }

/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */
  const _eventListProjection = 'title startDatetime endDatetime viewPublic';
  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });
  
  // GET list 
  app.get('/api/events',(req,res)=>{
    // find 请求 指定条件 $gte:new Date() = greater than now
    // projection 返回的指定数据属性模板 
    // callback 处理返回信息
    console.log("get")
    Event.find({viewPublic:true,startDatetime:{$gte:new Date()}},_eventListProjection,(err,events)=>{
      let eventsArr =[];
      console.log("find")
      if(err){
        return res.status(500).send({message:err.message});
      }
      if(events){// 拿到数据库数据，将数据放入数组
         console.log("find2")
        events.forEach(event=>{
          eventsArr.push(event);
        });
      }
      res.send(eventsArr);// 返回数组
    })

  });

  app.get('/api/events/admin', jwtCheck, adminCheck, (req, res) => {
    Event.find({}, _eventListProjection, (err, events) => {
      let eventsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (events) {
        events.forEach(event => {
          eventsArr.push(event);
        });
      }
      res.send(eventsArr);
    });
  });

  // GET details
  // 通过id来获得事件 并验证是否获得授权
  app.get('/api/event/:id',jwtCheck,(req,res)=>{
    Event.findById(req.params.id,(err,event)=>{
      if(err){
        return res.status(500).send({message:err.message});
      }
      if(!event){
        return res.status(400).send({message:'没有相应事件'});
      }
      res.send(event);
    })
  })

  // 通过事件id来获取rsvps列表
  app.get('/api/event/:eventId/rsvps',jwtCheck,(req,res)=>{
    Rsvp.findById({eventId:req.params.eventId},(err,rsvps)=>{
      rsvpsArr = [];
      if(err){
        return res.status(500).send({message:err.message});
      }
      if(rsvps){ // 如果为空 则返回空数组 并不需要返回错误信息
        rsvps.forEach(rsvp=>{
          rsvpsArr.push(rsvp);
        })
      }
      res.send(rsvpsArr);

    })
  })
};