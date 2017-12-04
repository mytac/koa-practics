const fs=require('fs')
const co=require('co')
const koa=require('koa')
const router=require('koa-router')

const config=require('./config/config')

const app=koa()


function read(file){
    return (fn)=>{
            fs.readFile(file,'utf8',(err,res)=>{
                console.log(res)
            })
    }
}

co(function *(){
    const res=yield [
        read('.gitignore'),
        read('package.json')
    ]
    console.log('res',res)
})()


//co.next()


app.use(function *(next){
    // 注入config配置信息
    if(!this.config){
        this.config=config
    }
    yield next
})
app.use(router(app))

app.get('/',function *(next){
    //首页
    this.body='首页'
})

app.get('/config',function *(next){
    // config注入中间件，配置信息
    this.body=this.config.env
})

app.param('id',function *(id,next){
    this.id=id
    if(this.id<10) return this.status=404
    yield next
}).get('/detail/:id',function *(next){
    const id=this.id
    this.body=id
})


app.listen(3000)