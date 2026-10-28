// 非官方实时数据：以下为固定种子生成的模拟快乐8历史记录，仅供功能演示，不是实际开奖。
let state=20261028;
function random(){state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;}
const history=[];
for(let i=0;i<80;i++){const pool=Array.from({length:80},(_,j)=>j+1);for(let j=79;j>0;j--){const k=Math.floor(random()*(j+1));[pool[j],pool[k]]=[pool[k],pool[j]];}history.push({issue:'MOCK-'+String(80-i).padStart(3,'0'),numbers:pool.slice(0,20).sort((a,b)=>a-b)});}
// 最新一期在前。
module.exports=history;
