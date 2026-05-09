document.addEventListener('DOMContentLoaded', () => {
    // バックエンドの /api/search エンドポイントを呼び出すように変更しました。
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

        // バックエンド（/api/search）へリクエストを送信
        fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        })
        .then(response => response.json())
        .then(data => {
            // ボタンの状態を元に戻す
            btnText.classList.remove('hidden');
            spinner.classList.add('hidden');
            searchButton.disabled = false;

            if (data.status === 'success' && data.data.restaurants && data.data.restaurants.length > 0) {
                // 検索結果の描画と画面遷移
                renderResults(data.data.restaurants);
                showResultsSection();
            } else {
                alert('条件に合うレストランが見つかりませんでした。\n別の条件（例：場所を「新宿」だけにするなど）で試してみてください！');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            btnText.classList.remove('hidden');
            spinner.classList.add('hidden');
            searchButton.disabled = false;
            alert('検索中にエラーが発生しました。時間を置いて再度お試しください。');
        });
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
