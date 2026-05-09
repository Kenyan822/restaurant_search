import { extractConditions } from "../src/services/llmService.js";

async function main() {
  const prompt = "今日サークル終わりに20人で入れる安い居酒屋を探して。時間は19時から。";
  console.log("📝 ユーザープロンプト:", prompt);
  console.log("🤖 LLMで条件抽出中...\n");

  try {
    const conditions = await extractConditions(prompt);
    console.log("✅ 抽出結果:");
    console.log(JSON.stringify(conditions, null, 2));
    console.log("\n💡 次のステップ: この結果を使ってホットペッパーAPIを叩く処理を作ります。");
  } catch (error) {
    console.error("❌ 失敗しました:", error.message);
  }
}

main();
