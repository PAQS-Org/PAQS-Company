const u=["B","KB","MB","GB","TB","PB"];function a(t,n=1){let e=0;for(;parseInt(t,10)>=1024&&e<u.length-1;)t/=1024,++e;return`${t.toFixed(n)}${u[e]}`}function i(t,n,e){return e<=n?n:Math.min(e,Math.max(n,t))}function l(t,n,e){if(e<=n)return n;const r=e-n+1;let o=n+(t-n)%r;return o<n&&(o=r+o),o===0?0:o}function s(t,n=2,e="0"){if(t==null)return t;const r=""+t;return r.length>=n?r:new Array(n-r.length+1).join(e)+r}export{i as b,a as h,l as n,s as p};