const koa=require('koa')
const router=require('koa-router')

const app=koa()

app.use(router(app))

app.get('/',function *(next){
    //首页
    this.body='首页'
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