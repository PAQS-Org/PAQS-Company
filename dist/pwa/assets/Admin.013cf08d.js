import{h as k,c as oe,j as c,y as ue,ap as vt,ae as ie,D as ft,aq as mt,ar as pe,as as ke,ac as Ie,a0 as Te,at as De,au as $e,a4 as ht,r as q,ab as bt,w as T,a1 as pt,a2 as yt,C as Le,O as _t,av as G,k as ge,aw as Ve,ax as Be,i as Ze,v as le,o as Je,K as Ne,ak as je,z as et,ay as gt,p as $,af as P,U as d,az as St,aA as Ae,an as D,ah as Y,ag as I,m as v,V as j,ao as wt,n as xt,t as w,q as U,Z as ye,W as ee,aB as Ge,am as te}from"./index.e45af843.js";import{c as zt,Q as E,a as ae}from"./selection.12f9b3d4.js";import{Q as Ct}from"./QSeparator.df6fcc73.js";import{Q as qt}from"./QList.285b7044.js";import{u as Ee,a as He}from"./use-dark.a5e256ad.js";import{b as Qe,c as kt,Q as Tt,a as $t}from"./QLayout.074ced79.js";import{g as Ye,s as Re}from"./touch.9135741d.js";import{b as X}from"./format.de7e9769.js";import{Q as Bt}from"./QImg.27320714.js";import{u as At,a as Mt,b as Ot,c as Pt,d as Dt,e as Qt}from"./use-prevent-scroll.a0aef94f.js";import{Q as Lt}from"./QPage.9a6954e5.js";import{u as Et}from"./use-quasar.78a54e71.js";import{u as Ht}from"./auth.7bac95e8.js";import{u as Ft}from"./dataFeed.c744b48d.js";import{_ as tt}from"./plugin-vue_export-helper.21dcd24c.js";import"./axios.f68c117c.js";const It=k("div",{class:"q-space"});var Me=oe({name:"QSpace",setup(){return()=>It}}),Vt=oe({name:"QToolbar",props:{inset:Boolean},setup(t,{slots:u}){const r=c(()=>"q-toolbar row no-wrap items-center"+(t.inset===!0?" q-toolbar--inset":""));return()=>k("div",{class:r.value,role:"toolbar"},ue(u.default))}});function Oe(t,u,r){const m=De(t);let e,l=m.left-u.event.x,n=m.top-u.event.y,a=Math.abs(l),p=Math.abs(n);const b=u.direction;b.horizontal===!0&&b.vertical!==!0?e=l<0?"left":"right":b.horizontal!==!0&&b.vertical===!0?e=n<0?"up":"down":b.up===!0&&n<0?(e="up",a>p&&(b.left===!0&&l<0?e="left":b.right===!0&&l>0&&(e="right"))):b.down===!0&&n>0?(e="down",a>p&&(b.left===!0&&l<0?e="left":b.right===!0&&l>0&&(e="right"))):b.left===!0&&l<0?(e="left",a<p&&(b.up===!0&&n<0?e="up":b.down===!0&&n>0&&(e="down"))):b.right===!0&&l>0&&(e="right",a<p&&(b.up===!0&&n<0?e="up":b.down===!0&&n>0&&(e="down")));let s=!1;if(e===void 0&&r===!1){if(u.event.isFirst===!0||u.event.lastDir===void 0)return{};e=u.event.lastDir,s=!0,e==="left"||e==="right"?(m.left-=l,a=0,l=0):(m.top-=n,p=0,n=0)}return{synthetic:s,payload:{evt:t,touch:u.event.mouse!==!0,mouse:u.event.mouse===!0,position:m,direction:e,isFirst:u.event.isFirst,isFinal:r===!0,duration:Date.now()-u.event.time,distance:{x:a,y:p},offset:{x:l,y:n},delta:{x:m.left-u.event.lastX,y:m.top-u.event.lastY}}}}let Nt=0;var ce=vt({name:"touch-pan",beforeMount(t,{value:u,modifiers:r}){if(r.mouse!==!0&&ie.has.touch!==!0)return;function m(l,n){r.mouse===!0&&n===!0?ht(l):(r.stop===!0&&Te(l),r.prevent===!0&&Ie(l))}const e={uid:"qvtp_"+Nt++,handler:u,modifiers:r,direction:Ye(r),noop:ft,mouseStart(l){Re(l,e)&&mt(l)&&(pe(e,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),e.start(l,!0))},touchStart(l){if(Re(l,e)){const n=l.target;pe(e,"temp",[[n,"touchmove","move","notPassiveCapture"],[n,"touchcancel","end","passiveCapture"],[n,"touchend","end","passiveCapture"]]),e.start(l)}},start(l,n){if(ie.is.firefox===!0&&ke(t,!0),e.lastEvt=l,n===!0||r.stop===!0){if(e.direction.all!==!0&&(n!==!0||e.modifiers.mouseAllDir!==!0&&e.modifiers.mousealldir!==!0)){const b=l.type.indexOf("mouse")!==-1?new MouseEvent(l.type,l):new TouchEvent(l.type,l);l.defaultPrevented===!0&&Ie(b),l.cancelBubble===!0&&Te(b),Object.assign(b,{qKeyEvent:l.qKeyEvent,qClickOutside:l.qClickOutside,qAnchorHandled:l.qAnchorHandled,qClonedBy:l.qClonedBy===void 0?[e.uid]:l.qClonedBy.concat(e.uid)}),e.initialEvent={target:l.target,event:b}}Te(l)}const{left:a,top:p}=De(l);e.event={x:a,y:p,time:Date.now(),mouse:n===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:a,lastY:p}},move(l){if(e.event===void 0)return;const n=De(l),a=n.left-e.event.x,p=n.top-e.event.y;if(a===0&&p===0)return;e.lastEvt=l;const b=e.event.mouse===!0,s=()=>{m(l,b);let y;r.preserveCursor!==!0&&r.preservecursor!==!0&&(y=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),b===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),zt(),e.styleCleanup=g=>{if(e.styleCleanup=void 0,y!==void 0&&(document.documentElement.style.cursor=y),document.body.classList.remove("non-selectable"),b===!0){const Q=()=>{document.body.classList.remove("no-pointer-events--children")};g!==void 0?setTimeout(()=>{Q(),g()},50):Q()}else g!==void 0&&g()}};if(e.event.detected===!0){e.event.isFirst!==!0&&m(l,e.event.mouse);const{payload:y,synthetic:g}=Oe(l,e,!1);y!==void 0&&(e.handler(y)===!1?e.end(l):(e.styleCleanup===void 0&&e.event.isFirst===!0&&s(),e.event.lastX=y.position.left,e.event.lastY=y.position.top,e.event.lastDir=g===!0?void 0:y.direction,e.event.isFirst=!1));return}if(e.direction.all===!0||b===!0&&(e.modifiers.mouseAllDir===!0||e.modifiers.mousealldir===!0)){s(),e.event.detected=!0,e.move(l);return}const x=Math.abs(a),z=Math.abs(p);x!==z&&(e.direction.horizontal===!0&&x>z||e.direction.vertical===!0&&x<z||e.direction.up===!0&&x<z&&p<0||e.direction.down===!0&&x<z&&p>0||e.direction.left===!0&&x>z&&a<0||e.direction.right===!0&&x>z&&a>0?(e.event.detected=!0,e.move(l)):e.end(l,!0))},end(l,n){if(e.event!==void 0){if($e(e,"temp"),ie.is.firefox===!0&&ke(t,!1),n===!0)e.styleCleanup!==void 0&&e.styleCleanup(),e.event.detected!==!0&&e.initialEvent!==void 0&&e.initialEvent.target.dispatchEvent(e.initialEvent.event);else if(e.event.detected===!0){e.event.isFirst===!0&&e.handler(Oe(l===void 0?e.lastEvt:l,e).payload);const{payload:a}=Oe(l===void 0?e.lastEvt:l,e,!0),p=()=>{e.handler(a)};e.styleCleanup!==void 0?e.styleCleanup(p):p()}e.event=void 0,e.initialEvent=void 0,e.lastEvt=void 0}}};if(t.__qtouchpan=e,r.mouse===!0){const l=r.mouseCapture===!0||r.mousecapture===!0?"Capture":"";pe(e,"main",[[t,"mousedown","mouseStart",`passive${l}`]])}ie.has.touch===!0&&pe(e,"main",[[t,"touchstart","touchStart",`passive${r.capture===!0?"Capture":""}`],[t,"touchmove","noop","notPassiveCapture"]])},updated(t,u){const r=t.__qtouchpan;r!==void 0&&(u.oldValue!==u.value&&(typeof value!="function"&&r.end(),r.handler=u.value),r.direction=Ye(u.modifiers))},beforeUnmount(t){const u=t.__qtouchpan;u!==void 0&&(u.event!==void 0&&u.end(),$e(u,"main"),$e(u,"temp"),ie.is.firefox===!0&&ke(t,!1),u.styleCleanup!==void 0&&u.styleCleanup(),delete t.__qtouchpan)}});const We=["vertical","horizontal"],Pe={vertical:{offset:"offsetY",scroll:"scrollTop",dir:"down",dist:"y"},horizontal:{offset:"offsetX",scroll:"scrollLeft",dir:"right",dist:"x"}},Ue={prevent:!0,mouse:!0,mouseAllDir:!0},Xe=t=>t>=250?50:Math.ceil(t/5);var jt=oe({name:"QScrollArea",props:{...Ee,thumbStyle:Object,verticalThumbStyle:Object,horizontalThumbStyle:Object,barStyle:[Array,String,Object],verticalBarStyle:[Array,String,Object],horizontalBarStyle:[Array,String,Object],contentStyle:[Array,String,Object],contentActiveStyle:[Array,String,Object],delay:{type:[String,Number],default:1e3},visible:{type:Boolean,default:null},tabindex:[String,Number],onScroll:Function},setup(t,{slots:u,emit:r}){const m=q(!1),e=q(!1),l=q(!1),n={vertical:q(0),horizontal:q(0)},a={vertical:{ref:q(null),position:q(0),size:q(0)},horizontal:{ref:q(null),position:q(0),size:q(0)}},{proxy:p}=ge(),b=He(t,p.$q);let s=null,x;const z=q(null),y=c(()=>"q-scrollarea"+(b.value===!0?" q-scrollarea--dark":""));a.vertical.percentage=c(()=>{const i=a.vertical.size.value-n.vertical.value;if(i<=0)return 0;const f=X(a.vertical.position.value/i,0,1);return Math.round(f*1e4)/1e4}),a.vertical.thumbHidden=c(()=>(t.visible===null?l.value:t.visible)!==!0&&m.value===!1&&e.value===!1||a.vertical.size.value<=n.vertical.value+1),a.vertical.thumbStart=c(()=>a.vertical.percentage.value*(n.vertical.value-a.vertical.thumbSize.value)),a.vertical.thumbSize=c(()=>Math.round(X(n.vertical.value*n.vertical.value/a.vertical.size.value,Xe(n.vertical.value),n.vertical.value))),a.vertical.style=c(()=>({...t.thumbStyle,...t.verticalThumbStyle,top:`${a.vertical.thumbStart.value}px`,height:`${a.vertical.thumbSize.value}px`})),a.vertical.thumbClass=c(()=>"q-scrollarea__thumb q-scrollarea__thumb--v absolute-right"+(a.vertical.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),a.vertical.barClass=c(()=>"q-scrollarea__bar q-scrollarea__bar--v absolute-right"+(a.vertical.thumbHidden.value===!0?" q-scrollarea__bar--invisible":"")),a.horizontal.percentage=c(()=>{const i=a.horizontal.size.value-n.horizontal.value;if(i<=0)return 0;const f=X(Math.abs(a.horizontal.position.value)/i,0,1);return Math.round(f*1e4)/1e4}),a.horizontal.thumbHidden=c(()=>(t.visible===null?l.value:t.visible)!==!0&&m.value===!1&&e.value===!1||a.horizontal.size.value<=n.horizontal.value+1),a.horizontal.thumbStart=c(()=>a.horizontal.percentage.value*(n.horizontal.value-a.horizontal.thumbSize.value)),a.horizontal.thumbSize=c(()=>Math.round(X(n.horizontal.value*n.horizontal.value/a.horizontal.size.value,Xe(n.horizontal.value),n.horizontal.value))),a.horizontal.style=c(()=>({...t.thumbStyle,...t.horizontalThumbStyle,[p.$q.lang.rtl===!0?"right":"left"]:`${a.horizontal.thumbStart.value}px`,width:`${a.horizontal.thumbSize.value}px`})),a.horizontal.thumbClass=c(()=>"q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom"+(a.horizontal.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),a.horizontal.barClass=c(()=>"q-scrollarea__bar q-scrollarea__bar--h absolute-bottom"+(a.horizontal.thumbHidden.value===!0?" q-scrollarea__bar--invisible":""));const g=c(()=>a.vertical.thumbHidden.value===!0&&a.horizontal.thumbHidden.value===!0?t.contentStyle:t.contentActiveStyle),Q=[[ce,i=>{ve(i,"vertical")},void 0,{vertical:!0,...Ue}]],B=[[ce,i=>{ve(i,"horizontal")},void 0,{horizontal:!0,...Ue}]];function C(){const i={};return We.forEach(f=>{const S=a[f];i[f+"Position"]=S.position.value,i[f+"Percentage"]=S.percentage.value,i[f+"Size"]=S.size.value,i[f+"ContainerSize"]=n[f].value}),i}const h=bt(()=>{const i=C();i.ref=p,r("scroll",i)},0);function A(i,f,S){if(We.includes(i)===!1){console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");return}(i==="vertical"?Ve:Be)(z.value,f,S)}function de({height:i,width:f}){let S=!1;n.vertical.value!==i&&(n.vertical.value=i,S=!0),n.horizontal.value!==f&&(n.horizontal.value=f,S=!0),S===!0&&F()}function ne({position:i}){let f=!1;a.vertical.position.value!==i.top&&(a.vertical.position.value=i.top,f=!0),a.horizontal.position.value!==i.left&&(a.horizontal.position.value=i.left,f=!0),f===!0&&F()}function K({height:i,width:f}){a.horizontal.size.value!==f&&(a.horizontal.size.value=f,F()),a.vertical.size.value!==i&&(a.vertical.size.value=i,F())}function ve(i,f){const S=a[f];if(i.isFirst===!0){if(S.thumbHidden.value===!0)return;x=S.position.value,e.value=!0}else if(e.value!==!0)return;i.isFinal===!0&&(e.value=!1);const N=Pe[f],J=n[f].value,Se=(S.size.value-J)/(J-S.thumbSize.value),he=i.distance[N.dist],we=x+(i.direction===N.dir?1:-1)*he*Se;re(we,f)}function fe(i,f){const S=a[f];if(S.thumbHidden.value!==!0){const N=i[Pe[f].offset];if(N<S.thumbStart.value||N>S.thumbStart.value+S.thumbSize.value){const J=N-S.thumbSize.value/2;re(J/n[f].value*S.size.value,f)}S.ref.value!==null&&S.ref.value.dispatchEvent(new MouseEvent(i.type,i))}}function Z(i){fe(i,"vertical")}function H(i){fe(i,"horizontal")}function F(){m.value=!0,s!==null&&clearTimeout(s),s=setTimeout(()=>{s=null,m.value=!1},t.delay),t.onScroll!==void 0&&h()}function re(i,f){z.value[Pe[f].scroll]=i}let M=null;function se(){M!==null&&clearTimeout(M),M=setTimeout(()=>{M=null,l.value=!0},p.$q.platform.is.ios?50:0)}function me(){M!==null&&(clearTimeout(M),M=null),l.value=!1}let V=null;return T(()=>p.$q.lang.rtl,i=>{z.value!==null&&Be(z.value,Math.abs(a.horizontal.position.value)*(i===!0?-1:1))}),pt(()=>{V={top:a.vertical.position.value,left:a.horizontal.position.value}}),yt(()=>{if(V===null)return;const i=z.value;i!==null&&(Be(i,V.left),Ve(i,V.top))}),Le(h.cancel),Object.assign(p,{getScrollTarget:()=>z.value,getScroll:C,getScrollPosition:()=>({top:a.vertical.position.value,left:a.horizontal.position.value}),getScrollPercentage:()=>({top:a.vertical.percentage.value,left:a.horizontal.percentage.value}),setScrollPosition:A,setScrollPercentage(i,f,S){A(i,f*(a[i].size.value-n[i].value)*(i==="horizontal"&&p.$q.lang.rtl===!0?-1:1),S)}}),()=>k("div",{class:y.value,onMouseenter:se,onMouseleave:me},[k("div",{ref:z,class:"q-scrollarea__container scroll relative-position fit hide-scrollbar",tabindex:t.tabindex!==void 0?t.tabindex:void 0},[k("div",{class:"q-scrollarea__content absolute",style:g.value},_t(u.default,[k(Qe,{debounce:0,onResize:K})])),k(kt,{axis:"both",onScroll:ne})]),k(Qe,{debounce:0,onResize:de}),k("div",{class:a.vertical.barClass.value,style:[t.barStyle,t.verticalBarStyle],"aria-hidden":"true",onMousedown:Z}),k("div",{class:a.horizontal.barClass.value,style:[t.barStyle,t.horizontalBarStyle],"aria-hidden":"true",onMousedown:H}),G(k("div",{ref:a.vertical.ref,class:a.vertical.thumbClass.value,style:a.vertical.style.value,"aria-hidden":"true"}),Q),G(k("div",{ref:a.horizontal.ref,class:a.horizontal.thumbClass.value,style:a.horizontal.style.value,"aria-hidden":"true"}),B)])}});const Ke=150;var Gt=oe({name:"QDrawer",inheritAttrs:!1,props:{...At,...Ee,side:{type:String,default:"left",validator:t=>["left","right"].includes(t)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:t=>["default","desktop","mobile"].includes(t),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...Mt,"onLayout","miniState"],setup(t,{slots:u,emit:r,attrs:m}){const e=ge(),{proxy:{$q:l}}=e,n=He(t,l),{preventBodyScroll:a}=Qt(),{registerTimeout:p,removeTimeout:b}=Ot(),s=Ze(et,le);if(s===le)return console.error("QDrawer needs to be child of QLayout"),le;let x,z=null,y;const g=q(t.behavior==="mobile"||t.behavior!=="desktop"&&s.totalWidth.value<=t.breakpoint),Q=c(()=>t.mini===!0&&g.value!==!0),B=c(()=>Q.value===!0?t.miniWidth:t.width),C=q(t.showIfAbove===!0&&g.value===!1?!0:t.modelValue===!0),h=c(()=>t.persistent!==!0&&(g.value===!0||N.value===!0));function A(o,_){if(ve(),o!==!1&&s.animate(),L(0),g.value===!0){const O=s.instances[V.value];O!==void 0&&O.belowBreakpoint===!0&&O.hide(!1),R(1),s.isContainer.value!==!0&&a(!0)}else R(0),o!==!1&&ze(!1);p(()=>{o!==!1&&ze(!0),_!==!0&&r("show",o)},Ke)}function de(o,_){fe(),o!==!1&&s.animate(),R(0),L(F.value*B.value),Ce(),_!==!0?p(()=>{r("hide",o)},Ke):b()}const{show:ne,hide:K}=Pt({showing:C,hideOnRouteChange:h,handleShow:A,handleHide:de}),{addToHistory:ve,removeFromHistory:fe}=Dt(C,K,h),Z={belowBreakpoint:g,hide:K},H=c(()=>t.side==="right"),F=c(()=>(l.lang.rtl===!0?-1:1)*(H.value===!0?1:-1)),re=q(0),M=q(!1),se=q(!1),me=q(B.value*F.value),V=c(()=>H.value===!0?"left":"right"),i=c(()=>C.value===!0&&g.value===!1&&t.overlay===!1?t.miniToOverlay===!0?t.miniWidth:B.value:0),f=c(()=>t.overlay===!0||t.miniToOverlay===!0||s.view.value.indexOf(H.value?"R":"L")!==-1||l.platform.is.ios===!0&&s.isContainer.value===!0),S=c(()=>t.overlay===!1&&C.value===!0&&g.value===!1),N=c(()=>t.overlay===!0&&C.value===!0&&g.value===!1),J=c(()=>"fullscreen q-drawer__backdrop"+(C.value===!1&&M.value===!1?" hidden":"")),Se=c(()=>({backgroundColor:`rgba(0,0,0,${re.value*.4})`})),he=c(()=>H.value===!0?s.rows.value.top[2]==="r":s.rows.value.top[0]==="l"),we=c(()=>H.value===!0?s.rows.value.bottom[2]==="r":s.rows.value.bottom[0]==="l"),at=c(()=>{const o={};return s.header.space===!0&&he.value===!1&&(f.value===!0?o.top=`${s.header.offset}px`:s.header.space===!0&&(o.top=`${s.header.size}px`)),s.footer.space===!0&&we.value===!1&&(f.value===!0?o.bottom=`${s.footer.offset}px`:s.footer.space===!0&&(o.bottom=`${s.footer.size}px`)),o}),lt=c(()=>{const o={width:`${B.value}px`,transform:`translateX(${me.value}px)`};return g.value===!0?o:Object.assign(o,at.value)}),ot=c(()=>"q-drawer__content fit "+(s.isContainer.value!==!0?"scroll":"overflow-auto")),nt=c(()=>`q-drawer q-drawer--${t.side}`+(se.value===!0?" q-drawer--mini-animate":"")+(t.bordered===!0?" q-drawer--bordered":"")+(n.value===!0?" q-drawer--dark q-dark":"")+(M.value===!0?" no-transition":C.value===!0?"":" q-layout--prevent-focus")+(g.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${Q.value===!0?"mini":"standard"}`+(f.value===!0||S.value!==!0?" fixed":"")+(t.overlay===!0||t.miniToOverlay===!0?" q-drawer--on-top":"")+(he.value===!0?" q-drawer--top-padding":""))),rt=c(()=>{const o=l.lang.rtl===!0?t.side:V.value;return[[ce,ct,void 0,{[o]:!0,mouse:!0}]]}),st=c(()=>{const o=l.lang.rtl===!0?V.value:t.side;return[[ce,Fe,void 0,{[o]:!0,mouse:!0}]]}),it=c(()=>{const o=l.lang.rtl===!0?V.value:t.side;return[[ce,Fe,void 0,{[o]:!0,mouse:!0,mouseAllDir:!0}]]});function xe(){dt(g,t.behavior==="mobile"||t.behavior!=="desktop"&&s.totalWidth.value<=t.breakpoint)}T(g,o=>{o===!0?(x=C.value,C.value===!0&&K(!1)):t.overlay===!1&&t.behavior!=="mobile"&&x!==!1&&(C.value===!0?(L(0),R(0),Ce()):ne(!1))}),T(()=>t.side,(o,_)=>{s.instances[_]===Z&&(s.instances[_]=void 0,s[_].space=!1,s[_].offset=0),s.instances[o]=Z,s[o].size=B.value,s[o].space=S.value,s[o].offset=i.value}),T(s.totalWidth,()=>{(s.isContainer.value===!0||document.qScrollPrevented!==!0)&&xe()}),T(()=>t.behavior+t.breakpoint,xe),T(s.isContainer,o=>{C.value===!0&&a(o!==!0),o===!0&&xe()}),T(s.scrollbarWidth,()=>{L(C.value===!0?0:void 0)}),T(i,o=>{W("offset",o)}),T(S,o=>{r("onLayout",o),W("space",o)}),T(H,()=>{L()}),T(B,o=>{L(),qe(t.miniToOverlay,o)}),T(()=>t.miniToOverlay,o=>{qe(o,B.value)}),T(()=>l.lang.rtl,()=>{L()}),T(()=>t.mini,()=>{t.noMiniAnimation||t.modelValue===!0&&(ut(),s.animate())}),T(Q,o=>{r("miniState",o)});function L(o){o===void 0?Ne(()=>{o=C.value===!0?0:B.value,L(F.value*o)}):(s.isContainer.value===!0&&H.value===!0&&(g.value===!0||Math.abs(o)===B.value)&&(o+=F.value*s.scrollbarWidth.value),me.value=o)}function R(o){re.value=o}function ze(o){const _=o===!0?"remove":s.isContainer.value!==!0?"add":"";_!==""&&document.body.classList[_]("q-body--drawer-toggle")}function ut(){z!==null&&clearTimeout(z),e.proxy&&e.proxy.$el&&e.proxy.$el.classList.add("q-drawer--mini-animate"),se.value=!0,z=setTimeout(()=>{z=null,se.value=!1,e&&e.proxy&&e.proxy.$el&&e.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function ct(o){if(C.value!==!1)return;const _=B.value,O=X(o.distance.x,0,_);if(o.isFinal===!0){O>=Math.min(75,_)===!0?ne():(s.animate(),R(0),L(F.value*_)),M.value=!1;return}L((l.lang.rtl===!0?H.value!==!0:H.value)?Math.max(_-O,0):Math.min(0,O-_)),R(X(O/_,0,1)),o.isFirst===!0&&(M.value=!0)}function Fe(o){if(C.value!==!0)return;const _=B.value,O=o.direction===t.side,be=(l.lang.rtl===!0?O!==!0:O)?X(o.distance.x,0,_):0;if(o.isFinal===!0){Math.abs(be)<Math.min(75,_)===!0?(s.animate(),R(1),L(0)):K(),M.value=!1;return}L(F.value*be),R(X(1-be/_,0,1)),o.isFirst===!0&&(M.value=!0)}function Ce(){a(!1),ze(!0)}function W(o,_){s.update(t.side,o,_)}function dt(o,_){o.value!==_&&(o.value=_)}function qe(o,_){W("size",o===!0?t.miniWidth:_)}return s.instances[t.side]=Z,qe(t.miniToOverlay,B.value),W("space",S.value),W("offset",i.value),t.showIfAbove===!0&&t.modelValue!==!0&&C.value===!0&&t["onUpdate:modelValue"]!==void 0&&r("update:modelValue",!0),Je(()=>{r("onLayout",S.value),r("miniState",Q.value),x=t.showIfAbove===!0;const o=()=>{(C.value===!0?A:de)(!1,!0)};if(s.totalWidth.value!==0){Ne(o);return}y=T(s.totalWidth,()=>{y(),y=void 0,C.value===!1&&t.showIfAbove===!0&&g.value===!1?ne(!1):o()})}),Le(()=>{y!==void 0&&y(),z!==null&&(clearTimeout(z),z=null),C.value===!0&&Ce(),s.instances[t.side]===Z&&(s.instances[t.side]=void 0,W("size",0),W("offset",0),W("space",!1))}),()=>{const o=[];g.value===!0&&(t.noSwipeOpen===!1&&o.push(G(k("div",{key:"open",class:`q-drawer__opener fixed-${t.side}`,"aria-hidden":"true"}),rt.value)),o.push(je("div",{ref:"backdrop",class:J.value,style:Se.value,"aria-hidden":"true",onClick:K},void 0,"backdrop",t.noSwipeBackdrop!==!0&&C.value===!0,()=>it.value)));const _=Q.value===!0&&u.mini!==void 0,O=[k("div",{...m,key:""+_,class:[ot.value,m.class]},_===!0?u.mini():ue(u.default))];return t.elevated===!0&&C.value===!0&&O.push(k("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),o.push(je("aside",{ref:"content",class:nt.value,style:lt.value},O,"contentclose",t.noSwipeClose!==!0&&g.value===!0,()=>st.value)),k("div",{class:"q-drawer-container"},o)}}}),Yt=oe({name:"QBanner",props:{...Ee,inlineActions:Boolean,dense:Boolean,rounded:Boolean},setup(t,{slots:u}){const{proxy:{$q:r}}=ge(),m=He(t,r),e=c(()=>"q-banner row items-center"+(t.dense===!0?" q-banner--dense":"")+(m.value===!0?" q-banner--dark q-dark":"")+(t.rounded===!0?" rounded-borders":"")),l=c(()=>`q-banner__actions row items-center justify-end col-${t.inlineActions===!0?"auto":"all"}`);return()=>{const n=[k("div",{class:"q-banner__avatar col-auto row items-center self-start"},ue(u.avatar)),k("div",{class:"q-banner__content col text-body2"},ue(u.default))],a=ue(u.action);return a!==void 0&&n.push(k("div",{class:l.value},a)),k("div",{class:e.value+(t.inlineActions===!1&&a!==void 0?" q-banner--top-padding":""),role:"alert"},n)}}}),Rt=oe({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(t,{slots:u,emit:r}){const{proxy:{$q:m}}=ge(),e=Ze(et,le);if(e===le)return console.error("QHeader needs to be child of QLayout"),le;const l=q(parseInt(t.heightHint,10)),n=q(!0),a=c(()=>t.reveal===!0||e.view.value.indexOf("H")!==-1||m.platform.is.ios&&e.isContainer.value===!0),p=c(()=>{if(t.modelValue!==!0)return 0;if(a.value===!0)return n.value===!0?l.value:0;const h=l.value-e.scroll.value.position;return h>0?h:0}),b=c(()=>t.modelValue!==!0||a.value===!0&&n.value!==!0),s=c(()=>t.modelValue===!0&&b.value===!0&&t.reveal===!0),x=c(()=>"q-header q-layout__section--marginal "+(a.value===!0?"fixed":"absolute")+"-top"+(t.bordered===!0?" q-header--bordered":"")+(b.value===!0?" q-header--hidden":"")+(t.modelValue!==!0?" q-layout--prevent-focus":"")),z=c(()=>{const h=e.rows.value.top,A={};return h[0]==="l"&&e.left.space===!0&&(A[m.lang.rtl===!0?"right":"left"]=`${e.left.size}px`),h[2]==="r"&&e.right.space===!0&&(A[m.lang.rtl===!0?"left":"right"]=`${e.right.size}px`),A});function y(h,A){e.update("header",h,A)}function g(h,A){h.value!==A&&(h.value=A)}function Q({height:h}){g(l,h),y("size",h)}function B(h){s.value===!0&&g(n,!0),r("focusin",h)}T(()=>t.modelValue,h=>{y("space",h),g(n,!0),e.animate()}),T(p,h=>{y("offset",h)}),T(()=>t.reveal,h=>{h===!1&&g(n,t.modelValue)}),T(n,h=>{e.animate(),r("reveal",h)}),T(e.scroll,h=>{t.reveal===!0&&g(n,h.direction==="up"||h.position<=t.revealOffset||h.position-h.inflectionPoint<100)});const C={};return e.instances.header=C,t.modelValue===!0&&y("size",l.value),y("space",t.modelValue),y("offset",p.value),Le(()=>{e.instances.header===C&&(e.instances.header=void 0,y("size",0),y("offset",0),y("space",!1))}),()=>{const h=gt(u.default,[]);return t.elevated===!0&&h.push(k("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),h.push(k(Qe,{debounce:0,onResize:Q})),k("header",{class:x.value,style:z.value,onFocusin:B},h)}}}),Wt="/assets/Artboard3.5a8d0451.svg";const Ut={name:"CardStats",props:{statSubtitle:{type:String,default:"Traffic"},statTitle:{type:[String,Number],default:null},statTitle2:{type:[String,Number],default:null},statComplete:{type:[String,Number],default:null},statScan:{type:[String,Number],default:null},statArrow:{type:String,default:"up"},statPercent:{type:[String,Number],default:3.48},statPercentColor:{type:String,default:"text-emerald-500"},statDescripiron:{type:String,default:"Since last month"},statIconName:{type:String,default:"far fa-chart-bar"},statIconColor:{type:String,default:"bg-red-500"},iconColor:{type:String,default:null}},methods:{isSvg(t){return t.endsWith(".svg")}}},Xt={class:"relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"},Kt={class:"flex-auto h-auto p-4"},Zt={class:"flex flex-wrap"},Jt={class:"relative w-full pr-4 max-w-full flex-grow flex-1"},ea={class:"flex flex-wrap items-center"},ta={class:"relative w-auto flex-initial"},aa={class:"p-3 text-center inline-flex items-center justify-center w-6 h-6 shadow-lg rounded-full"},la={class:"text-blueGray-400 q-pl-sm uppercase font-bold text-xs"},oa={class:"pt-1"},na={style:{"font-size":"3rem","line-height":"4rem"},class:"font-semibold text-blueGray-700"},ra={key:0},sa={class:"font-semibold text-xl text-blueGray-700"},ia={key:1},ua={key:2,class:"font-semibold text-xl text-blueGray-700"},ca={key:0},da={class:"mt-6"},va={class:"whitespace-nowrap"},fa={class:"flex items-center"},ma={style:{"font-size":"1.5rem","line-height":"2.3rem"},class:"text-blueGray-400 mt-1"},ha=["src"],ba={class:"pb-1"};function pa(t,u,r,m,e,l){return $(),P("div",Xt,[d("div",Kt,[d("div",Zt,[d("div",Jt,[d("div",ea,[d("div",ta,[d("div",aa,[d("i",{style:St([r.iconColor]),class:Ae([r.statIconName])},null,6)])]),d("h5",la,D(r.statSubtitle),1)]),d("div",oa,[d("span",na,D(r.statTitle),1)]),r.statTitle2?($(),P("div",ra,[d("span",sa,D(r.statTitle2),1)])):Y("",!0),r.statComplete||r.statScan?($(),P("br",ia)):Y("",!0),r.statComplete||r.statScan?($(),P("span",ua,[I(D(r.statComplete)+" ",1),r.statComplete&&r.statScan?($(),P("span",ca," | ")):Y("",!0),I(" "+D(r.statScan),1)])):Y("",!0)])]),d("div",da,[d("div",null,[d("span",va,D(r.statDescripiron),1)]),d("div",fa,[d("p",ma,[d("span",{class:Ae(["mr-2",[r.statPercentColor]])},[l.isSvg(r.statArrow)?($(),P("img",{key:0,src:r.statArrow,class:"inline-block w-5 h-5 mr-2"},null,8,ha)):($(),P("i",{key:1,class:Ae([r.statArrow])},null,2))],2),d("span",ba,D(r.statPercent),1)])])])])])}var _e=tt(Ut,[["render",pa]]);const ya={class:"relative bg-image-2 md:pt-32 pb-32 pt-12"},_a={class:"px-4 md:px-10 mx-auto w-full"},ga={class:"flex flex-wrap"},Sa={key:0,class:"w-full lg:w-6/12 xl:w-3/12 px-4"},wa={key:1,class:"w-full lg:w-6/12 xl:w-3/12 px-4"},xa={key:2,class:"w-full lg:w-6/12 xl:w-3/12 px-4"},za={class:"w-full lg:w-6/12 xl:w-3/12 px-4"},Ca={__name:"HeaderStats",setup(t){const u=Ft(),r=c(()=>u.totalScanCompleteForMonthAndYTD),m=c(()=>u.totalScanForMonthAndYTD),e=c(()=>u.topLocation),l=c(()=>u.getCompanyStatistics),n=new Date().toLocaleString("default",{month:"long"});return(a,p)=>($(),P("div",ya,[d("div",_a,[d("div",null,[d("div",ga,[r.value?($(),P("div",Sa,[v(_e,{"stat-subtitle":"TOTAL CHECKOUT","stat-title":r.value.totalForMonth,"stat-arrow":"../../../src/assets/img/svg/avg.svg","stat-percent":r.value.averageForYTD,"stat-percent-color":"text-emerald-500","stat-descripiron":`Year-to-Date (YTD) for the month of ${j(n)}`,"stat-icon-name":"fas fa-bolt","icon-color":"color:#3e92d1"},null,8,["stat-title","stat-percent","stat-descripiron"])])):Y("",!0),m.value?($(),P("div",wa,[v(_e,{"stat-subtitle":"TOTAL SCAN","stat-title":m.value.totalForMonth,"stat-arrow":"../../../src/assets/img/svg/avg.svg","stat-percent":m.value.averageForYTD,"stat-percent-color":"text-red-500","stat-descripiron":`Year-to-Date (YTD) for the month of ${j(n)}`,"stat-icon-name":"fas fa-qrcode","icon-color":"color:#e59400"},null,8,["stat-title","stat-percent","stat-descripiron"])])):Y("",!0),e.value?($(),P("div",xa,[v(_e,{"stat-subtitle":"TOP LOCATION","stat-title2":e.value.location,"stat-arrow":"../../../src/assets/img/svg/cons.svg","stat-complete":`Checkout: ${e.value.completed}`,"stat-scan":`Scans: ${e.value.scanned}`,"stat-percent":`${e.value.conversionRate} %`,"stat-percent-color":"text-orange-500","stat-descripiron":`Product Name: ${e.value.reigningProduct}`,"stat-icon-name":"fas fa-map-pin","icon-color":"color: #c3352b"},null,8,["stat-title2","stat-complete","stat-scan","stat-percent","stat-descripiron"])])):Y("",!0),d("div",za,[v(_e,{"stat-subtitle":"GENERAL PERFORMANCE","stat-title":l.value.bestYear.percentage,"stat-arrow":"fas fa-bullseye","stat-percent":l.value.bestMonth.count,"stat-percent-color":"text-emerald-500","stat-descripiron":`Best performing moment: ${l.value.bestMonth.monthYear}`,"stat-icon-name":"fas fa-percent","icon-color":"color:#009c4a"},null,8,["stat-title","stat-percent","stat-descripiron"])])])])])]))}},qa={data(){return{date:new Date().getFullYear()}}},ka={class:"block py-4"},Ta={class:"container mx-auto px-4"},$a=d("hr",{class:"mb-4 border-b-1 border-blueGray-200"},null,-1),Ba={class:"flex flex-wrap items-center md:justify-between justify-center"},Aa={class:"w-full md:w-4/12 px-4"},Ma={class:"text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left"},Oa=d("a",{href:"#",class:"text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1"}," Osahene Tech Lab ",-1),Pa=wt('<div class="w-full md:w-8/12 px-4"><ul class="flex flex-wrap list-none md:justify-end justify-center"><li><a href="#" class="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"> Blackmore </a></li><li><a href="#" class="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"> About Us </a></li><li><a href="#" class="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"> Blog </a></li><li><a href="#" class="text-blueGray-600 hover:text-blueGray-800 text-sm font-semibold block py-1 px-3"> MIT License </a></li></ul></div>',1);function Da(t,u,r,m,e,l){return $(),P("footer",ka,[d("div",Ta,[$a,d("div",Ba,[d("div",Aa,[d("div",Ma,[I(" Copyright \xA9 "+D(e.date)+" ",1),Oa])]),Pa])])])}var Qa=tt(qa,[["render",Da]]);const La={class:"q-mr-xs"},Ea={class:"absolute-bottom bg-transparent"},Ha={class:"flex justify-center items-center mt-2"},Fa=["src"],Ia={class:"text-weight-bold"},Va={class:"q-mr-xs"},Na={class:"constrain"},ja=d("b",null,"Install PAQS-Company? ",-1),Ga={class:"relative bg-blueGray-100"},Ya={class:"px-4 md:px-10 mx-auto w-full -m-24"},cl=Object.assign({name:"AdminLayout"},{__name:"Admin",setup(t){const u=q(!1),r=q(!0),m=Ht(),e=Et(),l=q(!1);let n;Je(()=>{e.localStorage.getItem("neverShowInstallBanner")||window.addEventListener("beforeinstallprompt",x=>{x.preventDefault(),n=x,l.value=!0,setTimeout(()=>{l.value=!0},3e3)})}),console.log("hi",l);const a=()=>{l.value=!1,n.prompt(),n.userChoice.then(s=>{s.outcome==="accepted"?(console.log("User accepted the install prompt"),neverShowAppInstallBanner()):console.log("User dismissed the install prompt")})},p=()=>{l.value=!1,e.localStorage.set("neverShowInstallBanner",!0)},b=async()=>{await m.logout()};return(s,x)=>{const z=xt("router-view");return $(),P("div",null,[v(Tt,{view:"lHh Lpr lFf"},{default:w(()=>[j(e).screen.lt.md?($(),U(Vt,{key:0,class:"bg-image-2"},{default:w(()=>[v(ye,{flat:"",dense:"",round:"",onClick:x[0]||(x[0]=y=>u.value=!0),"aria-label":"Menu",icon:"menu"}),v(Me),v(Me),v(Me),d("div",null,[d("h3",null,[I(" Welcome "),d("strong",null,[d("span",La,D(j(m).first_name),1),d("span",null,D(j(m).last_name),1)])])])]),_:1})):Y("",!0),v(Gt,{modelValue:u.value,"onUpdate:modelValue":x[1]||(x[1]=y=>u.value=y),"show-if-above":"",mini:r.value,width:200,breakpoint:500,bordered:"",class:"bg-grey-3",onMouseover:x[2]||(x[2]=y=>r.value=!1),onMouseout:x[3]||(x[3]=y=>r.value=!0)},{default:w(()=>[v(jt,{class:"fit",style:{"margin-top":"10rem"},"horizontal-thumb-style":{opacity:0}},{default:w(()=>[v(qt,{padding:""},{default:w(()=>[G(($(),U(ae,{clickable:"",to:"/dash/main"},{default:w(()=>[v(E,{avatar:""},{default:w(()=>[v(ee,{name:"home"})]),_:1}),v(E,null,{default:w(()=>[I(" Dashboard ")]),_:1})]),_:1})),[[te]]),G(($(),U(ae,{to:"/dash/generate",clickable:""},{default:w(()=>[v(E,{avatar:""},{default:w(()=>[v(ee,{name:"engineering"})]),_:1}),v(E,null,{default:w(()=>[I(" Generate QR Code ")]),_:1})]),_:1})),[[te]]),G(($(),U(ae,{to:"/dash/update",clickable:""},{default:w(()=>[v(E,{avatar:""},{default:w(()=>[v(ee,{name:"update"})]),_:1}),v(E,null,{default:w(()=>[I(" Update ")]),_:1})]),_:1})),[[te]]),G(($(),U(ae,{clickable:"",to:"/dash/table-list"},{default:w(()=>[v(E,{avatar:""},{default:w(()=>[v(ee,{name:"receipt_long"})]),_:1}),v(E,null,{default:w(()=>[I(" Invoice ")]),_:1})]),_:1})),[[te]]),G(($(),U(ae,{clickable:"",to:"/dash/scan"},{default:w(()=>[v(E,{avatar:""},{default:w(()=>[v(ee,{name:"qr_code_scanner"})]),_:1}),v(E,null,{default:w(()=>[I(" QR scanner ")]),_:1})]),_:1})),[[te]]),v(Ct),G(($(),U(ae,{clickable:"",onClick:b},{default:w(()=>[v(E,{avatar:""},{default:w(()=>[v(ee,{name:"logout"})]),_:1}),v(E,null,{default:w(()=>[I(" Logout ")]),_:1})]),_:1})),[[te]])]),_:1})]),_:1}),v(Bt,{class:"absolute-top",src:Wt,style:{height:"150px"}},{default:w(()=>[d("div",Ea,[d("div",Ha,[v(Ge,{size:"100px",class:"q-mb-sm"},{default:w(()=>[d("img",{src:j(m).company_logo,alt:"Company Logo"},null,8,Fa)]),_:1})]),d("div",Ia,[d("span",Va,D(j(m).first_name),1),d("span",null,D(j(m).last_name),1)]),d("div",null,"@"+D(j(m).company_name),1)])]),_:1})]),_:1},8,["modelValue","mini"]),v(Rt,{elevated:"",reveal:"",class:"bg-grey-8",bordered:""},{default:w(()=>[d("div",Na,[l.value?($(),U(Yt,{key:0,"inline-actions":"",dense:"",class:"bg-grey-8 text-white"},{avatar:w(()=>[v(Ge,{color:"grey-9","text-color":"white",icon:"join_left","font-size":"22px"})]),action:w(()=>[v(ye,{flat:"",label:"Yes",dense:"",class:"q-px-sm",onClick:a}),v(ye,{flat:"",label:"Later",dense:"",class:"q-px-sm",onClick:x[4]||(x[4]=y=>l.value=!1)}),v(ye,{flat:"",label:"Never",dense:"",class:"q-px-sm",onClick:p})]),default:w(()=>[ja]),_:1})):Y("",!0)])]),_:1}),v($t,null,{default:w(()=>[v(Lt,null,{default:w(()=>[d("div",Ga,[v(Ca),d("div",Ya,[v(z),v(Qa)])])]),_:1})]),_:1})]),_:1})])}}});export{cl as default};
