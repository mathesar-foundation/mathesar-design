import{S as Le,i as Me,s as Qe,N as Ye,l as Se,g as M,O as Fe,q as $e,o as ke,d as o,R as Je,Y as Ke,e as i,t as $,c as d,a as h,h as k,f as We,M as t,E as L,k as y,m as V,b as p,j as X,w as Be,x as je,y as ze,B as He,Q as Xe}from"../../../chunks/index-bed072e4.js";import{p as Ze}from"../../../chunks/stores-0b62df75.js";import et from"../../TopNav.svelte-34dab812.js";import{_ as Pe}from"../../../chunks/lodash-8a03b776.js";import{l as tt,s as at}from"../../../chunks/utils-c922859c.js";import lt from"./SideBar.svelte-992465c0.js";import"../../../chunks/Dropdown-c142f7f6.js";import"../../../chunks/themes-fa5ad8e6.js";import"../../../chunks/randomColor-af782e7b.js";import"../../../chunks/v4-bf0bf616.js";import"../../../chunks/iconMap-7a0cdc3f.js";function Ue(n,e,c){const a=n.slice();return a[6]=e[c],a}function st(n){let e,c=n[9].message+"",a;return{c(){e=i("p"),a=$(c),this.h()},l(l){e=d(l,"P",{style:!0});var r=h(e);a=k(r,c),r.forEach(o),this.h()},h(){We(e,"color","red")},m(l,r){M(l,e,r),t(e,a)},p:L,i:L,o:L,d(l){l&&o(e)}}}function rt(n){let e,c,a,l,r,u,g,v,f=Pe.startCase(n[0].name.slice(0,2))+"",T,le,C,B,Q=n[0].name+"",Z,se,D,Y=n[0].tables.filter(qe).length+"",ee,re,F=n[0].tables.filter(Ge).length+"",te,ne,oe,_,j,z,ce,ie,N,de,H,P,he,fe,U,ue,pe,R,q,ve,me,A,J,_e,be,K,ge,x;e=new et({props:{schema:n[0]}}),l=new lt({props:{expanded:!0,schema:n[0]}}),l.$on("openObject",n[2]);let G=n[0].tables,b=[];for(let s=0;s<G.length;s+=1)b[s]=Re(Ue(n,G,s));return{c(){Be(e.$$.fragment),c=y(),a=i("div"),Be(l.$$.fragment),r=y(),u=i("div"),g=i("div"),v=i("div"),T=$(f),le=y(),C=i("div"),B=i("h2"),Z=$(Q),se=y(),D=i("p"),ee=$(Y),re=$(` Tables
            `),te=$(F),ne=$(" Views"),oe=y(),_=i("div"),j=i("div"),z=i("h3"),ce=$("Recent"),ie=y(),N=i("div");for(let s=0;s<b.length;s+=1)b[s].c();de=y(),H=i("div"),P=i("h3"),he=$("Activity"),fe=y(),U=i("p"),ue=$("No Activity"),pe=y(),R=i("div"),q=i("h3"),ve=$("Get Started"),me=y(),A=i("div"),J=i("button"),_e=$("Create a Table"),be=y(),K=i("button"),ge=$("Create a View"),this.h()},l(s){je(e.$$.fragment,s),c=V(s),a=d(s,"DIV",{class:!0});var m=h(a);je(l.$$.fragment,m),r=V(m),u=d(m,"DIV",{class:!0});var I=h(u);g=d(I,"DIV",{class:!0});var O=h(g);v=d(O,"DIV",{class:!0});var E=h(v);T=k(E,f),E.forEach(o),le=V(O),C=d(O,"DIV",{});var S=h(C);B=d(S,"H2",{class:!0});var we=h(B);Z=k(we,Q),we.forEach(o),se=V(S),D=d(S,"P",{class:!0});var W=h(D);ee=k(W,Y),re=k(W,` Tables
            `),te=k(W,F),ne=k(W," Views"),W.forEach(o),S.forEach(o),O.forEach(o),oe=V(I),_=d(I,"DIV",{class:!0});var w=h(_);j=d(w,"DIV",{class:!0});var ye=h(j);z=d(ye,"H3",{class:!0});var Ve=h(z);ce=k(Ve,"Recent"),Ve.forEach(o),ye.forEach(o),ie=V(w),N=d(w,"DIV",{class:!0});var Ie=h(N);for(let Ee=0;Ee<b.length;Ee+=1)b[Ee].l(Ie);Ie.forEach(o),de=V(w),H=d(w,"DIV",{class:!0});var De=h(H);P=d(De,"H3",{class:!0});var xe=h(P);he=k(xe,"Activity"),xe.forEach(o),De.forEach(o),fe=V(w),U=d(w,"P",{class:!0});var Te=h(U);ue=k(Te,"No Activity"),Te.forEach(o),pe=V(w),R=d(w,"DIV",{class:!0});var Ce=h(R);q=d(Ce,"H3",{class:!0});var Ne=h(q);ve=k(Ne,"Get Started"),Ne.forEach(o),Ce.forEach(o),me=V(w),A=d(w,"DIV",{});var ae=h(A);J=d(ae,"BUTTON",{});var Ae=h(J);_e=k(Ae,"Create a Table"),Ae.forEach(o),be=V(ae),K=d(ae,"BUTTON",{});var Oe=h(K);ge=k(Oe,"Create a View"),Oe.forEach(o),ae.forEach(o),w.forEach(o),I.forEach(o),m.forEach(o),this.h()},h(){p(v,"class","bg-indigo-500 text-white text-2xl py-2 w-12 text-center rounded"),p(B,"class","text-xl font-semibold"),p(D,"class","text-sm text-zinc-500"),p(g,"class","flex items-center space-x-2 bg-opacity-10 p-8 bg-indigo-500"),p(z,"class","text-lg"),p(j,"class","border-b py-2"),p(N,"class","flex items-center space-x-4"),p(P,"class","text-lg"),p(H,"class","border-b py-2"),p(U,"class","text-zinc-500"),p(q,"class","text-lg"),p(R,"class","border-b py-2"),p(_,"class","px-8 space-y-4"),p(u,"class","space-y-4 w-full text-zinc-800"),p(a,"class","flex flex-grow bg-zinc-100 bg-opacity-10")},m(s,m){ze(e,s,m),M(s,c,m),M(s,a,m),ze(l,a,null),t(a,r),t(a,u),t(u,g),t(g,v),t(v,T),t(g,le),t(g,C),t(C,B),t(B,Z),t(C,se),t(C,D),t(D,ee),t(D,re),t(D,te),t(D,ne),t(u,oe),t(u,_),t(_,j),t(j,z),t(z,ce),t(_,ie),t(_,N);for(let I=0;I<b.length;I+=1)b[I].m(N,null);t(_,de),t(_,H),t(H,P),t(P,he),t(_,fe),t(_,U),t(U,ue),t(_,pe),t(_,R),t(R,q),t(q,ve),t(_,me),t(_,A),t(A,J),t(J,_e),t(A,be),t(A,K),t(K,ge),x=!0},p(s,m){const I={};m&1&&(I.schema=s[0]),e.$set(I);const O={};if(m&1&&(O.schema=s[0]),l.$set(O),(!x||m&1)&&f!==(f=Pe.startCase(s[0].name.slice(0,2))+"")&&X(T,f),(!x||m&1)&&Q!==(Q=s[0].name+"")&&X(Z,Q),(!x||m&1)&&Y!==(Y=s[0].tables.filter(qe).length+"")&&X(ee,Y),(!x||m&1)&&F!==(F=s[0].tables.filter(Ge).length+"")&&X(te,F),m&1){G=s[0].tables;let E;for(E=0;E<G.length;E+=1){const S=Ue(s,G,E);b[E]?b[E].p(S,m):(b[E]=Re(S),b[E].c(),b[E].m(N,null))}for(;E<b.length;E+=1)b[E].d(1);b.length=G.length}},i(s){x||($e(e.$$.fragment,s),$e(l.$$.fragment,s),x=!0)},o(s){ke(e.$$.fragment,s),ke(l.$$.fragment,s),x=!1},d(s){He(e,s),s&&o(c),s&&o(a),He(l),Xe(b,s)}}}function Re(n){let e,c,a,l,r=n[6].name+"",u,g;return{c(){e=i("a"),c=i("i"),a=y(),l=i("span"),u=$(r),this.h()},l(v){e=d(v,"A",{class:!0,href:!0});var f=h(e);c=d(f,"I",{class:!0}),h(c).forEach(o),a=V(f),l=d(f,"SPAN",{});var T=h(l);u=k(T,r),T.forEach(o),f.forEach(o),this.h()},h(){p(c,"class","ri-table-fill align-bottom"),p(e,"class","block border-2 space-x-1 p-4 rounded w-64"),p(e,"href",g="./"+n[0].id+"/table/"+n[6].id)},m(v,f){M(v,e,f),t(e,c),t(e,a),t(e,l),t(l,u)},p(v,f){f&1&&r!==(r=v[6].name+"")&&X(u,r),f&1&&g!==(g="./"+v[0].id+"/table/"+v[6].id)&&p(e,"href",g)},d(v){v&&o(e)}}}function nt(n){let e,c;return{c(){e=i("div"),c=$("Loading (can be removed)")},l(a){e=d(a,"DIV",{});var l=h(e);c=k(l,"Loading (can be removed)"),l.forEach(o)},m(a,l){M(a,e,l),t(e,c)},p:L,i:L,o:L,d(a){a&&o(e)}}}function ot(n){let e,c,a={ctx:n,current:null,token:null,hasCatch:!0,pending:nt,then:rt,catch:st,value:4,error:9,blocks:[,,,]};return Ye(n[1](),a),{c(){e=Se(),a.block.c()},l(l){e=Se(),a.block.l(l)},m(l,r){M(l,e,r),a.block.m(l,a.anchor=r),a.mount=()=>e.parentNode,a.anchor=e,c=!0},p(l,[r]){n=l,Fe(a,n,r)},i(l){c||($e(a.block),c=!0)},o(l){for(let r=0;r<3;r+=1){const u=a.blocks[r];ke(u)}c=!1},d(l){l&&o(e),a.block.d(l),a.token=null,a=null}}}const qe=n=>n.type=="table",Ge=n=>n.type=="view";function ct(n,e,c){let a;Je(n,Ze,f=>c(3,a=f));const{schemaId:l}=a.params;let r,u={};async function g(){if(r=await tt(),c(0,u=r.schemas.find(f=>f.id==l)),c(0,u),!(!r||!r.schemas||!r.tables))return r}return Ke(()=>{at(r)}),[u,g,f=>window.location=`/schema/0/${f.detail.type}/${f.detail.id}`]}class Et extends Le{constructor(e){super();Me(this,e,ct,ot,Qe,{})}}export{Et as default};
