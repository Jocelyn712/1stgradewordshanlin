#!/usr/bin/env node
/**
 * 從萌典 API 查詢注音，更新 data/words.js 的 bopomofo 欄位
 * 萌典資料來源：教育部國語辭典 https://www.moedict.tw/
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const WORDS_PATH = path.join(__dirname, '..', 'data', 'words.js');
const MOEDICT_API = 'https://www.moedict.tw/a/';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(data ? JSON.parse(data) : null);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function getBopomofo(char) {
  const encoded = encodeURIComponent(char);
  const url = MOEDICT_API + encoded + '.json';
  return fetchJson(url).then((json) => {
    if (!json || !json.h || !json.h.length) return '';
    let b = json.h[0].b;
    if (!b) return '';
    b = b.replace(/[（(]?[`']?(?:語音|讀音)~[）)]?/g, '').replace(/\s/g, ' ').trim();
    return b;
  }).catch(() => '');
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const content = fs.readFileSync(WORDS_PATH, 'utf8');
  const arrayMatch = content.match(/window\.KANGXUAN_WORDS\s*=\s*(\[\s*\{(?:[\s\S]*)\}\s*\])\s*;/);
  if (!arrayMatch) {
    console.error('無法解析 words.js');
    process.exit(1);
  }
  const data = eval(arrayMatch[1]);
  const seen = new Map();
  for (const lesson of data) {
    for (const w of lesson.words) {
      const key = w.char;
      if (seen.has(key)) {
        w.bopomofo = seen.get(key);
        continue;
      }
      const bopomofo = await getBopomofo(key);
      seen.set(key, bopomofo);
      w.bopomofo = bopomofo;
      process.stdout.write(key + ' → ' + (bopomofo || '(無)') + '\n');
      await sleep(120);
    }
  }
  const allWords = data.flatMap((l) => l.words);
  let idx = 0;
  const newContent = content.replace(/bopomofo: ""/g, () => {
    const w = allWords[idx++];
    if (!w) return 'bopomofo: ""';
    const escaped = w.bopomofo.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return 'bopomofo: "' + escaped + '"';
  });
  fs.writeFileSync(WORDS_PATH, newContent, 'utf8');
  console.log('已寫入 ' + WORDS_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
