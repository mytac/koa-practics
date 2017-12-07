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
                if(isGeneratorFunction(it.value)){
                    co(it.value).call(ctx,_next)
                }else{
                    it.value(_next);
                }
            }else{
                done&&done.call(ctx)
            }
        }
        _next();
    }
}

// 判断是否为generator function
function isGeneratorFunction(obj){
    const constructor = obj.constructor;
    if (!constructor) return false;
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
    return isGenerator(constructor.prototype);
}

// 判断是否为generator
function isGenerator(obj){
    return 'function' === typeof obj.next && 'function' === typeof obj.throw;
}

function read(file){
    return (fn)=>{
        fs.readFile(file,'utf8',
            fn)
    }
}

function * gf1() {
    this.a=yield  read('error.js')
}

function * gf2() {
    this.b=yield  read('package.json')
}


co(function *(){
    yield gf1
    yield gf2
    console.log(this.a.length)
    console.log(this.b.length)
})()
