document.addEventListener('DOMContentLoaded', () => {
    // --- バックエンドから渡される想定の仮データ (Mock Data) ---
    const mockRestaurants = [
    {
        "id": "J004470571",
        "name": "ソムオー 新大久保店",
        "address": "東京都新宿区百人町１-１１-２４ YSビル １F",
        "rating": 4.1,
        "photo_url": "https://imgfp.hotp.jp/IMGH/39/32/P048543932/P048543932_238.jpg",
        "urls": {
            "pc": "https://www.hotpepper.jp/strJ004470571/?vos=nhppalsa000016"
        },
        "availability": {
            "can_reserve": true,
            "status": "○ (空きあり)"
        },
        "info": {
            "access": "山手線新大久保駅下車徒歩1分。改札口を出て左へ、すぐ左の小道（線路沿い）を入り右側のテラスのある店。",
            "open_hours": "月～日、祝日、祝前日: 11:00～23:30 （料理L.O. 23:00 ドリンクL.O. 23:00）",
            "budget": "2001～3000円",
            "capacity": 80,
            "free_drink": "あり",
            "private_room": "なし",
            "features": [
                "アジア・エスニック料理",
                "サラダの種類も豊富！ お得なランチセットも◎"
            ]
        }
    },
    {
        "id": "J004068203",
        "name": "中華パーラーKB6 千葉店",
        "address": "千葉県千葉市中央区新宿２-2-2第3プレシードビルB1F",
        "rating": 3.8,
        "photo_url": "https://imgfp.hotp.jp/IMGH/63/78/P047936378/P047936378_238.jpg",
        "urls": {
            "pc": "https://www.hotpepper.jp/strJ004068203/?vos=nhppalsa000016"
        },
        "availability": {
            "can_reserve": true,
            "status": "○ (空きあり)"
        },
        "info": {
            "access": "千葉中央駅より徒歩約1分/ＪＲ千葉駅より徒歩約10分/葭川公園駅出口より徒歩約8分",
            "open_hours": "月～日、祝日、祝前日: 11:00～翌0:00 （料理L.O. 23:00 ドリンクL.O. 23:30）",
            "budget": "3001～4000円",
            "capacity": 45,
            "free_drink": "あり ：クーポンに１時間飲み放題980円でございます！",
            "private_room": "あり",
            "features": [
                "居酒屋",
                "Neo大衆居酒屋&中華バル 誕生日・記念日のお祝いに"
            ]
        }
    },
    {
        "id": "J003693957",
        "name": "トロ匠 新宿店",
        "address": "東京都新宿区新宿３-7-5   新宿リカケイビル １F",
        "rating": 3.5,
        "photo_url": "https://imgfp.hotp.jp/IMGH/09/01/P047420901/P047420901_238.jpg",
        "urls": {
            "pc": "https://www.hotpepper.jp/strJ003693957/?vos=nhppalsa000016"
        },
        "availability": {
            "can_reserve": true,
            "status": "○ (空きあり)"
        },
        "info": {
            "access": "喫煙席有り◎新宿駅 徒歩5分/新宿三丁目駅 徒歩1分 完全個室 3時間飲み放題付き宴会コース3500円~完全個室で旨い魚を◎",
            "open_hours": "月～日、祝日、祝前日: 12:00～翌5:00 （料理L.O. 翌4:00 ドリンクL.O. 翌4:30）",
            "budget": "3001～4000円",
            "capacity": 130,
            "free_drink": "あり ：2時間飲み放題付きコース/3時間飲み放題付きコース3500円から~とコスパ最高なお値打ちコース。",
            "private_room": "あり ：完全個室/半個室/カウンター/プライベート空間",
            "features": [
                "居酒屋",
                "心温まる旨辛博多もつ鍋◎ 新鮮なお刺身は種類豊富！"
            ]
        }
    },
    {
        "id": "J003829732",
        "name": "トロ匠 新宿三丁目店",
        "address": "東京都新宿区新宿３丁目-7-5 新宿リカケイビル 2F",
        "rating": 4.2,
        "photo_url": "https://imgfp.hotp.jp/IMGH/24/51/P049162451/P049162451_238.jpg",
        "urls": {
            "pc": "https://www.hotpepper.jp/strJ003829732/?vos=nhppalsa000016"
        },
        "availability": {
            "can_reserve": true,
            "status": "○ (空きあり)"
        },
        "info": {
            "access": "【喫煙席有り】新宿駅 徒歩5分/新宿三丁目駅 徒歩1分 完全個室 3時間飲み放題付き宴会コース3500円~完全個室で旨い魚◎",
            "open_hours": "月～日、祝日、祝前日: 12:00～翌5:00 （料理L.O. 翌4:00 ドリンクL.O. 翌4:30）",
            "budget": "3001～4000円",
            "capacity": 130,
            "free_drink": "あり ：2時間飲み放題付きコース/3時間飲み放題付きコース3500円から~とコスパ最高なお値打ちコース。",
            "private_room": "あり ：完全個室/半個室/カウンター/プライベート空間",
            "features": [
                "居酒屋",
                "心温まる旨辛博多もつ鍋◎ 日替わりの魚料理◎"
            ]
        }
    },
    {
        "id": "J001201332",
        "name": "お肉とチーズとワイン next 肉MARKET 天王寺店",
        "address": "大阪府大阪市阿倍野区阿倍野筋１-1-61 新宿ごちそうビルB1",
        "rating": 3.9,
        "photo_url": "https://imgfp.hotp.jp/IMGH/79/93/P049637993/P049637993_238.jpg",
        "urls": {
            "pc": "https://www.hotpepper.jp/strJ001201332/?vos=nhppalsa000016"
        },
        "availability": {
            "can_reserve": true,
            "status": "○ (空きあり)"
        },
        "info": {
            "access": "天王寺駅 徒歩2分・近鉄大阪阿部野橋駅　直結　（新宿ごちそうビルB1F） ",
            "open_hours": "月～日、祝日、祝前日: 12:00～23:30 （料理L.O. 22:30 ドリンクL.O. 23:00）",
            "budget": "4001～5000円",
            "capacity": 88,
            "free_drink": "あり",
            "private_room": "あり ：親しいご友人同士や女子会、デートのご利用など、気兼ねなく楽しむお食事におすすめです",
            "features": [
                "居酒屋",
                "食べ放題2500円～♪ お得に美味しく楽しめる"
            ]
        }
    },
    {
        "id": "J000962523",
        "name": "越後酒房 神楽坂店",
        "address": "東京都新宿区神楽坂１－１０　アイダビル３Ｆ",
        "rating": 4.8,
        "photo_url": "https://imgfp.hotp.jp/IMGH/11/20/P023241120/P023241120_238.jpg",
        "urls": {
            "pc": "https://www.hotpepper.jp/strJ000962523/?vos=nhppalsa000016"
        },
        "availability": {
            "can_reserve": true,
            "status": "○ (空きあり)"
        },
        "info": {
            "access": "【飯田橋 神楽坂 居酒屋】JR飯田橋駅 東西線飯田橋駅 有楽町線飯田橋駅徒歩1分  牛込神楽坂駅 徒歩5分",
            "open_hours": "月～日、祝日、祝前日: 16:00～翌0:00 （料理L.O. 23:00 ドリンクL.O. 23:30）",
            "budget": "4001～5000円",
            "capacity": 70,
            "free_drink": "あり ：ご満足いただけるようメニューの種類を豊富にご用意致しております。",
            "private_room": "あり ：全席個室。お客様のプライベートをお守りする個室席を豊富にご用意致しました。",
            "features": [
                "居酒屋",
                "全席個室◎貸切宴会もOK 旬の飲み放題付プラン有り"
            ]
        }
    },
    {
        "id": "J001294621",
        "name": "なんじゃもんじゃ新宿",
        "address": "東京都新宿区新宿３－７－５ 一兆ビル３・４階",
        "rating": 3.8,
        "photo_url": "https://imgfp.hotp.jp/IMGH/55/02/P030345502/P030345502_238.jpg",
        "urls": {
            "pc": "https://www.hotpepper.jp/strJ001294621/?vos=nhppalsa000016"
        },
        "availability": {
            "can_reserve": true,
            "status": "○ (空きあり)"
        },
        "info": {
            "access": "新宿三丁目駅徒歩1分/宴会最大50人",
            "open_hours": "月～金、祝日、祝前日: 16:30～翌0:00 （料理L.O. 23:00 ドリンクL.O. 23:30）土: 13:00～16:0016:30～翌0:00 （料理L.O. 23:00 ドリンクL.O. 23:30）日: 12:00～16:0016:30～23:00 （料理L.O. 22:00 ドリンクL.O. 22:30）",
            "budget": "2001～3000円",
            "capacity": 70,
            "free_drink": "あり ：150分飲み＆食べ放題3980円でございます♪",
            "private_room": "なし ：15名からの個室貸切は応相談。",
            "features": [
                "居酒屋",
                "鉄板焼き、おつまみも充実 150分飲み＆食べ放題"
            ]
        }
    },
    {
        "id": "J004089923",
        "name": "甚平 じんべえ 四ツ谷本店",
        "address": "東京都新宿区四谷１丁目２３－１５　上野ビル　２階",
        "rating": 4.6,
        "photo_url": "https://imgfp.hotp.jp/IMGH/24/43/P047752443/P047752443_238.jpg",
        "urls": {
            "pc": "https://www.hotpepper.jp/strJ004089923/?vos=nhppalsa000016"
        },
        "availability": {
            "can_reserve": true,
            "status": "○ (空きあり)"
        },
        "info": {
            "access": "東京メトロ四ツ谷駅２出口より徒歩約1分/ＪＲ四ツ谷駅アトレ南口より徒歩約2分",
            "open_hours": "月～日、祝日、祝前日: 12:00～翌2:00 （料理L.O. 翌1:00 ドリンクL.O. 翌1:30）",
            "budget": "2001～3000円",
            "capacity": 100,
            "free_drink": "あり ：飲み放題2時間1800円・生ビール付グレードアップ2500円→1800円（毎日）金・土・祝前OK！！※＋500円",
            "private_room": "あり ：個室8名様×6/★貸切はフロア100名様～・全貸切120名～",
            "features": [
                "居酒屋",
                "扉付完全個室2名～団体迄 お得な飲み放題あり！"
            ]
        }
    },
    {
        "id": "J003366503",
        "name": "23番地 新宿東口店",
        "address": "東京都新宿区新宿３－２１－４　第２サンパークビル６階・７階",
        "rating": 4.2,
        "photo_url": "https://imgfp.hotp.jp/IMGH/66/47/P032306647/P032306647_238.jpg",
        "urls": {
            "pc": "https://www.hotpepper.jp/strJ003366503/?vos=nhppalsa000016"
        },
        "availability": {
            "can_reserve": true,
            "status": "○ (空きあり)"
        },
        "info": {
            "access": "新宿駅 東口　徒歩２分。アルタ裏。 【ＧＵＣＣＩ】 と 【みずほ銀行】 の間の道を・１００ｍ直進。靖国通り手前・右。 ",
            "open_hours": "月～日、祝日、祝前日: 11:30～14:30 （料理L.O. 14:30 ドリンクL.O. 14:30）14:35～翌0:00 （料理L.O. 23:00 ドリンクL.O. 23:00）",
            "budget": "2001～3000円",
            "capacity": 120,
            "free_drink": "あり ：クーポン使用で２４５０円⇒１０００円でご利用になれます。【日・月曜】⇒５００円 でご案内♪ ",
            "private_room": "あり ：離れ 情緒 ・ 完全個室。 ※２名～２０名。８名～６０名用。  掘りこたつ個室 ＆ セパレートＢＯＸ個室",
            "features": [
                "居酒屋",
                "★お会計：１０％ＯＦＦ★ ★完全個室：２～６０名★"
            ]
        }
    },
    {
        "id": "J004591871",
        "name": "たん屋 囲 飯田橋本店",
        "address": "東京都新宿区揚場町2－27　ＭＩＴ飯田橋ビル2階",
        "rating": 4.7,
        "photo_url": "https://imgfp.hotp.jp/IMGH/48/80/P050014880/P050014880_238.jpg",
        "urls": {
            "pc": "https://www.hotpepper.jp/strJ004591871/?vos=nhppalsa000016"
        },
        "availability": {
            "can_reserve": true,
            "status": "○ (空きあり)"
        },
        "info": {
            "access": "飯田橋より徒歩5分",
            "open_hours": "月～日、祝日、祝前日: 16:00～翌0:00 （料理L.O. 23:00 ドリンクL.O. 23:30）",
            "budget": "4001～5000円",
            "capacity": 100,
            "free_drink": "あり",
            "private_room": "あり",
            "features": [
                "居酒屋",
                "ゆったり過ごせる個室席！ 飲放題付コース4500円～！"
            ]
        }
    }
];

    // --- DOM要素の取得 ---
    const searchSection = document.getElementById('search-section');
    const resultsSection = document.getElementById('results-section');
    const promptInput = document.getElementById('prompt-input');
    const searchButton = document.getElementById('search-button');
    const backButton = document.getElementById('back-button');
    const tabsContainer = document.getElementById('tabs');
    const cardsContainer = document.getElementById('cards-container');
    const btnText = searchButton.querySelector('.btn-text');
    const spinner = searchButton.querySelector('.loading-spinner');

    // --- イベントリスナーの登録 ---
    searchButton.addEventListener('click', handleSearch);
    backButton.addEventListener('click', showSearchSection);

    // Enterキーでも検索できるようにする
    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSearch();
        }
    });

    // --- 処理関数 ---
    function handleSearch() {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert('お店の要望を入力してください！\n例: 安くておしゃれなイタリアン');
            return;
        }

        // ローディングアニメーション（AI検索中を擬似的に表現）
        btnText.classList.add('hidden');
        spinner.classList.remove('hidden');
        searchButton.disabled = true;

        setTimeout(() => {
            // ボタンの状態を元に戻す
            btnText.classList.remove('hidden');
            spinner.classList.add('hidden');
            searchButton.disabled = false;

            // 検索結果の描画と画面遷移
            renderResults(mockRestaurants);
            showResultsSection();
        }, 1500); // 1.5秒のモック遅延
    }

    function showSearchSection() {
        resultsSection.classList.remove('active');
        resultsSection.classList.add('hidden');
        searchSection.classList.remove('hidden');
        
        // CSSアニメーションのために少し遅延を入れる
        setTimeout(() => {
            searchSection.classList.add('active');
        }, 10);
    }

    function showResultsSection() {
        searchSection.classList.remove('active');
        searchSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        
        setTimeout(() => {
            resultsSection.classList.add('active');
            // 表示された時に一番左までスクロールをリセット
            cardsContainer.scrollLeft = 0;
            updateActiveTab(0);
        }, 10);
    }

    function renderResults(restaurants) {
        // 既存の要素をクリア
        tabsContainer.innerHTML = '';
        cardsContainer.innerHTML = '';

        // 画像URLがデータにないため、ランダムなプレースホルダー画像を用意
        const fallbackImages = [
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
        ];

        restaurants.forEach((restaurant, index) => {
            // 1. タブの作成
            const tab = document.createElement('div');
            tab.className = `tab ${index === 0 ? 'active-tab' : ''}`;
            tab.textContent = restaurant.name;
            tab.addEventListener('click', () => scrollToCard(index));
            tabsContainer.appendChild(tab);

            // 表示データの整形
            // photo_urlがあればそれを使用し、なければフォールバック
            const imageUrl = restaurant.photo_url || fallbackImages[index % fallbackImages.length];
            const ratingText = restaurant.rating ? `⭐ ${restaurant.rating}` : '⭐ 評価なし';
            const addressText = restaurant.address ? `📍 ${restaurant.address}` : '';
            const accessText = restaurant.info?.access ? `🚶 ${restaurant.info.access}` : '';
            const budgetText = restaurant.info?.budget ? `💰 予算: ${restaurant.info.budget}` : '';
            const capacityText = restaurant.info?.capacity ? `🪑 席数: ${restaurant.info.capacity}席` : '';
            const availabilityText = restaurant.availability?.status ? `📅 予約: ${restaurant.availability.status}` : '';
            
            // 新規追加項目
            const openHoursText = restaurant.info?.open_hours ? `🕒 営業: ${restaurant.info.open_hours}` : '';
            const freeDrinkText = restaurant.info?.free_drink ? `🍻 飲み放題: ${restaurant.info.free_drink}` : '';
            const privateRoomText = restaurant.info?.private_room ? `🚪 個室: ${restaurant.info.private_room}` : '';
            
            // featuresは配列なので結合して概要として表示
            const summaryText = restaurant.info?.features?.join(' / ') || '情報がありません';

            // 予約ページのURL
            const reserveUrl = restaurant.urls?.pc || '#';
            const targetAttr = reserveUrl !== '#' ? 'target="_blank" rel="noopener noreferrer"' : '';

            // 2. カードの作成
            const card = document.createElement('div');
            card.className = 'card';
            card.id = `card-${index}`;
            card.innerHTML = `
                <img src="${imageUrl}" alt="${restaurant.name}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title" style="font-size: 1.3rem;">${restaurant.name}</h3>
                    <div class="rating" style="margin-bottom: 10px;">${ratingText}</div>
                    <div class="address" style="margin-bottom: 5px;">${addressText}</div>
                    ${accessText ? `<div class="access" style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 10px;">${accessText}</div>` : ''}
                    
                    <div class="details" style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 15px; display: flex; flex-direction: column; gap: 4px; background: #fffcf8; padding: 10px; border-radius: 12px;">
                        ${budgetText ? `<span>${budgetText}</span>` : ''}
                        ${capacityText ? `<span>${capacityText}</span>` : ''}
                        ${availabilityText ? `<span style="color: var(--primary-color); font-weight: bold;">${availabilityText}</span>` : ''}
                        ${freeDrinkText ? `<span>${freeDrinkText}</span>` : ''}
                        ${privateRoomText ? `<span>${privateRoomText}</span>` : ''}
                        ${openHoursText ? `<span style="font-size: 0.8rem; margin-top: 4px; line-height: 1.3;">${openHoursText}</span>` : ''}
                    </div>
                    
                    <p class="summary" style="margin-bottom: 15px;">${summaryText}</p>
                    <a href="${reserveUrl}" ${targetAttr} style="text-decoration: none;">
                        <button class="action-btn">予約ページへ</button>
                    </a>
                </div>
            `;
            cardsContainer.appendChild(card);
        });

        // スクロール時のイベントリスナーを追加して、表示されているカードに応じてタブのハイライトを変更する
        cardsContainer.addEventListener('scroll', handleScroll);
    }

    function scrollToCard(index) {
        const card = document.getElementById(`card-${index}`);
        if (card) {
            // 対象のカードまでスムーススクロール
            cardsContainer.scrollTo({
                left: card.offsetLeft - cardsContainer.offsetLeft,
                behavior: 'smooth'
            });
            updateActiveTab(index);
        }
    }

    function handleScroll() {
        const cards = document.querySelectorAll('.card');
        const containerScrollLeft = cardsContainer.scrollLeft;
        
        let activeIndex = 0;
        let minDistance = Infinity;

        // 画面中央に最も近いカードを計算する
        cards.forEach((card, index) => {
            const cardLeft = card.offsetLeft - cardsContainer.offsetLeft;
            const distance = Math.abs(containerScrollLeft - cardLeft);
            if (distance < minDistance) {
                minDistance = distance;
                activeIndex = index;
            }
        });

        updateActiveTab(activeIndex);
    }

    function updateActiveTab(activeIndex) {
        document.querySelectorAll('.tab').forEach((tab, index) => {
            if (index === activeIndex) {
                tab.classList.add('active-tab');
            } else {
                tab.classList.remove('active-tab');
            }
        });
    }
});
