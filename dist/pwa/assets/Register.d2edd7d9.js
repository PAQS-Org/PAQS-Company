import{r as w,M,p as V,q as S,t as l,U as i,m as a,V as r,W as n,af as P,ag as g,ah as U,Y as f,Z as b,R as I,S as N}from"./index.92c4a599.js";import{Q as c}from"./QInput.ebfbe653.js";import{Q as $}from"./QSeparator.51100cea.js";import{Q as F}from"./QFile.fb36310a.js";import{Q as L}from"./QForm.f3c2714e.js";import{Q as x}from"./QList.5d5a3bde.js";import{Q as A}from"./QCard.33255d16.js";import{Q as B}from"./QPage.806bf0ae.js";import{u as R}from"./auth.94608f39.js";import{u as j,r as p,e as D}from"./index.f23859cc.js";import{_ as E}from"./plugin-vue_export-helper.21dcd24c.js";import"./use-key-composition.04474257.js";import"./use-dark.0042ceae.js";import"./private.use-form.93118294.js";import"./QChip.c0fe542b.js";import"./format.de7e9769.js";import"./axios.057661fc.js";var O="https://github.com/PAQS-Org/PAQS-Company/assets/userplus.8955be85.svg";const q=_=>(I("data-v-1aea0f19"),_=_(),N(),_),Z={class:"q-pa-md row items-start q-gutter-md",style:{"max-width":"400px"}},T=q(()=>i("div",{class:"flex justify-center items-center bg-white"},[i("img",{class:"my-card",src:O})],-1)),W={key:0},Y={class:"password-criteria q-pa-sm"},z=q(()=>i("div",{class:"text-subtitle2 q-mb-sm"},"Password Criteria:",-1)),G={align:"center",class:"q-mb-lg"},H=q(()=>i("div",null,[i("p",null,"or sign in")],-1)),J=Object.assign({name:"registerComp"},{__name:"Register",setup(_){const{isLoading:K,register:h}=R(),y=w(null),o=M({first_name:"",last_name:"",email:"",password:"",company_name:"",company_logo:null}),u=w(!0),v=w(!1),e=j({user:{first_name:{required:p},last_name:{required:p},email:{required:p,email:D},password:{required:p},company_name:{required:p},company_logo:{required:p}}},{user:o}),d=()=>{const t=o.password;return t.length>=8&&/[A-Z]/.test(t)&&/\d/.test(t)&&/[!@#$%^&*()-_+=]/.test(t)},Q=()=>{o.company_logo=null},C=async()=>{if(e.value.$touch(),e.value.$pending||e.value.$invalid){$q.notify({color:"red-5",textColor:"white",icon:"warning",message:"Please correct the errors in the form"});return}if(d()){const t=new FormData;t.append("first_name",o.first_name),t.append("last_name",o.last_name),t.append("email",o.email),t.append("password",o.password),t.append("company_name",o.company_name),t.append("company_logo",o.company_logo);try{await h(t)}catch{$q.notify({color:"red-5",textColor:"white",icon:"warning",message:"Error submitting form"})}}else v.value=!0},k=()=>{y.value&&y.value.resetValidation(),e.value.$reset(),o.first_name="",o.last_name="",o.email="",o.password="",o.company_name="",o.company_logo=null,u.value=!0,v.value=!1};return(t,s)=>(V(),S(B,{class:"flex flex-center"},{default:l(()=>[i("div",Z,[a(A,{class:"shadow-16 bg-gray-200"},{default:l(()=>[T,a(x,{class:"q-ma-sm"},{default:l(()=>[a(L,{ref_key:"form",ref:y},{default:l(()=>[a(c,{modelValue:r(e).user.first_name.$model,"onUpdate:modelValue":s[0]||(s[0]=m=>r(e).user.first_name.$model=m),modelModifiers:{trim:!0},class:"q-mx-lg",type:"text",label:"First Name",error:!r(e).user.first_name.required&&r(e).user.first_name.$dirty,"error-message":"First name is required"},{prepend:l(()=>[a(n,{name:"person"})]),_:1},8,["modelValue","error"]),a(c,{modelValue:r(e).user.last_name.$model,"onUpdate:modelValue":s[1]||(s[1]=m=>r(e).user.last_name.$model=m),modelModifiers:{trim:!0},class:"q-mx-lg",type:"text",label:"Last Name",error:!r(e).user.last_name.required&&r(e).user.last_name.$dirty,"error-message":"Last name is required"},{prepend:l(()=>[a(n,{name:"person"})]),_:1},8,["modelValue","error"]),a(c,{modelValue:r(e).user.email.$model,"onUpdate:modelValue":s[2]||(s[2]=m=>r(e).user.email.$model=m),modelModifiers:{trim:!0},class:"q-mx-lg",type:"email",label:"Email",error:!r(e).user.email.required&&r(e).user.email.$dirty||!r(e).user.email.email&&r(e).user.email.$dirty,"error-message":"A valid email is required"},{prepend:l(()=>[a(n,{name:"email"})]),_:1},8,["modelValue","error"]),a(c,{modelValue:r(e).user.password.$model,"onUpdate:modelValue":s[4]||(s[4]=m=>r(e).user.password.$model=m),modelModifiers:{trim:!0},class:"q-mx-lg",type:u.value?"password":"text",label:"Password",error:!r(e).user.password.required&&r(e).user.password.$dirty||!d()&&r(e).user.password.$dirty,"error-message":"Password is invalid"},{prepend:l(()=>[a(n,{name:"password"})]),append:l(()=>[a(n,{name:u.value?"visibility_off":"visibility",class:"cursor-pointer",onClick:s[3]||(s[3]=m=>u.value=!u.value)},null,8,["name"])]),_:1},8,["modelValue","type","error"]),a($),v.value?(V(),P("div",W,[i("div",Y,[z,i("div",null,[a(n,{name:d.length?"check_circle":"cancel",color:d.length?"positive":"negative"},null,8,["name","color"]),g(" Must be at least 8 characters long. ")]),i("div",null,[a(n,{name:d.capital?"check_circle":"cancel",color:d.capital?"positive":"negative"},null,8,["name","color"]),g(" Must contain at least one capital letter. ")]),i("div",null,[a(n,{name:d.number?"check_circle":"cancel",color:d.number?"positive":"negative"},null,8,["name","color"]),g(" Must contain at least one number. ")]),i("div",null,[a(n,{name:d.symbol?"check_circle":"cancel",color:d.symbol?"positive":"negative"},null,8,["name","color"]),g(" Must contain at least one special character: !@#$%^&*()-_+= ")])]),a($)])):U("",!0),a(c,{modelValue:r(e).user.company_name.$model,"onUpdate:modelValue":s[5]||(s[5]=m=>r(e).user.company_name.$model=m),modelModifiers:{trim:!0},class:"q-mx-lg",type:"text",label:"Name of Company",error:!r(e).user.company_name.required&&r(e).user.company_name.$dirty,"error-message":"Company name is required"},{prepend:l(()=>[a(n,{name:"apartment"})]),_:1},8,["modelValue","error"]),a(F,{modelValue:r(e).user.company_logo.$model,"onUpdate:modelValue":s[7]||(s[7]=m=>r(e).user.company_logo.$model=m),modelModifiers:{trim:!0},class:"q-mx-lg","bottom-slots":"",label:"Company Logo",accept:".jpg, .png, .svg, image/*",counter:""},{prepend:l(()=>[a(n,{name:"image",onClick:s[6]||(s[6]=f(()=>{},["stop"]))})]),append:l(()=>[a(n,{name:"close",class:"cursor-pointer",onClick:f(Q,["stop"])})]),_:1},8,["modelValue"]),i("div",G,[a(b,{label:"Sign Up",onClick:f(C,["prevent"]),type:"button",color:"primary",disable:!r(e).$anyDirty||r(e).$invalid},null,8,["disable"]),a(b,{label:"Reset",type:"reset",color:"primary",flat:"",class:"q-ml-sm",onClick:f(k,["prevent"])})])]),_:1},512)]),_:1}),a($),a(x,{align:"center",class:"q-mt-lg q-mb-lg"},{default:l(()=>[H,a(b,{to:"/auth/login",class:"q-ma-sm",color:"primary",label:"Sign In"})]),_:1})]),_:1})])]),_:1}))}});var ye=E(J,[["__scopeId","data-v-1aea0f19"]]);export{ye as default};