# 部署到 GitHub Pages — 完整步驟說明

完成後您將得到一個公開網址：`https://<你的帳號>.github.io/<倉庫名稱>/`

---

## 方法一：網頁介面（不需安裝任何軟體）

### 步驟 1：建立 GitHub 帳號

如果還沒有帳號，前往 [github.com](https://github.com) 免費註冊。

---

### 步驟 2：建立新倉庫

1. 登入後點右上角 **`+`** → **New repository**
2. 填寫以下資料：
   - **Repository name**：例如 `auction-valuation`（建議英文）
   - **Description**（選填）：競拍股價即時評估系統
   - **Public**：選這個（GitHub Pages 免費版需要 Public）
   - 勾選 **Add a README file**
3. 點 **Create repository**

---

### 步驟 3：上傳檔案

1. 進入剛建立的倉庫頁面
2. 點 **Add file** → **Upload files**
3. 將以下檔案拖曳上傳：
   - `index.html`（主程式，必要）
   - `README.md`（說明文件，選填）
4. 在頁面底部 **Commit changes** 直接點綠色按鈕確認

---

### 步驟 4：啟用 GitHub Pages

1. 倉庫頁面上方點 **Settings**（齒輪圖示）
2. 左側選單找到 **Pages**
3. 在 **Source** 下拉選 **Deploy from a branch**
4. **Branch** 選 `main`，資料夾選 `/ (root)`
5. 點 **Save**

---

### 步驟 5：取得網址

等待約 **1～3 分鐘**後重新整理 Pages 設定頁面，會出現：

```
Your site is live at https://<你的帳號>.github.io/<倉庫名稱>/
```

點擊即可開啟，可分享給任何人使用。

---

## 方法二：使用 Git 指令（進階）

如果您已安裝 Git，可用命令列操作：

```bash
# 1. 初始化本機專案
mkdir auction-valuation
cd auction-valuation
git init

# 2. 複製檔案到此目錄（index.html, README.md）

# 3. 加入並提交
git add .
git commit -m "初始版本：競拍股價評估系統"

# 4. 連結遠端倉庫（替換為您的帳號和倉庫名）
git remote add origin https://github.com/<你的帳號>/auction-valuation.git

# 5. 推送
git branch -M main
git push -u origin main
```

推送後依照方法一的步驟 4～5 啟用 GitHub Pages。

---

## 更新內容

每次修改 `index.html` 後，重新上傳覆蓋即可。GitHub Pages 會在幾分鐘內自動更新。

---

## 常見問題

**Q：網址什麼時候會生效？**
A：通常 1～5 分鐘。第一次可能需要稍等，之後更新通常更快。

**Q：我的股票資料會被存到 GitHub 嗎？**
A：不會。本工具完全在您的瀏覽器執行，填入的數值不會傳送到任何地方。

**Q：可以設為私人倉庫嗎？**
A：免費帳號的 GitHub Pages 必須使用 Public 倉庫。如需私人倉庫，需升級為 GitHub Pro（每月 $4 美元）。

**Q：如何讓網址更短？**
A：可在 Settings → Pages 設定自訂網域（Custom domain），需自行申請網域名稱。

---

## 倉庫結構

```
auction-valuation/
├── index.html      # 主程式（完整單頁應用）
├── README.md       # 說明文件
└── DEPLOY.md       # 本部署說明
```
