const PREFIX='ct_v1_';
function read(key,fallback){try{const v=wx.getStorageSync(PREFIX+key);return v===''||v===undefined?fallback:v;}catch(e){return fallback;}}
function write(key,value){wx.setStorageSync(PREFIX+key,value);return value;}
function monthKey(date){const d=date?new Date(date):new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');}
function summary(){const budget=read('budget',{monthly:300,perIssue:50});const records=read('ledger',[]);const month=monthKey();const spentCents=records.filter(r=>monthKey(r.createdAt)===month).reduce((s,r)=>s+Math.round(r.amount*100),0);const spent=spentCents/100;return {month,budget,spent,remaining:Math.max(0,Math.round((budget.monthly-spent)*100)/100),over:spent>budget.monthly,percent:budget.monthly>0?Math.min(100,Math.round(spent/budget.monthly*100)):(spent>0?100:0)};}
function checkLimits(amount,issue){const s=summary();const issueSpent=read('ledger',[]).filter(r=>r.issue===issue).reduce((v,r)=>v+Math.round(r.amount*100),0)/100;const reasons=[];if(Math.round((s.spent+amount)*100)>Math.round(s.budget.monthly*100))reasons.push('本月累计将超过月预算 ¥'+s.budget.monthly);if(Math.round((issueSpent+amount)*100)>Math.round(s.budget.perIssue*100))reasons.push('该期累计将超过单期上限 ¥'+s.budget.perIssue);return reasons;}
function logLimit(data){const list=read('logs',[]);list.unshift(Object.assign({id:uid(),createdAt:Date.now()},data));write('logs',list);}
function uid(){return Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,9);}
module.exports={read,write,uid,monthKey,summary,checkLimits,logLimit,getConsent:()=>read('consent',false)===true,setConsent:()=>write('consent',true)};
