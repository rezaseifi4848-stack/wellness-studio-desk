import test from 'node:test';import assert from 'node:assert/strict';import {abjad,normalize,runRule,defaultRules,analyze} from './engine.js';
test('normalizes Persian variants and whitespace',()=>assert.equal(normalize(' آ ر یـا '),'آریا'));
test('calculates kabir abjad',()=>{assert.equal(abjad('علی'),110);assert.equal(abjad('رضا'),1001);assert.equal(abjad('سعیده'),149)});
test('runs deterministic rule details',()=>{const r=runRule(defaultRules[0],{name:'علی',mother:'مریم'});assert.equal(r.total,400);assert.equal(r.remainder,1);assert.equal(r.label,'صعودی')});
test('skips rules with missing required inputs',()=>assert.equal(analyze({name:'علی'}).length,0));
