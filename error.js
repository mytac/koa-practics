const koa=require('koa')
const onerror = require('koa-onerror'); // 这个中间件只在dev环境

const app=koa()

onerror(app)

app.use(function *(){
    //!! 抛出异常必须是 Error 实例
    throw new Error('demo error');
});


app.listen(3000)