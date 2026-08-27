import test from 'node:test';import assert from 'node:assert/strict';import {abjad,normalize,runRule,defaultRules,analyze} from './engine.js';
test('normalizes only explicit Persian equivalents plus whitespace',()=>{assert.equal(normalize(' پ ژ چ گ '),'بزجک')});
test('calculates kabir abjad',()=>{assert.equal(abjad('علی'),110);assert.equal(abjad('رضا'),1001);assert.equal(abjad('سعیده'),149)});
test('trend follows notebook fractions',()=>{const r=runRule(defaultRules.find(x=>x.id==='trend'),{name:'علی',mother:'مریم'});assert.equal(r.total,400);assert.equal(r.remainder,1);assert.equal(r.label,'نزولی')});
test('vibration follows four notebook groups',()=>{const r=runRule(defaultRules.find(x=>x.id==='vibration'),{name:'سعیده',mother:'نصرت'});assert.equal(r.total,889);assert.equal(r.remainder,1);assert.equal(r.label,'ضعیف (حادثه‌ساز)')});
test('surname mapping is notebook mapping',()=>{const r=runRule(defaultRules.find(x=>x.id==='surname'),{name:'علی',surname:'رضا'});assert.equal(r.remainder,(110+1001)%3);assert.equal(r.label,'هماهنگی عالی')});
test('couple health uses +33',()=>{const r=runRule(defaultRules.find(x=>x.id==='health'),{woman:'سعیده',man:'رضا'});assert.equal(r.offset,33);assert.equal(r.total,1183)});
test('skips rules with missing required inputs',()=>assert.ok(analyze({name:'علی'}).every(Boolean)));
