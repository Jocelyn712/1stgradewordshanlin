# 生字複習 App（康軒國小一年級）

字卡式生字複習，康軒版 112 學年度上學期 1～6 課。

## 使用方式

- 用瀏覽器直接開啟 `index.html`，或在本機用簡易 server 開啟（例如 `npx serve .`）。
- **選課**：上方下拉選「第幾課」。
- **字卡**：先只顯示**國字**；小孩若不會，大人按 **答錯** 會顯示**注音**；按 **答對** 換下一張。
- **播放**：點「🔊 播放」會用瀏覽器 TTS 念出目前這個字（需允許語音）。

## 資料來源與編輯

- 生字與注音在 `data/words.js`，格式為每課一個物件，內有 `title` 與 `words`（`char`、`bopomofo`）。
- 可對照 [教育百科生字詞彙表（康軒 112 上 一年級）](https://pedia.cloud.edu.tw/Bookmark/Textword?category=%E5%9C%8B%E8%AA%9E&year=112_1&degree=1&press=%E5%BA%B7%E8%BB%92%E7%89%88) 各課「詞調名稱」欄位增修生字與注音。

## 技術

- 純網頁：HTML + CSS + JavaScript，無框架。
- TTS 使用瀏覽器內建 `SpeechSynthesis`（`zh-TW`）。
