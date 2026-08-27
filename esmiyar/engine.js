export const ABJAD={ا:1,آ:1,أ:1,إ:1,ب:2,ج:3,د:4,ه:5,ة:5,و:6,ؤ:6,ز:7,ح:8,ط:9,ی:10,ي:10,ئ:10,ک:20,ك:20,ل:30,م:40,ن:50,س:60,ع:70,ف:80,ص:90,ق:100,ر:200,ش:300,ت:400,ث:500,خ:600,ذ:700,ض:800,ظ:900,غ:1000};
export const normalize=s=>String(s||'').trim().replace(/[\u064B-\u065F\u0670ـ\s‌]/g,'');
export function abjad(text){return [...normalize(text)].reduce((n,c)=>n+(ABJAD[c]||0),0)}
export const defaultRules=[
 {id:'trend',title:'روند شخص',divisor:3,inputs:['name','mother'],labels:['ثابت','نزولی','صعودی'],status:'فعال'},
 {id:'step',title:'قدم',divisor:3,inputs:['name','father'],labels:['خنثی/ثابت','بدقدم','خوش‌قدم'],status:'فعال'},
 {id:'couple',title:'تفاهم زوجین',divisor:5,inputs:['name','spouse'],labels:['عشق آسمانی','ضعیف/ناسازگار','تفاهم پایین','دوست داشتن','جذابیت و علاقه'],status:'فعال'},
 {id:'health',title:'سلامت زوجین',divisor:9,offset:32,inputs:['name','spouse'],labels:Array(9).fill('نیازمند تکمیل قانون'),status:'تفسیر سنتی؛ غیرپزشکی'},
 {id:'surname',title:'اسم + فامیل',divisor:3,inputs:['name','surname'],labels:Array(3).fill('نیازمند تکمیل قانون'),status:'در انتظار تکمیل قانون'},
 {id:'partnership',title:'شراکت',divisor:9,offset:32,inputs:['name','partner'],labels:['ریسک بالا','نیازمند تکمیل قانون','مساعد','نیازمند تکمیل قانون','مساعد','زیان برابر','مساعد','ریسک بالا','مساعد'],status:'تفسیر سنتی'},
 {id:'place',title:'محل سکونت / کار',divisor:3,inputs:['name','place'],labels:['خنثی','نامطلوب','بهترین حالت'],status:'فعال',numericInputs:['place']},
 {id:'business',title:'کسب‌وکار',divisor:3,inputs:['name','business'],labels:Array(3).fill('نیازمند تکمیل قانون'),status:'در انتظار فرمول نهایی'}];
function inputValue(rule,key,text){if((rule.numericInputs||[]).includes(key)){const n=Number(String(text).replace(/[^0-9۰-۹]/g,'').replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));return Number.isFinite(n)?n:0}return abjad(text)}
export function runRule(rule,values){const parts=rule.inputs.map(k=>({key:k,text:values[k]||'',value:inputValue(rule,k,values[k])}));if(parts.some(x=>!x.text))return null;const total=parts.reduce((n,x)=>n+x.value,Number(rule.offset)||0);const remainder=total%Number(rule.divisor);return {ruleId:rule.id,title:rule.title,parts,total,divisor:Number(rule.divisor),remainder,label:rule.labels[remainder]??'نیازمند بررسی',status:rule.status}}
export function analyze(values,rules=defaultRules){return rules.map(r=>runRule(r,values)).filter(Boolean)}
