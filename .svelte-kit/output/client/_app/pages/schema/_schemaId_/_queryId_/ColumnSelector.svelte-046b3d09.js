import{S as $e,i as Te,s as Ce,e as N,t as M,k as K,c as S,a as A,h as j,d as k,m as U,b as D,a9 as y,g as P,M as E,P as oe,o as B,p as Q,q as w,G as Ee,u as Ie,Z as Ve,n as R,j as Z,l as G,E as te,Q as J,w as L,x as O,y as W,B as X}from"../../../../chunks/index-bed072e4.js";import{e as we,i as x}from"../../../../chunks/utils-c922859c.js";import Y from"./Column.svelte-4e7a61f9.js";import"../../../../chunks/randomColor-af782e7b.js";import"../../../../chunks/lodash-8a03b776.js";import"../../../../chunks/v4-bf0bf616.js";import"../../../../chunks/iconMap-7a0cdc3f.js";function se(t,l,n){const e=t.slice();return e[20]=l[n],e}function ae(t,l,n){const e=t.slice();return e[17]=l[n],e}function re(t,l,n){const e=t.slice();return e[20]=l[n],e}function ie(t,l,n){const e=t.slice();return e[23]=l[n],e}function ue(t,l,n){const e=t.slice();return e[26]=l[n],e}function fe(t,l,n){const e=t.slice();return e[20]=l[n],e}function ce(t,l,n){const e=t.slice();return e[23]=l[n],e}function _e(t,l,n){const e=t.slice();return e[26]=l[n],e}function De(t){let l,n=t[1].columns,e=[];for(let o=0;o<n.length;o+=1)e[o]=me(se(t,n,o));return{c(){for(let o=0;o<e.length;o+=1)e[o].c();l=G()},l(o){for(let r=0;r<e.length;r+=1)e[r].l(o);l=G()},m(o,r){for(let d=0;d<e.length;d+=1)e[d].m(o,r);P(o,l,r)},p(o,r){if(r[0]&2){n=o[1].columns;let d;for(d=0;d<n.length;d+=1){const b=se(o,n,d);e[d]?e[d].p(b,r):(e[d]=me(b),e[d].c(),e[d].m(l.parentNode,l))}for(;d<e.length;d+=1)e[d].d(1);e.length=n.length}},i:te,o:te,d(o){J(e,o),o&&k(l)}}}function Ne(t){let l,n,e,o,r,d=t[2].name+"",b,g,f,_,p,I,C=t[2].columns,m=[];for(let u=0;u<C.length;u+=1)m[u]=be(fe(t,C,u));const $=u=>B(m[u],1,1,()=>{m[u]=null});let c=t[0].filter(t[11]),s=[];for(let u=0;u<c.length;u+=1)s[u]=ke(ae(t,c,u));const i=u=>B(s[u],1,1,()=>{s[u]=null});return{c(){l=N("div"),n=N("input"),e=K(),o=N("div"),r=N("div"),b=M(d),f=K();for(let u=0;u<m.length;u+=1)m[u].c();_=K();for(let u=0;u<s.length;u+=1)s[u].c();p=G(),this.h()},l(u){l=S(u,"DIV",{class:!0});var a=A(l);n=S(a,"INPUT",{type:!0,placeholder:!0,class:!0}),a.forEach(k),e=U(u),o=S(u,"DIV",{class:!0});var h=A(o);r=S(h,"DIV",{class:!0});var v=A(r);b=j(v,d),v.forEach(k),h.forEach(k),f=U(u);for(let q=0;q<m.length;q+=1)m[q].l(u);_=U(u);for(let q=0;q<s.length;q+=1)s[q].l(u);p=G(),this.h()},h(){D(n,"type","text"),D(n,"placeholder","Search Columns"),D(n,"class","p-2 bg-zinc-100"),D(l,"class","grid"),D(r,"class",g="bg-["+t[2].color+"] w-max px-1 rounded"),D(o,"class","p-2")},m(u,a){P(u,l,a),E(l,n),P(u,e,a),P(u,o,a),E(o,r),E(r,b),P(u,f,a);for(let h=0;h<m.length;h+=1)m[h].m(u,a);P(u,_,a);for(let h=0;h<s.length;h+=1)s[h].m(u,a);P(u,p,a),I=!0},p(u,a){if((!I||a[0]&4)&&d!==(d=u[2].name+"")&&Z(b,d),(!I||a[0]&4&&g!==(g="bg-["+u[2].color+"] w-max px-1 rounded"))&&D(r,"class",g),a[0]&20){C=u[2].columns;let h;for(h=0;h<C.length;h+=1){const v=fe(u,C,h);m[h]?(m[h].p(v,a),w(m[h],1)):(m[h]=be(v),m[h].c(),w(m[h],1),m[h].m(_.parentNode,_))}for(R(),h=C.length;h<m.length;h+=1)$(h);Q()}if(a[0]&21){c=u[0].filter(u[11]);let h;for(h=0;h<c.length;h+=1){const v=ae(u,c,h);s[h]?(s[h].p(v,a),w(s[h],1)):(s[h]=ke(v),s[h].c(),w(s[h],1),s[h].m(p.parentNode,p))}for(R(),h=c.length;h<s.length;h+=1)i(h);Q()}},i(u){if(!I){for(let a=0;a<C.length;a+=1)w(m[a]);for(let a=0;a<c.length;a+=1)w(s[a]);I=!0}},o(u){m=m.filter(Boolean);for(let a=0;a<m.length;a+=1)B(m[a]);s=s.filter(Boolean);for(let a=0;a<s.length;a+=1)B(s[a]);I=!1},d(u){u&&k(l),u&&k(e),u&&k(o),u&&k(f),J(m,u),u&&k(_),J(s,u),u&&k(p)}}}function me(t){let l,n=t[20].name+"",e;return{c(){l=N("div"),e=M(n),this.h()},l(o){l=S(o,"DIV",{class:!0});var r=A(l);e=j(r,n),r.forEach(k),this.h()},h(){D(l,"class","border p-2")},m(o,r){P(o,l,r),E(l,e)},p(o,r){r[0]&2&&n!==(n=o[20].name+"")&&Z(e,n)},d(o){o&&k(l)}}}function Se(t){let l,n,e,o,r,d,b=t[20].name+"",g,f,_,p=T(t[2],t[20]).name+"",I,C,m,$,c,s=T(t[2],t[20]).columns,i=[];for(let a=0;a<s.length;a+=1)i[a]=de(ce(t,s,a));const u=a=>B(i[a],1,1,()=>{i[a]=null});return{c(){l=N("div"),n=N("span"),e=N("i"),o=K(),r=N("i"),d=K(),g=M(b),f=K(),_=N("span"),I=M(p),m=K(),$=N("div");for(let a=0;a<i.length;a+=1)i[a].c();this.h()},l(a){l=S(a,"DIV",{class:!0});var h=A(l);n=S(h,"SPAN",{});var v=A(n);e=S(v,"I",{class:!0}),A(e).forEach(k),o=U(v),r=S(v,"I",{class:!0}),A(r).forEach(k),d=U(v),g=j(v,b),v.forEach(k),f=U(h),_=S(h,"SPAN",{class:!0});var q=A(_);I=j(q,p),q.forEach(k),h.forEach(k),m=U(a),$=S(a,"DIV",{class:!0});var V=A($);for(let z=0;z<i.length;z+=1)i[z].l(V);V.forEach(k),this.h()},h(){D(e,"class","ri-checkbox-blank-fill align-bottom"),D(r,"class","ri-key-line align-bottom"),D(_,"class",C=T(t[2],t[20]).color+" px-1 rounded"),D(l,"class","p-2 space-x-1 "),D($,"class","border-l border-zinc-300 ml-4")},m(a,h){P(a,l,h),E(l,n),E(n,e),E(n,o),E(n,r),E(n,d),E(n,g),E(l,f),E(l,_),E(_,I),P(a,m,h),P(a,$,h);for(let v=0;v<i.length;v+=1)i[v].m($,null);c=!0},p(a,h){if((!c||h[0]&4)&&b!==(b=a[20].name+"")&&Z(g,b),(!c||h[0]&4)&&p!==(p=T(a[2],a[20]).name+"")&&Z(I,p),(!c||h[0]&4&&C!==(C=T(a[2],a[20]).color+" px-1 rounded"))&&D(_,"class",C),h[0]&20){s=T(a[2],a[20]).columns;let v;for(v=0;v<s.length;v+=1){const q=ce(a,s,v);i[v]?(i[v].p(q,h),w(i[v],1)):(i[v]=de(q),i[v].c(),w(i[v],1),i[v].m($,null))}for(R(),v=s.length;v<i.length;v+=1)u(v);Q()}},i(a){if(!c){for(let h=0;h<s.length;h+=1)w(i[h]);c=!0}},o(a){i=i.filter(Boolean);for(let h=0;h<i.length;h+=1)B(i[h]);c=!1},d(a){a&&k(l),a&&k(m),a&&k($),J(i,a)}}}function Ae(t){let l,n;return l=new Y({props:{baseTable:t[2],sourceTable:t[2],column:t[20],sourceColumn:t[20]}}),l.$on("addColumn",t[8]),{c(){L(l.$$.fragment)},l(e){O(l.$$.fragment,e)},m(e,o){W(l,e,o),n=!0},p(e,o){const r={};o[0]&4&&(r.baseTable=e[2]),o[0]&4&&(r.sourceTable=e[2]),o[0]&4&&(r.column=e[20]),o[0]&4&&(r.sourceColumn=e[20]),l.$set(r)},i(e){n||(w(l.$$.fragment,e),n=!0)},o(e){B(l.$$.fragment,e),n=!1},d(e){X(l,e)}}}function Pe(t){let l,n,e=t[23].name+"",o,r,d,b=T(T(t[2],t[20]),t[23]).name+"",g,f,_,p,I,C=T(T(t[2],t[20]),t[23]).columns,m=[];for(let c=0;c<C.length;c+=1)m[c]=he(_e(t,C,c));const $=c=>B(m[c],1,1,()=>{m[c]=null});return{c(){l=N("div"),n=N("span"),o=M(e),r=K(),d=N("span"),g=M(b),_=K(),p=N("div");for(let c=0;c<m.length;c+=1)m[c].c();this.h()},l(c){l=S(c,"DIV",{class:!0});var s=A(l);n=S(s,"SPAN",{});var i=A(n);o=j(i,e),i.forEach(k),r=U(s),d=S(s,"SPAN",{class:!0});var u=A(d);g=j(u,b),u.forEach(k),s.forEach(k),_=U(c),p=S(c,"DIV",{class:!0});var a=A(p);for(let h=0;h<m.length;h+=1)m[h].l(a);a.forEach(k),this.h()},h(){D(d,"class",f="px-1 rounded "+T(T(t[2],t[20]),t[23]).color),D(l,"class","p-2 space-x-1"),D(p,"class","border-l border-zinc-300 ml-4")},m(c,s){P(c,l,s),E(l,n),E(n,o),E(l,r),E(l,d),E(d,g),P(c,_,s),P(c,p,s);for(let i=0;i<m.length;i+=1)m[i].m(p,null);I=!0},p(c,s){if((!I||s[0]&4)&&e!==(e=c[23].name+"")&&Z(o,e),(!I||s[0]&4)&&b!==(b=T(T(c[2],c[20]),c[23]).name+"")&&Z(g,b),(!I||s[0]&4&&f!==(f="px-1 rounded "+T(T(c[2],c[20]),c[23]).color))&&D(d,"class",f),s[0]&20){C=T(T(c[2],c[20]),c[23]).columns;let i;for(i=0;i<C.length;i+=1){const u=_e(c,C,i);m[i]?(m[i].p(u,s),w(m[i],1)):(m[i]=he(u),m[i].c(),w(m[i],1),m[i].m(p,null))}for(R(),i=C.length;i<m.length;i+=1)$(i);Q()}},i(c){if(!I){for(let s=0;s<C.length;s+=1)w(m[s]);I=!0}},o(c){m=m.filter(Boolean);for(let s=0;s<m.length;s+=1)B(m[s]);I=!1},d(c){c&&k(l),c&&k(_),c&&k(p),J(m,c)}}}function Be(t){let l,n;return l=new Y({props:{baseTable:t[2],sourceTable:T(t[2],t[20]),sourceColumn:t[20],column:t[23]}}),l.$on("addColumn",t[9]),{c(){L(l.$$.fragment)},l(e){O(l.$$.fragment,e)},m(e,o){W(l,e,o),n=!0},p(e,o){const r={};o[0]&4&&(r.baseTable=e[2]),o[0]&4&&(r.sourceTable=T(e[2],e[20])),o[0]&4&&(r.sourceColumn=e[20]),o[0]&4&&(r.column=e[23]),l.$set(r)},i(e){n||(w(l.$$.fragment,e),n=!0)},o(e){B(l.$$.fragment,e),n=!1},d(e){X(l,e)}}}function he(t){let l,n;return l=new Y({props:{baseTable:T(t[2],t[20]),sourceTable:T(T(t[2],t[20]),t[23]),sourceColumn:t[23],column:t[26]}}),l.$on("addColumn",t[10]),{c(){L(l.$$.fragment)},l(e){O(l.$$.fragment,e)},m(e,o){W(l,e,o),n=!0},p(e,o){const r={};o[0]&4&&(r.baseTable=T(e[2],e[20])),o[0]&4&&(r.sourceTable=T(T(e[2],e[20]),e[23])),o[0]&4&&(r.sourceColumn=e[23]),o[0]&4&&(r.column=e[26]),l.$set(r)},i(e){n||(w(l.$$.fragment,e),n=!0)},o(e){B(l.$$.fragment,e),n=!1},d(e){X(l,e)}}}function de(t){let l,n,e,o,r;const d=[Be,Pe],b=[];function g(f,_){return _[0]&4&&(l=null),l==null&&(l=!x(T(f[2],f[20]),f[23])),l?0:1}return n=g(t,[-1,-1]),e=b[n]=d[n](t),{c(){e.c(),o=G()},l(f){e.l(f),o=G()},m(f,_){b[n].m(f,_),P(f,o,_),r=!0},p(f,_){let p=n;n=g(f,_),n===p?b[n].p(f,_):(R(),B(b[p],1,1,()=>{b[p]=null}),Q(),e=b[n],e?e.p(f,_):(e=b[n]=d[n](f),e.c()),w(e,1),e.m(o.parentNode,o))},i(f){r||(w(e),r=!0)},o(f){B(e),r=!1},d(f){b[n].d(f),f&&k(o)}}}function be(t){let l,n,e,o,r;const d=[Ae,Se],b=[];function g(f,_){return _[0]&4&&(l=null),l==null&&(l=!x(f[2],f[20])),l?0:1}return n=g(t,[-1,-1]),e=b[n]=d[n](t),{c(){e.c(),o=G()},l(f){e.l(f),o=G()},m(f,_){b[n].m(f,_),P(f,o,_),r=!0},p(f,_){let p=n;n=g(f,_),n===p?b[n].p(f,_):(R(),B(b[p],1,1,()=>{b[p]=null}),Q(),e=b[n],e?e.p(f,_):(e=b[n]=d[n](f),e.c()),w(e,1),e.m(o.parentNode,o))},i(f){r||(w(e),r=!0)},o(f){B(e),r=!1},d(f){b[n].d(f),f&&k(o)}}}function ze(t){let l,n,e=t[20].name+"",o,r,d,b=T(t[17],t[20]).name+"",g,f,_,p,I,C,m=T(t[17],t[20]).columns,$=[];for(let s=0;s<m.length;s+=1)$[s]=ve(ie(t,m,s));const c=s=>B($[s],1,1,()=>{$[s]=null});return{c(){l=N("div"),n=N("span"),o=M(e),r=K(),d=N("div"),g=M(b),_=K(),p=N("div");for(let s=0;s<$.length;s+=1)$[s].c();I=K(),this.h()},l(s){l=S(s,"DIV",{class:!0});var i=A(l);n=S(i,"SPAN",{});var u=A(n);o=j(u,e),u.forEach(k),r=U(i),d=S(i,"DIV",{class:!0});var a=A(d);g=j(a,b),a.forEach(k),i.forEach(k),_=U(s),p=S(s,"DIV",{class:!0});var h=A(p);for(let v=0;v<$.length;v+=1)$[v].l(h);I=U(h),h.forEach(k),this.h()},h(){D(d,"class",f="px-1 rounded "+T(t[17],t[20]).color),D(l,"class","p-2 space-x-1 ml-4 flex items-center"),D(p,"class","border-l border-zinc-300 ml-8")},m(s,i){P(s,l,i),E(l,n),E(n,o),E(l,r),E(l,d),E(d,g),P(s,_,i),P(s,p,i);for(let u=0;u<$.length;u+=1)$[u].m(p,null);E(p,I),C=!0},p(s,i){if((!C||i[0]&5)&&e!==(e=s[20].name+"")&&Z(o,e),(!C||i[0]&5)&&b!==(b=T(s[17],s[20]).name+"")&&Z(g,b),(!C||i[0]&5&&f!==(f="px-1 rounded "+T(s[17],s[20]).color))&&D(d,"class",f),i[0]&21){m=T(s[17],s[20]).columns;let u;for(u=0;u<m.length;u+=1){const a=ie(s,m,u);$[u]?($[u].p(a,i),w($[u],1)):($[u]=ve(a),$[u].c(),w($[u],1),$[u].m(p,I))}for(R(),u=m.length;u<$.length;u+=1)c(u);Q()}},i(s){if(!C){for(let i=0;i<m.length;i+=1)w($[i]);C=!0}},o(s){$=$.filter(Boolean);for(let i=0;i<$.length;i+=1)B($[i]);C=!1},d(s){s&&k(l),s&&k(_),s&&k(p),J($,s)}}}function Fe(t){let l,n;return l=new Y({props:{baseTable:t[17],sourceTable:t[17],sourceColumn:t[20],column:t[20]}}),l.$on("addColumn",t[13]),{c(){L(l.$$.fragment)},l(e){O(l.$$.fragment,e)},m(e,o){W(l,e,o),n=!0},p(e,o){const r={};o[0]&5&&(r.baseTable=e[17]),o[0]&5&&(r.sourceTable=e[17]),o[0]&5&&(r.sourceColumn=e[20]),o[0]&5&&(r.column=e[20]),l.$set(r)},i(e){n||(w(l.$$.fragment,e),n=!0)},o(e){B(l.$$.fragment,e),n=!1},d(e){X(l,e)}}}function Ke(t){let l,n,e=t[23].name+"",o,r,d,b=T(T(t[17],t[20]),t[23]).name+"",g,f,_,p,I,C=T(T(t[17],t[20]),t[23]).columns,m=[];for(let c=0;c<C.length;c+=1)m[c]=pe(ue(t,C,c));const $=c=>B(m[c],1,1,()=>{m[c]=null});return{c(){l=N("div"),n=N("span"),o=M(e),r=K(),d=N("div"),g=M(b),_=K(),p=N("div");for(let c=0;c<m.length;c+=1)m[c].c();this.h()},l(c){l=S(c,"DIV",{class:!0});var s=A(l);n=S(s,"SPAN",{});var i=A(n);o=j(i,e),i.forEach(k),r=U(s),d=S(s,"DIV",{class:!0});var u=A(d);g=j(u,b),u.forEach(k),s.forEach(k),_=U(c),p=S(c,"DIV",{class:!0});var a=A(p);for(let h=0;h<m.length;h+=1)m[h].l(a);a.forEach(k),this.h()},h(){D(d,"class",f="px-1 rounded "+T(T(t[17],t[20]),t[23]).color),D(l,"class","p-2 space-x-1 flex items-center"),D(p,"class","border-l border-zinc-300 ml-4")},m(c,s){P(c,l,s),E(l,n),E(n,o),E(l,r),E(l,d),E(d,g),P(c,_,s),P(c,p,s);for(let i=0;i<m.length;i+=1)m[i].m(p,null);I=!0},p(c,s){if((!I||s[0]&5)&&e!==(e=c[23].name+"")&&Z(o,e),(!I||s[0]&5)&&b!==(b=T(T(c[17],c[20]),c[23]).name+"")&&Z(g,b),(!I||s[0]&5&&f!==(f="px-1 rounded "+T(T(c[17],c[20]),c[23]).color))&&D(d,"class",f),s[0]&21){C=T(T(c[17],c[20]),c[23]).columns;let i;for(i=0;i<C.length;i+=1){const u=ue(c,C,i);m[i]?(m[i].p(u,s),w(m[i],1)):(m[i]=pe(u),m[i].c(),w(m[i],1),m[i].m(p,null))}for(R(),i=C.length;i<m.length;i+=1)$(i);Q()}},i(c){if(!I){for(let s=0;s<C.length;s+=1)w(m[s]);I=!0}},o(c){m=m.filter(Boolean);for(let s=0;s<m.length;s+=1)B(m[s]);I=!1},d(c){c&&k(l),c&&k(_),c&&k(p),J(m,c)}}}function Ue(t){let l,n;return l=new Y({props:{baseTable:t[17],sourceTable:T(t[17],t[20]),sourceColumn:t[20],column:t[23]}}),l.$on("addColumn",t[14]),{c(){L(l.$$.fragment)},l(e){O(l.$$.fragment,e)},m(e,o){W(l,e,o),n=!0},p(e,o){const r={};o[0]&5&&(r.baseTable=e[17]),o[0]&5&&(r.sourceTable=T(e[17],e[20])),o[0]&5&&(r.sourceColumn=e[20]),o[0]&5&&(r.column=e[23]),l.$set(r)},i(e){n||(w(l.$$.fragment,e),n=!0)},o(e){B(l.$$.fragment,e),n=!1},d(e){X(l,e)}}}function pe(t){let l,n;return l=new Y({props:{baseTable:T(t[17],t[20]),sourceTable:T(T(t[17],t[20]),t[23]),sourceColumn:t[23],column:t[26]}}),l.$on("addColumn",t[15]),{c(){L(l.$$.fragment)},l(e){O(l.$$.fragment,e)},m(e,o){W(l,e,o),n=!0},p(e,o){const r={};o[0]&5&&(r.baseTable=T(e[17],e[20])),o[0]&5&&(r.sourceTable=T(T(e[17],e[20]),e[23])),o[0]&5&&(r.sourceColumn=e[23]),o[0]&5&&(r.column=e[26]),l.$set(r)},i(e){n||(w(l.$$.fragment,e),n=!0)},o(e){B(l.$$.fragment,e),n=!1},d(e){X(l,e)}}}function ve(t){let l,n,e,o,r;const d=[Ue,Ke],b=[];function g(f,_){return _[0]&5&&(l=null),l==null&&(l=!x(T(f[17],f[20]),f[23])),l?0:1}return n=g(t,[-1,-1]),e=b[n]=d[n](t),{c(){e.c(),o=G()},l(f){e.l(f),o=G()},m(f,_){b[n].m(f,_),P(f,o,_),r=!0},p(f,_){let p=n;n=g(f,_),n===p?b[n].p(f,_):(R(),B(b[p],1,1,()=>{b[p]=null}),Q(),e=b[n],e?e.p(f,_):(e=b[n]=d[n](f),e.c()),w(e,1),e.m(o.parentNode,o))},i(f){r||(w(e),r=!0)},o(f){B(e),r=!1},d(f){b[n].d(f),f&&k(o)}}}function ge(t){let l,n,e,o,r,d;const b=[Fe,ze],g=[];function f(_,p){return p[0]&5&&(l=null),p[0]&5&&(n=null),l==null&&(l=!x(_[17],_[20])),l?0:(n==null&&(n=_[20].name!==_[17].constraints.find(_[5]).column),n?1:-1)}return~(e=f(t,[-1,-1]))&&(o=g[e]=b[e](t)),{c(){o&&o.c(),r=G()},l(_){o&&o.l(_),r=G()},m(_,p){~e&&g[e].m(_,p),P(_,r,p),d=!0},p(_,p){let I=e;e=f(_,p),e===I?~e&&g[e].p(_,p):(o&&(R(),B(g[I],1,1,()=>{g[I]=null}),Q()),~e?(o=g[e],o?o.p(_,p):(o=g[e]=b[e](_),o.c()),w(o,1),o.m(r.parentNode,r)):o=null)},i(_){d||(w(o),d=!0)},o(_){B(o),d=!1},d(_){~e&&g[e].d(_),_&&k(r)}}}function ke(t){let l,n,e,o,r=t[17].name+"",d,b,g,f,_,p,I,C,m,$,c=t[17].constraints.find(t[12]).column+"",s,i,u,a,h=t[17].columns,v=[];for(let V=0;V<h.length;V+=1)v[V]=ge(re(t,h,V));const q=V=>B(v[V],1,1,()=>{v[V]=null});return{c(){l=N("div"),n=N("i"),e=K(),o=N("div"),d=M(r),g=K(),f=N("div"),_=N("span"),p=M("via"),I=K(),C=N("i"),m=K(),$=N("span"),s=M(c),i=K();for(let V=0;V<v.length;V+=1)v[V].c();u=G(),this.h()},l(V){l=S(V,"DIV",{class:!0});var z=A(l);n=S(z,"I",{class:!0}),A(n).forEach(k),e=U(z),o=S(z,"DIV",{class:!0});var F=A(o);d=j(F,r),F.forEach(k),g=U(z),f=S(z,"DIV",{});var H=A(f);_=S(H,"SPAN",{});var le=A(_);p=j(le,"via"),le.forEach(k),I=U(H),C=S(H,"I",{class:!0}),A(C).forEach(k),m=U(H),$=S(H,"SPAN",{});var ne=A($);s=j(ne,c),ne.forEach(k),H.forEach(k),z.forEach(k),i=U(V);for(let ee=0;ee<v.length;ee+=1)v[ee].l(V);u=G(),this.h()},h(){D(n,"class","ri-checkbox-multiple-blank-fill align-bottom"),D(o,"class",b="bg-["+t[17].color+"] px-1 rounded w-max"),D(C,"class","ri-key-line align-bottom"),D(l,"class","p-2 space-x-1 flex flex-wrap items-center ")},m(V,z){P(V,l,z),E(l,n),E(l,e),E(l,o),E(o,d),E(l,g),E(l,f),E(f,_),E(_,p),E(f,I),E(f,C),E(f,m),E(f,$),E($,s),P(V,i,z);for(let F=0;F<v.length;F+=1)v[F].m(V,z);P(V,u,z),a=!0},p(V,z){if((!a||z[0]&5)&&r!==(r=V[17].name+"")&&Z(d,r),(!a||z[0]&5&&b!==(b="bg-["+V[17].color+"] px-1 rounded w-max"))&&D(o,"class",b),(!a||z[0]&5)&&c!==(c=V[17].constraints.find(V[12]).column+"")&&Z(s,c),z[0]&21){h=V[17].columns;let F;for(F=0;F<h.length;F+=1){const H=re(V,h,F);v[F]?(v[F].p(H,z),w(v[F],1)):(v[F]=ge(H),v[F].c(),w(v[F],1),v[F].m(u.parentNode,u))}for(R(),F=h.length;F<v.length;F+=1)q(F);Q()}},i(V){if(!a){for(let z=0;z<h.length;z+=1)w(v[z]);a=!0}},o(V){v=v.filter(Boolean);for(let z=0;z<v.length;z+=1)B(v[z]);a=!1},d(V){V&&k(l),V&&k(i),J(v,V),V&&k(u)}}}function qe(t){let l,n,e,o,r,d,b,g,f,_,p,I,C;const m=[Ne,De],$=[];function c(s,i){return s[3]=="available"?0:1}return f=c(t),_=$[f]=m[f](t),{c(){l=N("div"),n=N("div"),e=M("Available"),o=K(),r=N("div"),d=M("In Use"),b=K(),g=N("div"),_.c(),this.h()},l(s){l=S(s,"DIV",{class:!0});var i=A(l);n=S(i,"DIV",{class:!0});var u=A(n);e=j(u,"Available"),u.forEach(k),o=U(i),r=S(i,"DIV",{class:!0});var a=A(r);d=j(a,"In Use"),a.forEach(k),i.forEach(k),b=U(s),g=S(s,"DIV",{class:!0});var h=A(g);_.l(h),h.forEach(k),this.h()},h(){D(n,"class","flex-grow text-center cursor-pointer"),y(n,"font-semibold",t[3]=="available"),D(r,"class","flex-grow text-center cursor-pointer"),y(r,"font-semibold",t[3]!=="available"),D(l,"class","p-2 border-b text-sm border-zinc-300 flex"),D(g,"class","leading-6")},m(s,i){P(s,l,i),E(l,n),E(n,e),E(l,o),E(l,r),E(r,d),P(s,b,i),P(s,g,i),$[f].m(g,null),p=!0,I||(C=[oe(n,"click",t[6]),oe(r,"click",t[7])],I=!0)},p(s,i){i[0]&8&&y(n,"font-semibold",s[3]=="available"),i[0]&8&&y(r,"font-semibold",s[3]!=="available");let u=f;f=c(s),f===u?$[f].p(s,i):(R(),B($[u],1,1,()=>{$[u]=null}),Q(),_=$[f],_?_.p(s,i):(_=$[f]=m[f](s),_.c()),w(_,1),_.m(g,null))},i(s){p||(w(_),p=!0)},o(s){B(_),p=!1},d(s){s&&k(l),s&&k(b),s&&k(g),$[f].d(),I=!1,Ee(C)}}}function T(t,l){return t.constraints.find(n=>n.type=="Foreign Key"&&n.column==l.name).referenceTable}function Me(t,l,n){let{tables:e}=l,{selectedView:o}=l,r=o.baseTable;Ie(()=>{n(2,r=o.baseTable)});let d="available";const b=Ve();function g(a,h,v){b("addColumn",{sourceTable:a,sourceColumn:h,column:v})}const f=a=>a.type=="Foreign Key"&&a.referenceTable.id==r.id,_=()=>n(3,d="available"),p=()=>n(3,d="in use"),I=a=>g(a.detail.baseTable,a.detail.column,a.detail.column),C=a=>g(a.detail.baseTable,a.detail.sourceColumn,a.detail.column),m=a=>g(a.detail.baseTable,a.detail.sourceColumn,a.detail.column),$=a=>we(r,a),c=a=>a.type=="Foreign Key"&&a.referenceTable.id==r.id,s=a=>g(a.detail.baseTable,a.detail.sourceColumn,a.detail.column),i=a=>g(a.detail.baseTable,a.detail.sourceColumn,a.detail.column),u=a=>g(a.detail.baseTable,a.detail.sourceColumn,a.detail.column);return t.$$set=a=>{"tables"in a&&n(0,e=a.tables),"selectedView"in a&&n(1,o=a.selectedView)},[e,o,r,d,g,f,_,p,I,C,m,$,c,s,i,u]}class Le extends $e{constructor(l){super();Te(this,l,Me,qe,Ce,{tables:0,selectedView:1},null,[-1,-1])}}export{Le as default};
