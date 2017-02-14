 /*   
         * MAP对象，实现MAP功能   
         *   
         * 接口：   
         * size()     获取MAP元素个数   
         * isEmpty()    判断MAP是否为空   
         * clear()     删除MAP所有元素   
         * set(key, value)   向MAP中增加元素（key, value)    
         * delete(key)    删除指定KEY的元素，成功返回true，失败返回false   
         * get(key)    获取指定KEY的元素值VALUE，失败返回undefined  
         * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL   
         * has(key)  判断MAP中是否含有指定KEY的元素   
         * containsValue(value) 判断MAP中是否含有指定VALUE的元素   
         * values()    获取MAP中所有VALUE的数组（ARRAY）   
         * keys()     获取MAP中所有KEY的数组（ARRAY）   
         *   
         * 例子：   
         * var map = new Map();   
         *   
         * map.set("key", "value");   
         * var val = map.get("key")   
         * ……   
         *   
         */

        function Map() {
            this.elements = new Array();
        }

        Map.prototype = {

            //获取MAP元素个数     
            size: function() {
                return this.elements.length;
            },

            //判断MAP是否为空     
            isEmpty: function() {
                return (this.elements.length < 1);
            },

            //删除MAP所有元素     
            clear: function() {
                this.elements = new Array();
            },

            //向MAP中增加元素（key, value)      
            set: function(_key, _value) {
                this.elements.push({
                    key: _key,
                    value: _value
                });
            },

            //删除指定KEY的元素，成功返回True，失败返回False     
            delete: function(_key) {
                var bln = false;
                try {
                    for (i = 0; i < this.elements.length; i++) {
                        if (this.elements[i].key == _key) {
                            this.elements.splice(i, 1);
                            return true;
                        }
                    }
                } catch (e) {
                    bln = false;
                }
                return bln;
            },

            //获取指定KEY的元素值VALUE，失败返回undefined     
            get: function(_key) {
                try {
                    for (i = 0; i < this.elements.length; i++) {
                        if (this.elements[i].key == _key) {
                            return this.elements[i].value;
                        }
                    }
                } catch (e) {
                    return undefined;
                }
            },

            //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL     
            element: function(_index) {
                if (_index < 0 || _index >= this.elements.length) {
                    return null;
                }
                return this.elements[_index];
            },

            //判断MAP中是否含有指定KEY的元素     
            has: function(_key) {
                var bln = false;
                try {
                    for (i = 0; i < this.elements.length; i++) {
                        if (this.elements[i].key == _key) {
                            bln = true;
                        }
                    }
                } catch (e) {
                    bln = false;
                }
                return bln;
            },

            //判断MAP中是否含有指定VALUE的元素     
            containsValue: function(_value) {
                var bln = false;
                try {
                    for (i = 0; i < this.elements.length; i++) {
                        if (this.elements[i].value == _value) {
                            bln = true;
                        }
                    }
                } catch (e) {
                    bln = false;
                }
                return bln;
            },

            //获取MAP中所有VALUE的数组（ARRAY）     
            values: function() {
                var arr = new Array();
                for (i = 0; i < this.elements.length; i++) {
                    arr.push(this.elements[i].value);
                }
                return arr;
            },

            //获取MAP中所有KEY的数组（ARRAY）     
            keys: function() {
                var arr = new Array();
                for (i = 0; i < this.elements.length; i++) {
                    arr.push(this.elements[i].key);
                }
                return arr;
            }

        }



        var map = new Map();

        map.set("key1", "value1");
        map.set("key2", "value2");
        map.set("key3", "value3");


        //var val = map.get("key1");  
        //  var val = map.containsKey("key1");  
        //  var val = map.element(2).value;  

        var arr = map.keys();
        for (var i = 0; i < arr.length; i++) {
            alert(map.get(arr[i]));
        }
        //  alert(val);
