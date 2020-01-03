var obj = {
    value: true,
    toggle: function() {this.value = !this.value}
};

obj.toggle();
console.log(obj.value);

var obj2 = {
    value: true,
    row: {
        toggle: function() {console.log({this})}
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