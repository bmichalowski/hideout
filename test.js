var obj = {
    value: true,
    toggle: function() {this.value = !this.value}
};

obj.toggle();
console.log(obj.value);

var obj2 = {
    value: true,
    row: {
        toggle: function() {console.log({tt: this})}
    }
};

var main = {
    name : "main object",
    child : {
        name : "child object"
    },
    init : function() {
        this.child.parent = this;
        delete this.init;
        return this;
    }
}.init();


// hasSecret

eval("(function (){console.log('foo');}());");

function Encrypt(value) 
{
  var result="";
  for(i=0;i<value.length;i++)
  {
    if(i<value.length-1)
    {
        result+=value.charCodeAt(i)+1;
        result+="-";
    }
    else
    {
        result+=value.charCodeAt(i)+1;
    }
  }
  return result;
}
function Decrypt(value)
{
  var result="";
  var array = value.split("-");

  for(i=0;i<array.length;i++)
  {
    result+=String.fromCharCode(array[i]-1);
  }
  return result;
} 