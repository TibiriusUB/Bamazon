
//Thing.prototype.

function Thing(x){
    this.res=x
    this.doSomething = function(y, x) {
    // Call our callback, but using our own instance as the context
    y.call(this, x);}
}

function foo(salutation) {
    console.log(salutation + " " + this.res);
}

var t = new Thing('Joe');
t.doSomething(foo, 'Hi');  // Alerts "Hi Joe" via `foo`node 




function catcall(){ 
 this.catchD = function (x,y){
     if (x) throw x;
    this.y = y
 };
    catchD(x,y)
}