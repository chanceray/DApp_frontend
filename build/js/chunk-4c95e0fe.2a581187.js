(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c95e0fe"],{"039f":function(e,t,c){},"0c99":function(e,t,c){"use strict";c.r(t);var n=c("7a23"),r=c("d8e8"),l=(c("7aa1"),c("c349")),o=(c("c4aa"),c("c49e"),c("91c0")),a=(c("cc66"),c("10c7"),c("1da1")),u=(c("b0c0"),c("96cf"),c("fe87")),i=c.n(u),d=c("6c02"),A={phone:[{required:!0,message:"请输入用户名或者手机号",trigger:"blur"}],name:[{required:!0,message:"请输入姓名",trigger:"blur"}],address:[{required:!0,message:"请输入地址",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],Identity:[{required:!0,message:"请输入身份证号码",trigger:"blur"}]},s=c("8e44");function f(e){return s["a"].post({url:"Register",data:e})}var b=c("3ef4"),O=c("f6f2"),p=function(e){return Object(n["pushScopeId"])("data-v-f189a93c"),e=e(),Object(n["popScopeId"])(),e},V={class:"register-content"},j=p((function(){return Object(n["createElementVNode"])("div",{class:"title"},[Object(n["createElementVNode"])("div",{class:"name"},"二手车信息溯源系统"),Object(n["createElementVNode"])("div",{class:"img"},[Object(n["createElementVNode"])("img",{src:i.a,alt:""})])],-1)})),m={class:"register-account"},I={class:"content"},h=p((function(){return Object(n["createElementVNode"])("div",{class:"welcome"},[Object(n["createElementVNode"])("div",{class:"text"},"信息注册")],-1)})),v={__name:"register-content",setup:function(e){var t=Object(d["c"])(),c=Object(n["reactive"])({account:"",name:"",password:"",phone:"",address:"",mail:"",Identity:"",usertype:""}),u=Object(n["ref"])(null),i=Object(n["ref"])([{name:"消费者",value:"1"},{name:"生产厂家",value:"2"},{name:"二手车销售商",value:"3"},{name:"监管部门",value:"4"}]),s=function(){u.value.validate(function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n&&(f(c),Object(b["a"])({message:"操作成功",type:"success"}),t.push("/login"));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},p=function(){t.push("login")};return function(e,t){var a=o["a"],d=o["c"],f=r["b"],b=l["a"],v=r["a"];return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",V,[j,Object(n["createElementVNode"])("div",m,[Object(n["createElementVNode"])("div",I,[h,Object(n["createVNode"])(v,{ref_key:"formRef",ref:u,model:c,rules:Object(n["unref"])(A),"label-width":"0",class:"demo-ruleForm","status-icon":""},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(f,{label:"",prop:"usertype"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(d,{style:{width:"100%"},modelValue:c.usertype,"onUpdate:modelValue":t[0]||(t[0]=function(e){return c.usertype=e}),placeholder:"请选择用户角色"},{default:Object(n["withCtx"])((function(){return[(Object(n["openBlock"])(!0),Object(n["createElementBlock"])(n["Fragment"],null,Object(n["renderList"])(i.value,(function(e,t){return Object(n["openBlock"])(),Object(n["createBlock"])(a,{key:t,label:e.name,value:e.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1}),Object(n["createVNode"])(f,{label:"",prop:"account"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(b,{modelValue:c.account,"onUpdate:modelValue":t[1]||(t[1]=function(e){return c.account=e}),placeholder:"请输入用户名","prefix-icon":Object(n["unref"])(O["l"])},null,8,["modelValue","prefix-icon"])]})),_:1}),Object(n["createVNode"])(f,{label:"",prop:"name"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(b,{modelValue:c.name,"onUpdate:modelValue":t[2]||(t[2]=function(e){return c.name=e}),placeholder:"请输姓名","prefix-icon":Object(n["unref"])(O["l"])},null,8,["modelValue","prefix-icon"])]})),_:1}),Object(n["createVNode"])(f,{label:"",prop:"password"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(b,{placeholder:"请输入密码",modelValue:c.password,"onUpdate:modelValue":t[3]||(t[3]=function(e){return c.password=e}),"prefix-icon":Object(n["unref"])(O["d"]),"show-password":""},null,8,["modelValue","prefix-icon"])]})),_:1}),Object(n["createVNode"])(f,{label:"",prop:"phone"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(b,{modelValue:c.phone,"onUpdate:modelValue":t[4]||(t[4]=function(e){return c.phone=e}),placeholder:"请输入手机号","prefix-icon":Object(n["unref"])(O["l"])},null,8,["modelValue","prefix-icon"])]})),_:1}),Object(n["createVNode"])(f,{label:"",prop:"address"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(b,{modelValue:c.address,"onUpdate:modelValue":t[5]||(t[5]=function(e){return c.address=e}),placeholder:"请输入地址","prefix-icon":Object(n["unref"])(O["d"])},null,8,["modelValue","prefix-icon"])]})),_:1}),Object(n["createVNode"])(f,{label:"",prop:"mail"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(b,{modelValue:c.mail,"onUpdate:modelValue":t[6]||(t[6]=function(e){return c.mail=e}),placeholder:"请输入邮箱","prefix-icon":Object(n["unref"])(O["l"])},null,8,["modelValue","prefix-icon"])]})),_:1}),Object(n["createVNode"])(f,{label:"",prop:"Identity"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(b,{modelValue:c.Identity,"onUpdate:modelValue":t[7]||(t[7]=function(e){return c.Identity=e}),placeholder:"请输入身份证号","prefix-icon":Object(n["unref"])(O["l"])},null,8,["modelValue","prefix-icon"])]})),_:1})]})),_:1},8,["model","rules"]),Object(n["createElementVNode"])("div",{class:"no-account"},[Object(n["createElementVNode"])("div",{class:"login-btn",onClick:s},"注册"),Object(n["createElementVNode"])("div",{class:"login-btn",onClick:p},"登录")])])])])}}},g=(c("8465"),c("6b0d")),C=c.n(g);const k=C()(v,[["__scopeId","data-v-f189a93c"]]);var N=k,E=function(e){return Object(n["pushScopeId"])("data-v-1e55158e"),e=e(),Object(n["popScopeId"])(),e},Q={class:"register"},S=E((function(){return Object(n["createElementVNode"])("div",{class:"register-bg"},null,-1)})),B={__name:"register",setup:function(e){return function(e,t){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",Q,[S,Object(n["createVNode"])(N)])}}};c("e411");const Z=C()(B,[["__scopeId","data-v-1e55158e"]]);t["default"]=Z},"10c7":function(e,t,c){"use strict";c("771d"),c("c002")},"58f3":function(e,t,c){},8465:function(e,t,c){"use strict";c("9e0f")},"9e0f":function(e,t,c){},c002:function(e,t,c){},cc66:function(e,t,c){"use strict";c("771d"),c("c4aa"),c("3e9e"),c("10c7"),c("58f3"),c("9d28"),c("dbe6"),c("039f")},e411:function(e,t,c){"use strict";c("e42c")},e42c:function(e,t,c){},fe87:function(e,t){e.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=chunk-4c95e0fe.2a581187.js.map