import{S as _e,i as he,s as ve,w as re,x as ie,y as ae,q as N,o as U,B as ce,Z as be,e as E,t as S,k as D,l as G,c as w,a as F,h as x,d as a,m as C,b as g,g as V,M as f,n as ue,p as fe,Q as me,_ as te,P as H,G as de,E as ge}from"../../../../chunks/index-bed072e4.js";import{M as ye}from"../../../../chunks/Modal-e470a048.js";import"../../../../chunks/randomColor-af782e7b.js";import"../../../../chunks/lodash-8a03b776.js";import Ee from"./ColumnSelector.svelte-046b3d09.js";import"../../../../chunks/themes-fa5ad8e6.js";import"../../../../chunks/utils-c922859c.js";import"../../../../chunks/v4-bf0bf616.js";import"./Column.svelte-4e7a61f9.js";import"../../../../chunks/iconMap-7a0cdc3f.js";function le(c,e,s){const l=c.slice();return l[11]=e[s],l}function oe(c,e,s){const l=c.slice();return l[14]=e[s],l}function we(c){let e,s,l,n,r;return n=new Ee({props:{columns:c[3],view:c[2]}}),{c(){e=E("div"),s=S("Select Column"),l=D(),re(n.$$.fragment)},l(t){e=w(t,"DIV",{});var u=F(e);s=x(u,"Select Column"),u.forEach(a),l=C(t),ie(n.$$.fragment,t)},m(t,u){V(t,e,u),f(e,s),V(t,l,u),ae(n,t,u),r=!0},p(t,u){const v={};u&8&&(v.columns=t[3]),u&4&&(v.view=t[2]),n.$set(v)},i(t){r||(N(n.$$.fragment,t),r=!0)},o(t){U(n.$$.fragment,t),r=!1},d(t){t&&a(e),t&&a(l),ce(n,t)}}}function Ie(c){let e,s,l,n;return{c(){e=E("div"),s=S("Select Integer"),l=D(),n=E("input"),this.h()},l(r){e=w(r,"DIV",{});var t=F(e);s=x(t,"Select Integer"),t.forEach(a),l=C(r),n=w(r,"INPUT",{type:!0,class:!0}),this.h()},h(){g(n,"type","text"),g(n,"class","bg-zinc-100 p-2 rounded bg-opacity-60 w-64")},m(r,t){V(r,e,t),f(e,s),V(r,l,t),V(r,n,t)},d(r){r&&a(e),r&&a(l),r&&a(n)}}}function se(c){let e,s,l,n=c[14].type=="column"&&we(c),r=c[14].type=="integer"&&Ie();return{c(){n&&n.c(),e=D(),r&&r.c(),s=G()},l(t){n&&n.l(t),e=C(t),r&&r.l(t),s=G()},m(t,u){n&&n.m(t,u),V(t,e,u),r&&r.m(t,u),V(t,s,u),l=!0},p(t,u){t[14].type=="column"&&n.p(t,u)},i(t){l||(N(n),l=!0)},o(t){U(n),l=!1},d(t){n&&n.d(t),t&&a(e),r&&r.d(t),t&&a(s)}}}function ne(c){let e,s,l=c[11].name+"",n,r,t,u,v,y,_,I=c[11].arguments,i=[];for(let o=0;o<I.length;o+=1)i[o]=se(oe(c,I,o));const T=o=>U(i[o],1,1,()=>{i[o]=null});return{c(){e=E("h4"),s=S("Set Variables for "),n=S(l),r=D(),t=E("p"),u=S("To use this formula, you'll need to set some options:"),v=D();for(let o=0;o<i.length;o+=1)i[o].c();y=G(),this.h()},l(o){e=w(o,"H4",{class:!0});var d=F(e);s=x(d,"Set Variables for "),n=x(d,l),d.forEach(a),r=C(o),t=w(o,"P",{});var m=F(t);u=x(m,"To use this formula, you'll need to set some options:"),m.forEach(a),v=C(o);for(let z=0;z<i.length;z+=1)i[z].l(o);y=G(),this.h()},h(){g(e,"class","capitalize")},m(o,d){V(o,e,d),f(e,s),f(e,n),V(o,r,d),V(o,t,d),f(t,u),V(o,v,d);for(let m=0;m<i.length;m+=1)i[m].m(o,d);V(o,y,d),_=!0},p(o,d){if(d&140){I=o[11].arguments;let m;for(m=0;m<I.length;m+=1){const z=oe(o,I,m);i[m]?(i[m].p(z,d),N(i[m],1)):(i[m]=se(z),i[m].c(),N(i[m],1),i[m].m(y.parentNode,y))}for(ue(),m=I.length;m<i.length;m+=1)T(m);fe()}},i(o){if(!_){for(let d=0;d<I.length;d+=1)N(i[d]);_=!0}},o(o){i=i.filter(Boolean);for(let d=0;d<i.length;d+=1)U(i[d]);_=!1},d(o){o&&a(e),o&&a(r),o&&a(t),o&&a(v),me(i,o),o&&a(y)}}}function ke(c){let e,s,l,n,r,t,u,v,y,_,I,i,T,o,d,m,z,Q,Z,A,M,q,j,K,B=c[7],b=[];for(let p=0;p<B.length;p+=1)b[p]=ne(le(c,B,p));const pe=p=>U(b[p],1,1,()=>{b[p]=null});return{c(){e=E("div"),s=E("div"),l=E("label"),n=S("Column Name"),r=D(),t=E("input"),u=D(),v=E("div"),y=E("div"),_=E("div"),I=E("div"),i=S("Functions"),T=D(),o=E("div"),d=S("String Functions"),m=D(),z=E("div"),Q=S("Count"),Z=D(),A=E("div"),M=E("div");for(let p=0;p<b.length;p+=1)b[p].c();this.h()},l(p){e=w(p,"DIV",{slot:!0,class:!0});var k=F(e);s=w(k,"DIV",{class:!0});var h=F(s);l=w(h,"LABEL",{class:!0,for:!0});var O=F(l);n=x(O,"Column Name"),O.forEach(a),r=C(h),t=w(h,"INPUT",{type:!0,class:!0,placeholder:!0}),h.forEach(a),u=C(k),v=w(k,"DIV",{class:!0});var L=F(v);y=w(L,"DIV",{class:!0});var R=F(y);_=w(R,"DIV",{class:!0});var P=F(_);I=w(P,"DIV",{class:!0});var W=F(I);i=x(W,"Functions"),W.forEach(a),T=C(P),o=w(P,"DIV",{class:!0});var X=F(o);d=x(X,"String Functions"),X.forEach(a),m=C(P),z=w(P,"DIV",{class:!0});var Y=F(z);Q=x(Y,"Count"),Y.forEach(a),P.forEach(a),R.forEach(a),Z=C(L),A=w(L,"DIV",{class:!0});var $=F(A);M=w($,"DIV",{class:!0});var ee=F(M);for(let J=0;J<b.length;J+=1)b[J].l(ee);ee.forEach(a),$.forEach(a),L.forEach(a),k.forEach(a),this.h()},h(){g(l,"class","text-zinc-800 block"),g(l,"for",""),g(t,"type","text"),g(t,"class","p-2 w-full bg-opacity-30 rounded bg-zinc-100 text-zinc-800"),g(t,"placeholder","Column Name"),g(s,"class","space-y-2"),g(I,"class","text-lg"),g(o,"class","text-zinc-500"),g(z,"class","hover:bg-opacity-90 bg-zinc-200 bg-opacity-60 cursor-pointer py-1 px-2 rounded"),g(_,"class","border border-zinc-200 rounded text-zinc-800 h-full p-2 space-y-2"),g(y,"class","col-span-2"),g(M,"class","border p-2 h-full rounded space-y-2 text-zinc-800 border-zinc-200"),g(A,"class","col-span-4"),g(v,"class","grid grid-cols-6 flex-grow gap-4"),g(e,"slot","body"),g(e,"class","space-y-4 h-full flex flex-col")},m(p,k){V(p,e,k),f(e,s),f(s,l),f(l,n),f(s,r),f(s,t),te(t,c[1].name),f(e,u),f(e,v),f(v,y),f(y,_),f(_,I),f(I,i),f(_,T),f(_,o),f(o,d),f(_,m),f(_,z),f(z,Q),f(v,Z),f(v,A),f(A,M);for(let h=0;h<b.length;h+=1)b[h].m(M,null);q=!0,j||(K=[H(t,"input",c[8]),H(z,"click",c[9])],j=!0)},p(p,k){if(k&2&&t.value!==p[1].name&&te(t,p[1].name),k&140){B=p[7];let h;for(h=0;h<B.length;h+=1){const O=le(p,B,h);b[h]?(b[h].p(O,k),N(b[h],1)):(b[h]=ne(O),b[h].c(),N(b[h],1),b[h].m(M,null))}for(ue(),h=B.length;h<b.length;h+=1)pe(h);fe()}},i(p){if(!q){for(let k=0;k<B.length;k+=1)N(b[k]);q=!0}},o(p){b=b.filter(Boolean);for(let k=0;k<b.length;k+=1)U(b[k]);q=!1},d(p){p&&a(e),me(b,p),j=!1,de(K)}}}function Fe(c){let e,s,l,n,r,t,u,v;return{c(){e=E("div"),s=E("button"),l=S("Cancel"),n=D(),r=E("button"),t=S("Apply"),this.h()},l(y){e=w(y,"DIV",{slot:!0,class:!0});var _=F(e);s=w(_,"BUTTON",{class:!0});var I=F(s);l=x(I,"Cancel"),I.forEach(a),n=C(_),r=w(_,"BUTTON",{class:!0});var i=F(r);t=x(i,"Apply"),i.forEach(a),_.forEach(a),this.h()},h(){g(s,"class","p-2 bg-zinc-200 text-zinc-800 rounded"),g(r,"class","p-2 bg-zinc-100 text-zinc-800 rounded"),g(e,"slot","footer"),g(e,"class","p-6 text-right space-x-1")},m(y,_){V(y,e,_),f(e,s),f(s,l),f(e,n),f(e,r),f(r,t),u||(v=[H(s,"click",c[5]),H(r,"click",c[6])],u=!0)},p:ge,d(y){y&&a(e),u=!1,de(v)}}}function ze(c){let e,s;return e=new ye({props:{title:"Add New Formula Column",open:c[0],$$slots:{footer:[Fe],body:[ke]},$$scope:{ctx:c}}}),e.$on("close",c[5]),{c(){re(e.$$.fragment)},l(l){ie(e.$$.fragment,l)},m(l,n){ae(e,l,n),s=!0},p(l,[n]){const r={};n&1&&(r.open=l[0]),n&131102&&(r.$$scope={dirty:n,ctx:l}),e.$set(r)},i(l){s||(N(e.$$.fragment,l),s=!0)},o(l){U(e.$$.fragment,l),s=!1},d(l){ce(e,l)}}}function Ve(c,e,s){let{showFormulaModal:l}=e,{activeFormula:n}=e;const r=be();let{view:t}=e,{columns:u}=e,v="";function y(){s(0,l=!1)}function _(){r("updateFormula",n),s(0,l=!1)}let I=[{name:"count",arguments:[{type:"column"},{type:"integer"}]}];function i(){n.name=this.value,s(1,n)}const T=()=>{s(4,v+="COUNT( )")};return c.$$set=o=>{"showFormulaModal"in o&&s(0,l=o.showFormulaModal),"activeFormula"in o&&s(1,n=o.activeFormula),"view"in o&&s(2,t=o.view),"columns"in o&&s(3,u=o.columns)},[l,n,t,u,v,y,_,I,i,T]}class Pe extends _e{constructor(e){super();he(this,e,Ve,ze,ve,{showFormulaModal:0,activeFormula:1,view:2,columns:3})}}export{Pe as default};
