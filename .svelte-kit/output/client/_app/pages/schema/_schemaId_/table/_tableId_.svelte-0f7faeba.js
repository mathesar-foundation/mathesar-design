import{S as le,i as ae,s as re,N as oe,l as K,g as C,O as se,q as b,o as d,d as h,R as X,$ as ie,Y as fe,e as j,t as Y,c as B,a as N,h as A,f as ne,M as k,E as w,w as y,x as E,y as T,B as D,k as I,m as z,b as W,n as Q,p as R}from"../../../../chunks/index-bed072e4.js";import{l as me,s as Z}from"../../../../chunks/utils-c922859c.js";import{p as ce}from"../../../../chunks/stores-0b62df75.js";import{w as ue}from"../../../../chunks/index-e0a8e33b.js";import pe from"../Toolbar.svelte-a8726096.js";import be from"./LinkTableWizard.svelte-d84e3886.js";import _e from"../../../TopNav.svelte-34dab812.js";import de from"../Table.svelte-6527ee69.js";import $e from"./Query.svelte-924ac38f.js";import he from"./Design.svelte-388f3d70.js";import ge from"../SideBar.svelte-992465c0.js";import ke from"../Tabs.svelte-c2d49e21.js";import"../../../../chunks/randomColor-af782e7b.js";import"../../../../chunks/lodash-8a03b776.js";import"../../../../chunks/v4-bf0bf616.js";import"../../../../chunks/themes-fa5ad8e6.js";import"../../../../chunks/iconMap-7a0cdc3f.js";import"../../../../chunks/Dropdown-c142f7f6.js";import"../../../../chunks/Modal-e470a048.js";import"./Question.svelte-a32b0295.js";import"../Column.svelte-5aecc7f6.js";import"../Cell.svelte-b38f3a3f.js";let x=ue({id:null,name:null,columns:[],records:[],type:null});function we(o){let t,a=o[15].message+"",e;return{c(){t=j("p"),e=Y(a),this.h()},l(n){t=B(n,"P",{style:!0});var s=N(t);e=A(s,a),s.forEach(h),this.h()},h(){ne(t,"color","red")},m(n,s){C(n,t,s),k(t,e)},p:w,i:w,o:w,d(n){n&&h(t)}}}function ve(o){let t,a,e,n,s,f,c,M,_,O,V,S,u,p,q,g,L;t=new _e({props:{schema:o[0]}}),n=new ge({props:{schema:o[0]}}),n.$on("openObject",o[9]),c=new ke({}),_=new pe({props:{table:o[1]}}),_.$on("switch",o[6]),_.$on("linkTable",o[7]),_.$on("CreateView",o[10]);let r=o[2]=="edit"&&ee(o),m=o[2]=="query"&&te(o);const F=[Ee,ye],v=[];function G(l,i){return l[1]&&l[1].columns?0:l[1]&&l[1].type=="table"?1:-1}return~(u=G(o))&&(p=v[u]=F[u](o)),g=new be({props:{table:o[1],tables:o[4].tables,showModal:o[3]}}),{c(){y(t.$$.fragment),a=I(),e=j("div"),y(n.$$.fragment),s=I(),f=j("div"),y(c.$$.fragment),M=I(),y(_.$$.fragment),O=I(),r&&r.c(),V=I(),m&&m.c(),S=I(),p&&p.c(),q=I(),y(g.$$.fragment),this.h()},l(l){E(t.$$.fragment,l),a=z(l),e=B(l,"DIV",{class:!0});var i=N(e);E(n.$$.fragment,i),s=z(i),f=B(i,"DIV",{class:!0,style:!0});var $=N(f);E(c.$$.fragment,$),M=z($),E(_.$$.fragment,$),O=z($),r&&r.l($),V=z($),m&&m.l($),S=z($),p&&p.l($),$.forEach(h),i.forEach(h),q=z(l),E(g.$$.fragment,l),this.h()},h(){W(f,"class","flex overflow-hidden flex-col h-full flex-grow"),ne(f,"height","calc(100vh - 52px)"),W(e,"class","w-screen flex bg-zinc-100 bg-opacity-10")},m(l,i){T(t,l,i),C(l,a,i),C(l,e,i),T(n,e,null),k(e,s),k(e,f),T(c,f,null),k(f,M),T(_,f,null),k(f,O),r&&r.m(f,null),k(f,V),m&&m.m(f,null),k(f,S),~u&&v[u].m(f,null),C(l,q,i),T(g,l,i),L=!0},p(l,i){const $={};i&1&&($.schema=l[0]),t.$set($);const H={};i&1&&(H.schema=l[0]),n.$set(H);const J={};i&2&&(J.table=l[1]),_.$set(J),l[2]=="edit"?r?(r.p(l,i),i&4&&b(r,1)):(r=ee(l),r.c(),b(r,1),r.m(f,V)):r&&(Q(),d(r,1,1,()=>{r=null}),R()),l[2]=="query"?m?(m.p(l,i),i&4&&b(m,1)):(m=te(l),m.c(),b(m,1),m.m(f,S)):m&&(Q(),d(m,1,1,()=>{m=null}),R());let U=u;u=G(l),u===U?~u&&v[u].p(l,i):(p&&(Q(),d(v[U],1,1,()=>{v[U]=null}),R()),~u?(p=v[u],p?p.p(l,i):(p=v[u]=F[u](l),p.c()),b(p,1),p.m(f,null)):p=null);const P={};i&2&&(P.table=l[1]),i&8&&(P.showModal=l[3]),g.$set(P)},i(l){L||(b(t.$$.fragment,l),b(n.$$.fragment,l),b(c.$$.fragment,l),b(_.$$.fragment,l),b(r),b(m),b(p),b(g.$$.fragment,l),L=!0)},o(l){d(t.$$.fragment,l),d(n.$$.fragment,l),d(c.$$.fragment,l),d(_.$$.fragment,l),d(r),d(m),d(p),d(g.$$.fragment,l),L=!1},d(l){D(t,l),l&&h(a),l&&h(e),D(n),D(c),D(_),r&&r.d(),m&&m.d(),~u&&v[u].d(),l&&h(q),D(g,l)}}}function ee(o){let t,a;return t=new he({props:{table:o[1]}}),{c(){y(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){T(t,e,n),a=!0},p(e,n){const s={};n&2&&(s.table=e[1]),t.$set(s)},i(e){a||(b(t.$$.fragment,e),a=!0)},o(e){d(t.$$.fragment,e),a=!1},d(e){D(t,e)}}}function te(o){let t,a;return t=new $e({props:{allowed:o[1].allowEdit,table:o[1]}}),{c(){y(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){T(t,e,n),a=!0},p(e,n){const s={};n&2&&(s.allowed=e[1].allowEdit),n&2&&(s.table=e[1]),t.$set(s)},i(e){a||(b(t.$$.fragment,e),a=!0)},o(e){d(t.$$.fragment,e),a=!1},d(e){D(t,e)}}}function ye(o){let t,a;return{c(){t=j("div"),a=Y("Table has no columns"),this.h()},l(e){t=B(e,"DIV",{class:!0});var n=N(t);a=A(n,"Table has no columns"),n.forEach(h),this.h()},h(){W(t,"class","p-5 text-zinc-800")},m(e,n){C(e,t,n),k(t,a)},p:w,i:w,o:w,d(e){e&&h(t)}}}function Ee(o){let t,a;return t=new de({props:{table:o[1]}}),{c(){y(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){T(t,e,n),a=!0},p(e,n){const s={};n&2&&(s.table=e[1]),t.$set(s)},i(e){a||(b(t.$$.fragment,e),a=!0)},o(e){d(t.$$.fragment,e),a=!1},d(e){D(t,e)}}}function Te(o){let t,a;return{c(){t=j("div"),a=Y("Loading (can be removed)")},l(e){t=B(e,"DIV",{});var n=N(t);a=A(n,"Loading (can be removed)"),n.forEach(h)},m(e,n){C(e,t,n),k(t,a)},p:w,i:w,o:w,d(e){e&&h(t)}}}function De(o){let t,a,e={ctx:o,current:null,token:null,hasCatch:!0,pending:Te,then:ve,catch:we,value:4,error:15,blocks:[,,,]};return oe(o[5](),e),{c(){t=K(),e.block.c()},l(n){t=K(),e.block.l(n)},m(n,s){C(n,t,s),e.block.m(n,e.anchor=s),e.mount=()=>t.parentNode,e.anchor=t,a=!0},p(n,[s]){o=n,se(e,o,s)},i(n){a||(b(e.block),a=!0)},o(n){for(let s=0;s<3;s+=1){const f=e.blocks[s];d(f)}a=!1},d(n){n&&h(t),e.block.d(n),e.token=null,e=null}}}function Ve(o,t,a){let e,n;X(o,x,r=>a(11,e=r)),X(o,ce,r=>a(12,n=r));let{schemaId:s}=n.params,{tableId:f}=n.params;ie(x,e.viewDetails=!1,e);let c={},M={},_={},O="table",V=!1;async function S(){if(a(4,c=await me()),a(0,M=c.schemas.find(r=>r.id==s)),a(1,_=c.tables.find(r=>r.id==f)),!(!c||!c.schemas||!c.tables))return c}fe(()=>{Z(c)});function u(r){let{mode:m}=r.detail;a(2,O=m)}function p(r){a(3,V=!0)}function q(r){c.queries.push(r),a(4,c),Z(c),setTimeout(function(){window.location=`/schema/${_.schema.id}/${r.id}`},200)}return[M,_,O,V,c,S,u,p,q,r=>window.location=`/schema/0/${r.detail.type}/${r.detail.id}`,r=>q(r.detail)]}class Ke extends le{constructor(t){super();ae(this,t,Ve,De,re,{})}}export{Ke as default};
