const co=require('co')

function SimpleKoa(){
    this.middlewares=[]
}

SimpleKoa.prototype={
    // 注入中间价
    use(gf){
        this.middlewares.push(gf)
    },
    // 执行中间件
    listen(){
        this._run()
    },
    _run(){
        const ctx=this
        const middlewares=ctx.middlewares
        return co(function *(){
            let prev=null
            let i=middlewares.length
            //从最后一个中间件到第一个中间件的顺序开始遍历
            while(i--){
                prev=middlewares[i].call(ctx,prev)
            }
            yield prev
        })()
    }
}

// demo如下
const app=new SimpleKoa()

app.use(function *(next){
    this.body = '1';
    yield next;
    this.body += '5';
    console.log(this.body);
})

app.use(function *(next){
    this.body += '2';
    yield next;
    this.body += '4';
});

app.use(function *(next){
    this.body += '3';
});

app.listen();