const suffix='【彩票选号助手｜筛号≠预测，中奖属偶然，不提升中奖概率。未成年人勿用、理性购彩；禁止代售，仅通过官方线下网点或官方渠道购彩。】';
function numbers(list){return list.map(n=>String(n).padStart(2,'0')).join(' ');}
function copy(list){wx.setClipboardData({data:'快乐8 选十：'+numbers(list)+'\n'+suffix});}
function date(value){const d=new Date(value);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');}
module.exports={suffix,numbers,copy,date};
