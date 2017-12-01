const koa=require('koa')
const onerror = require('koa-onerror'); // 这个中间件只在dev环境
const config=require('./config/config')
const Logger=require('mini-logger')


const logger = Logger({
    dir: config.logDir, // 指定日志放在哪里
    categories: [ 'router','model','controller'], // 自定义日志分类
    format: 'YYYY-MM-DD-[{category}][.log]' // 日志文件名格式
});
const app=koa()

onerror(app)

app.use(function *(){
    //!! 抛出异常必须是 Error 实例
    throw new Error('demo error');
});

logger.error(new Error('test'));
app.listen(3000)