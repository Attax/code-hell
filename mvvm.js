
作者：LowesYang
链接：https://zhuanlan.zhihu.com/p/25003235
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

<div id="app">
    <form>
        <input type="text" v-model="count" />
        <button type="button" v-click="increment">increment</button>
        <button type="button" v-click="alert('Hello world')">alert</button>
    </form>
    <p v-bind="count"></p>
</div>
<script>
    function Lue(options){
        this._init(options);
        console.log(this)
    }

    Lue.prototype._init=function(options){
        this.$options=options;                              //传入的实例配置
        this.$el=document.querySelector(options.el);        //实例绑定的根节点
        this.$data=options.data;                            //实例的数据域
        this.$methods=options.methods;                      //实例的函数域

        //与DOM绑定的数据对象集合
        //每个成员属性有一个名为_directives的数组，用于在数据更新时触发更新DOM的各directive
        this._binding={};
        this._parseData(this.$data);

        this._compile(this.$el);                //编译DOM节点
    };

    //遍历数据域，添加getter/setter
    Lue.prototype._parseData=function(obj){
        var value;
        for(var key in obj){
            //排除原型链上的属性，仅仅遍历对象本身拥有的属性
            if(obj.hasOwnProperty(key)){
                this._binding[key]={        //初始化与DOM绑定的数据对象
                    _directives:[]
                };
                value=obj[key];
                //如果属性值为对象，则递归解析
                if(typeof value ==='object'){
                    this._parseData(value);
                }
                this.convert(key,value);
            }
        }
    };

    /**对象属性重定义
     * @param key 数据对象名称，本例为"count"
     * @param val 数据对象的值
     */
    Lue.prototype.convert=function(key,val){
        var binding=this._binding[key];
        Object.defineProperty(this.$data,key,{
            enumerable:true,
            configurable:true,
            get:function(){
                console.log(`获取${val}`);
                return val;
            },
            set:function(newVal){
                console.log(`更新${newVal}`);
                if(val!=newVal){
                    val=newVal;
                    binding._directives.forEach(function(item){
                        item.update();
                    })
                }
            }
        })
    };

    function Directive(name,el,vm,exp,attr){
        this.name=name;         //指令名称，例如文本节点，该值设为"text"
        this.el=el;             //指令对应的DOM元素
        this.vm=vm;             //指令所属lue实例
        this.exp=exp;           //指令对应的值，本例如"count"
        this.attr=attr;         //绑定的属性值，本例仅实验innerHTML

        this.update();          //首次绑定时更新
    }

Directive.prototype.update=function(){
        //更新DOM节点的相应属性值
        this.el[this.attr]=this.vm.$data[this.exp];
    };

    //解析DOM的指令
    Lue.prototype._compile=function(root){
        var _this=this;
        //获取指定作用域下的所有子节点
        var nodes=root.children;
        for(var i=0;i<nodes.length;i++){
            var node=nodes[i];
            //若该元素有子节点，则先递归编译其子节点
            if(node.children.length){
                 this._compile(node);
            }

            if(node.hasAttribute("v-click")) {
                node.onclick = (function () {
                    var attrVal=nodes[i].getAttribute("v-click");
                    var args=/\(.*\)/.exec(attrVal);
                    if(args) {              //如果函数带参数,将参数字符串转换为参数数组
                        args=args[0];
                        attrVal=attrVal.replace(args,"");
                        args=args.replace(/[\(|\)|\'|\"]/g,'').split(",");
                    }
                    else args=[];
                    return function () {
                        _this.$methods[attrVal].apply(_this.$data,args);
                    }
                })()
            }

            if(node.hasAttribute(("v-model"))
                    && node.tagName=="INPUT" || node.tagName=="TEXTAREA"){
                //如果是input或textarea标签
                node.addEventListener("input", (function (key) {
                    var attrVal=node.getAttribute("v-model");
                    //将value值的更新指令添加至_directives数组
                    _this._binding[attrVal]._directives.push(new Directive(
                            "input",
                            node,
                            _this,
                            attrVal,
                            "value"
                    ))

                    return function () {
                        _this.$data[attrVal] = nodes[key].value;
                    }
                })(i));
            }

            if(node.hasAttribute("v-bind")){
                var attrVal=node.getAttribute("v-bind");
                //将innerHTML的更新指令添加至_directives数组
                _this._binding[attrVal]._directives.push(new Directive(
                        "text",
                        node,
                        _this,
                        attrVal,
                        "innerHTML"
                ))
            }
        }
    }

    window.onload=function(){
        var app=new Lue({
             el:"#app",
             data:{
                count:0,
             },
             methods:{
                increment:function(){
                this.count++;
            },
            alert:function(msg){
                alert(msg)
                }
            }
        })
    }
</script>
