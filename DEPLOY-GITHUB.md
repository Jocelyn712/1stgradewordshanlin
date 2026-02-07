# 部署到 GitHub

## 1. 在 GitHub 建立新倉庫

1. 打開 [GitHub → New repository](https://github.com/new)
2. **Repository name** 填：`1stgradewordshanlin`（或你喜歡的名稱）
3. 選 **Public**
4. **不要**勾選 "Add a README file"（本地已有）
5. 點 **Create repository**

## 2. 連到 GitHub 並推送

在終端機執行：

```bash
cd /Users/jw/Desktop/1stgradewordshanlin

# 設定遠端
git remote add origin https://github.com/Jocelyn712/1stgradewordshanlin.git

# 推送到 GitHub
git push -u origin main
```

若用 SSH：

```bash
git remote add origin git@github.com:Jocelyn712/1stgradewordshanlin.git
git push -u origin main
```

## 3. 之後的更新

改完程式後：

```bash
git add .
git commit -m "說明這次改了什麼"
git push
```
