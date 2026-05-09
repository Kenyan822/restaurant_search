import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractConditions } from './src/services/llmService.js';
import { searchRestaurants } from './src/services/hotpepperService.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ミドルウェアの設定
app.use(cors()); // フロントエンドからのリクエストを許可
app.use(express.json()); // JSON形式のリクエストボディをパース

// フロントエンド（publicディレクトリ）の静的ファイルを配信
app.use(express.static(path.join(__dirname, 'public')));

// 検索APIエンドポイント
app.post('/api/search', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        status: "error",
        message: "プロンプト（prompt）が送信されていません。"
      });
    }

    console.log(`\n[API] 新しいリクエストを受信しました: "${prompt}"`);

    // 1. LLMによる意図・条件の抽出
    const conditions = await extractConditions(prompt);
    console.log("[API] 条件抽出完了:", conditions);
    
    // 2. ホットペッパーAPIを利用した検索
    const restaurants = await searchRestaurants(conditions);
    console.log(`[API] 検索完了: ${restaurants.length}件のレストランが見つかりました`);

    // 3. フロントエンドへ結果を返却
    res.json({
      status: "success",
      data: {
        parsed_conditions: conditions,
        restaurants: restaurants
      }
    });

  } catch (error) {
    console.error("[API エラー]", error);
    res.status(500).json({
      status: "error",
      message: "サーバー内部でエラーが発生しました。",
      details: error.message
    });
  }
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 サーバーが起動しました: http://localhost:${PORT}`);
  console.log(`👉 エンドポイント: POST http://localhost:${PORT}/api/search`);
  console.log(`=================================================`);
});
