import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * プロンプトから検索条件を抽出する
 * @param {string} prompt - ユーザーからの入力テキスト
 * @returns {Promise<Object>} - 抽出された条件のJSONオブジェクト
 */
export async function extractConditions(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEYが設定されていません。.envファイルを確認してください。");
  }

  // 速度と性能のバランスが良い gemini-2.5-flash を使用
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    // JSON形式での出力を強制する
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const promptText = `
あなたはレストラン検索アプリの優秀なAIアシスタントです。
ユーザーの自然言語のプロンプトから、レストラン検索に必要な条件を抽出してJSON形式で返してください。
情報が不足している項目については、null を返してください。

【重要】
- "location" には「新宿」「渋谷」などの場所情報を入れてください。
- "genre" には「焼肉」「居酒屋」「イタリアン」などの【料理ジャンルのみ】を入れてください。「おしゃれ」「安い」「美味しい」などの形容詞は検索エラーの原因になるため絶対に含めないでください。
- "private_room" は、ユーザーが個室を希望している場合に true にしてください。

【期待するJSONスキーマ】
{
  "location": string | null, // 場所（例: "新宿"）
  "people": number | null, // 人数（例: 20）
  "private_room": boolean, // 個室希望かどうか
  "genre": string | null, // 料理ジャンル（例: "焼肉", "居酒屋"）
  "time": string | null, // 時間
  "date": string | null // 日付
}

【ユーザープロンプト】
${prompt}
`;

  try {
    const result = await model.generateContent(promptText);
    const responseText = result.response.text();
    // responseMimeType を指定しているため、文字列をそのまま parse できます
    return JSON.parse(responseText);
  } catch (error) {
    console.error("LLMによる条件抽出中にエラーが発生しました:", error);
    throw error;
  }
}
