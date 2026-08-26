export const ABJAD={ا:1,آ:1,أ:1,إ:1,ب:2,ج:3,د:4,ه:5,ة:5,و:6,ز:7,ح:8,ط:9,ی:10,ي:10,ک:20,ك:20,ل:30,م:40,ن:50,س:60,ع:70,ف:80,ص:90,ق:100,ر:200,ش:300,ت:400,ث:500,خ:600,ذ:700,ض:800,ظ:900,غ:1000};
export const normalize=s=>String(s||'').trim().replace(/[\u064B-\u065F\u0670ـ\s‌]/g,'');
export function abjad(text){return [...normalize(text)].reduce((n,c)=>n+(ABJAD[c]||0),0)}
export const defaultRules=[
 {id:'trend',title:'روند شخص',divisor:3,inputs:['name','mother'],labels:['ثابت','صعودی','نزولی'],status:'نیازمند تأیید'},
 {id:'step',title:'قدم',divisor:3,inputs:['name','father'],labels:['خنثی','خوش‌قدم','نیازمند بررسی'],status:'نیازمند تأیید'},
 {id:'couple',title:'تفاهم زوجین',divisor:5,inputs:['name','spouse'],labels:['نیازمند بررسی','متوسط','دوست‌داشتن','جذابیت','هماهنگی بالا'],status:'نیازمند تأیید'},
 {id:'health',title:'سلامت زوجین',divisor:9,offset:32,inputs:['name','spouse'],labels:['خوب','متوسط','نیازمند بررسی','خوب','ضعیف','متوسط','نیازمند بررسی','خوب','متوسط'],status:'تفسیر سنتی'},
 {id:'surname',title:'اسم + فامیل',divisor:3,inputs:['name','surname'],labels:['هماهنگ','متوسط','نیازمند بررسی'],status:'نیازمند تأیید'},
 {id:'partnership',title:'شراکت',divisor:5,inputs:['name','partner'],labels:['نیازمند بررسی','متوسط','مساعد','هماهنگ','قوی'],status:'نیازمند تأیید'},
 {id:'place',title:'محل سکونت / کار',divisor:3,inputs:['name','place'],labels:['خنثی','مساعد','نیازمند بررسی'],status:'نیازمند تأیید'},
 {id:'business',title:'کسب‌وکار',divisor:5,inputs:['name','business'],labels:['نیازمند بررسی','متوسط','مساعد','هماهنگ','قوی'],status:'نیازمند تأیید'}];
export function runRule(rule,values){const parts=rule.inputs.map(k=>({key:k,text:values[k]||'',value:abjad(values[k])}));if(parts.some(x=>!x.text))return null;const total=parts.reduce((n,x)=>n+x.value,Number(rule.offset)||0);const remainder=total%Number(rule.divisor);return {ruleId:rule.id,title:rule.title,parts,total,divisor:Number(rule.divisor),remainder,label:rule.labels[remainder]??'نیازمند بررسی',status:rule.status}}
export function analyze(values,rules=defaultRules){return rules.map(r=>runRule(r,values)).filter(Boolean)}
