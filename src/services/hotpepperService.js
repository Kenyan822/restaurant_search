import dotenv from "dotenv";

dotenv.config();

const HOTPEPPER_API_URL = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/";

/**
 * ホットペッパーAPIを使ってレストランを検索する
 * @param {Object} conditions - LLMから抽出された検索条件
 * @returns {Promise<Array>} - 整形されたレストラン情報の配列
 */
export async function searchRestaurants(conditions) {
  const apiKey = process.env.HOTPEPPER_API_KEY;
  if (!apiKey) {
    throw new Error("HOTPEPPER_API_KEYが設定されていません。.envファイルを確認してください。");
  }

  // 場所とジャンルのみをフリーワード検索（keyword）の対象にする
  const keywordArr = [];
  if (conditions.location) {
    keywordArr.push(conditions.location);
  }
  if (conditions.genre) {
    keywordArr.push(conditions.genre);
  }
  const keywordStr = keywordArr.join(" ");
  
  // 検索用のURLパラメータを構築
  const params = new URLSearchParams({
    key: apiKey,
    format: "json",
    count: 10 // 最大10件取得に変更
  });

  // キーワードがあれば追加
  if (keywordStr) {
    params.append("keyword", keywordStr);
  }

  // 人数が指定されていれば「宴会収容人数 (party_capacity)」として追加
  if (conditions.people) {
    params.append("party_capacity", conditions.people);
  }

  // 個室希望があればAPIの専用パラメータ (private_room=1) を指定
  if (conditions.private_room) {
    params.append("private_room", "1");
  }

  try {
    const response = await fetch(`${HOTPEPPER_API_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`ホットペッパーAPIリクエスト失敗: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    // APIキーエラーなどの場合もHTTPステータスは200で返るため、JSON内部のエラーを確認
    if (data.results && data.results.error) {
      const errorInfo = data.results.error[0];
      throw new Error(`APIエラー [${errorInfo.code}]: ${errorInfo.message}`);
    }

    // APIから結果が返ってこない場合のエラーハンドリング
    if (!data.results || !data.results.shop) {
      return [];
    }

    // 仕様書で定義したレスポンスの形式にデータを整形し、写真や追加情報を含める
    return data.results.shop.map(shop => {
      // フェーズ1: 評価（星の数）はモックとしてランダム生成 (3.5 ~ 4.8)
      const mockRating = (Math.random() * (4.8 - 3.5) + 3.5).toFixed(1);

      return {
        id: shop.id,
        name: shop.name,
        address: shop.address,
        rating: parseFloat(mockRating),
        // 画像URL
        photo_url: shop.photo?.pc?.l || shop.photo?.mobile?.l || null,
        // ホットペッパーの詳細ページURL
        urls: {
          pc: shop.urls?.pc || null
        },
        // 予約・空き状況
        availability: {
          can_reserve: true,
          status: "○ (空きあり)" // モックデータ
        },
        // その他の詳細情報
        info: {
          access: shop.access || "不明",
          open_hours: shop.open || "不明",
          budget: shop.budget ? shop.budget.name : "予算情報なし",
          capacity: shop.capacity || "不明",
          free_drink: shop.free_drink || "なし",
          private_room: shop.private_room || "なし",
          features: [
            shop.genre ? shop.genre.name : "",
            shop.catch || ""
          ].filter(Boolean) // 空の文字列を除外
        }
      };
    });
  } catch (error) {
    console.error("ホットペッパーAPIの処理中にエラーが発生しました:", error);
    throw error;
  }
}
