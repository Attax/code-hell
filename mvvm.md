# MVVM框架核心原理

##Vue.js数据绑定核心原理

###defineProperty


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <input q-value="value" type="text" id="input">
        <div q-text="value" id="el"></div>
    </div>
    
    <script>
       var obj={
           'data':{}
       };
       Object.defineProperty(obj,'data',{
           get:function(){
                console.log('对象获取操作')
                return 'sb'
           },
           set:function(){
                console.log('对象赋值操作');
                return 'sx'
           }
       })


       console.log(obj.data,'\n');
       obj.data={};

    </script>
</body>
</html>
```
