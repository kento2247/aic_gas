# aic_gas

## ライブラリの使用
1. GASで[プロジェクト](https://script.google.com/home)を作成
2. エディター画面にあるライブラリ+をクリック  
   <img width="655" alt="library+" src="https://github.com/user-attachments/assets/4b0d3bb8-c9c0-4ce2-8790-e4b1b593c95d">

3. こちらのスクリプトIDで検索  
   `16Yr3o19J9YSDEKHOwwcZWIfhKig62B4GYSZOguhgT7Hfu9-lYOGRKvAD`

   - `ver. 11`を使用してください

4. アクセストークンを設定する
    - AICライブラリを使用する際，一度だけアクセストークンを設定する必要がある
    ```js
    AIC.ACCESS_TOKEN =
        "LINEでベロッパーコンソールで発行したアクセストークン";
    ```

5. GPTを使用する
    - デフォルトのモデルは`gpt-4o mini`です，引数で変更可能
    ```js
    AIC.gpt("こんにちは", openai_api_key = "sk-xxx")
    ```
