const fs=require('fs')
//const co=require('co')

function co(fn) {
    return function(done) {
        const ctx = this;
        const gen = fn.call(ctx);
        let it = null;
        function _next(err, res) {
            if(err) res = err;
            it = gen.next(res);
            //{value:function(){},done:false}
            if(!it.done){
                it.value(_next);
            }
        }
        _next();
    }
}

function read(file){
    return (fn)=>{
        fs.readFile(file,'utf8',
            fn)
    }
}

const gen=function *(){
    const b=yield read('error.js')
    console.log(b.length)

    const c=yield read('package.json')
    console.log(c.length)
}

co(gen)()

/*function read(file){
    fs.readFile(file,'utf8',(err,res)=>{
        g.next(res)
    })
}

function * gen(){
    const b=yield read('error.js')
    console.log('b',b.length)
    const c=yield read('package.json')
    console.log('c',c.length)
}

const g=gen()
console.log(g.next())*/
