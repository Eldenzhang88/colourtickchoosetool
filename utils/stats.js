const history=require('./mock-history');
function calculate(windowSize){const n=Math.min(history.length,Math.max(1,Math.floor(Number(windowSize)||30)));return Array.from({length:80},(_,i)=>{const number=i+1;const count=history.slice(0,n).filter(h=>h.numbers.indexOf(number)>=0).length;const index=history.findIndex(h=>h.numbers.indexOf(number)>=0);return {number,count,omission:index<0?history.length:index};});}
module.exports={calculate,historyLength:history.length};
