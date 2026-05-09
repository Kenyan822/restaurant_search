import readline from 'readline';
import { extractConditions } from "./src/services/llmService.js";
import { searchRestaurants } from "./src/services/hotpepperService.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log("=========================================");
  console.log("🍽️ レストランAI検索パイプライン テストツール");
  console.log("=========================================\n");

  // ターミナルからユーザーの入力を受け取る
  const prompt = await askQuestion("📝 どんなレストランを探していますか？\n（入力例：新宿で20人で入れる個室の焼肉を探して）\n> ");
  
  if (!prompt.trim()) {
    console.log("入力が空のため終了します。");
    rl.close();
    return;
  }

  console.log("\n🤖 LLMで条件を抽出しています...");
  try {
    const conditions = await extractConditions(prompt);
    console.log("✅ 抽出結果:");
    console.log(JSON.stringify(conditions, null, 2));
    
    console.log("\n🔍 ホットペッパーAPIで検索しています...");
    const restaurants = await searchRestaurants(conditions);
    
    console.log(`\n✅ 検索結果 (${restaurants.length}件):`);
    console.log(JSON.stringify(restaurants, null, 2));
    
    console.log("\n🚀 次のステップ: Express等でこのパイプラインを /api/search エンドポイントとして公開します。");

  } catch (error) {
    console.error("\n❌ パイプライン実行中にエラーが発生しました:", error.message);
  } finally {
    rl.close();
  }
}

main();
