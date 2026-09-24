import assert from 'node:assert/strict';
import {generate,conjugate,agree,vocab,matchPairs,options,isCorrect} from '../js/data.js';
// Repeatable coverage of new branches, without changing production randomness.
const original=Math.random;let seed=20260922;
Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
try {
 for(const [verb,answer] of [['hablar','habláis'],['leer','leéis'],['escribir','escribís'],['describir','describís'],['responder','respondéis']])assert.equal(conjugate(verb,5),answer);
 assert.equal(agree('amable',true,true),'amables');assert.equal(agree('generoso',true,true),'generosas');assert.equal(agree('estudioso',false,true),'estudiosos');
 for(const t of ['ar','er','ir','verbs','ser']){
  let vosotros=false,vosotras=false;
  for(let i=0;i<3000;i++){
   const q=generate(2,t);assert(!/undefined/.test(JSON.stringify(q)));
   vosotros ||= q.prompt.includes('vosotros');vosotras ||= q.prompt.includes('vosotras');
   assert.equal(options(q).filter(a=>isCorrect(a,q)).length,1);
  }
  assert(vosotros&&vosotras,`${t} covers both Spain plural pronouns`);
 }
 let familySer=false,combination=false,identification=false;
 const directions=new Set(),preferences=new Set();
 for(let i=0;i<3000;i++){
  const q=generate(1,'ser');assert(!/vosotr|sois/.test(JSON.stringify(q)));familySer ||= /Mi madre|My mother/.test(q.prompt);combination ||= /yo soy|I am/.test(q.prompt);
  identification ||= generate(1,'pronouns').prompt.startsWith('Replace');
  const g=generate(1,'gusta');directions.add(g.lang);preferences.add(g.answers[0].startsWith('No me')||g.answers[0].includes('don’t')?'negative':'positive');
 }
 assert(familySer&&combination&&identification);assert.equal(directions.size,2);assert.equal(preferences.size,2);
 assert(vocab.family.length===30&&vocab.subjects.length===16&&vocab.weather.length===16);
 for(const p of matchPairs(1,'gusta'))assert(/^(No me|Me) gusta /.test(p.es));
 console.log('PASS: seeded Phase 2 coverage; vosotros/vosotras in all Spanish 2 verb selections; no Spanish 1 leakage; new agreement, SER combinations, family sentences, pronoun identification and bilingual preferences.');
}finally{Math.random=original;}
