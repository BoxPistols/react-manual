import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function Events() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 9
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          イベントハンドリング
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          ユーザーのクリック、入力、送信などの操作に応答する方法を学びます。useState と組み合わせることで、インタラクティブな UI の構築パターンが完成します。
        </p>

        <WhyNowBox tags={['ユーザー操作', 'イベント', 'インタラクション']}>
          <p>
            useState で「データの変更」ができるようになりました。次は「いつ変更するか」、つまりユーザーの操作（イベント）に応答する方法を学びます。
          </p>
          <p>
            ボタンのクリック、テキストの入力、フォームの送信、キーボード操作 ── すべてのインタラクションは「イベント」として React に伝わります。デザインツールでいう「プロトタイプのトリガー」と同じ考え方です。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* onClick */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">onClick: クリックイベント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最も基本的なイベントです。ボタンやリンク、カードなど、クリック可能な要素に使います。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function ClickExample() {
  const [message, setMessage] = useState('ボタンをクリックしてください');

  // 方法1: インラインで書く（短い処理のとき）
  // <button onClick={() => setMessage('クリックされました！')}>

  // 方法2: 関数を定義して渡す（推奨）
  const handleClick = () => {
    setMessage('クリックされました！');
  };

  // 方法3: イベントオブジェクトを受け取る
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('クリック位置:', e.clientX, e.clientY);
    setMessage(\`座標 (\${e.clientX}, \${e.clientY}) でクリック\`);
  };

  return (
    <div className="p-6 space-y-4">
      <p className="text-lg">{message}</p>
      <div className="flex gap-3">
        <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          クリック
        </button>
        <button onClick={handleButtonClick} className="px-4 py-2 bg-purple-500 text-white rounded-lg">
          座標を取得
        </button>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="onClick の基本的な使い方"
            />
            <InfoBox type="warning" title="よくある間違い: 関数の呼び出しを渡してしまう">
              <p>
                <code>onClick={'{handleClick()}'}</code> と書くと、レンダリング時に関数が即座に実行されてしまいます。関数の「参照」を渡す必要があるので、括弧なしの <code>onClick={'{handleClick}'}</code> が正しい書き方です。引数を渡したい場合は <code>onClick={'() => handleClick(id)'}</code> のようにアロー関数で包みます。
              </p>
            </InfoBox>
          </section>

          {/* イベントハンドラの命名規則 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">イベントハンドラの命名規則</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              イベントハンドラ関数の命名には「handle + 対象 + イベント名」というパターンが広く使われています。
            </p>
            <CodeBlock
              code={`// 命名パターン: handle + 何を + どうする
function FormComponent() {
  // handleClick - 汎用的なクリック
  const handleClick = () => { /* ... */ };

  // handleSubmit - フォーム送信
  const handleSubmit = () => { /* ... */ };

  // handleNameChange - 名前フィールドの変更
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* ... */
  };

  // handleDeleteItem - アイテム削除
  const handleDeleteItem = (id: number) => { /* ... */ };

  // handleToggleMenu - メニューの開閉
  const handleToggleMenu = () => { /* ... */ };

  // handleKeyDown - キー押下
  const handleKeyDown = (e: React.KeyboardEvent) => { /* ... */ };

  return (
    <div>
      <button onClick={handleClick}>クリック</button>
      <input onChange={handleNameChange} />
      <form onSubmit={handleSubmit}>
        <button type="submit">送信</button>
      </form>
    </div>
  );
}

// コンポーネントの Props としてイベントハンドラを渡す場合は on + イベント名
interface CardProps {
  onDelete: (id: number) => void;   // Props は onXxx
  onClick: () => void;
}

function Card({ onDelete, onClick }: CardProps) {
  // 内部のハンドラは handleXxx
  const handleDeleteClick = () => {
    if (confirm('削除しますか？')) {
      onDelete(123);
    }
  };

  return (
    <div onClick={onClick}>
      <button onClick={handleDeleteClick}>削除</button>
    </div>
  );
}`}
              language="tsx"
              title="命名規則: handle vs on"
            />
            <InfoBox type="success" title="命名のルール">
              <p>
                コンポーネント内部の関数は <strong>handleXxx</strong>、Props として外部に公開するときは <strong>onXxx</strong> と名付けるのが React のお約束です。HTML のイベント（onClick, onChange）と揃えることで、直感的に理解できます。
              </p>
            </InfoBox>
          </section>

          {/* onChange */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">onChange: 入力の変更イベント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              テキスト入力、セレクトボックス、チェックボックスなど、フォーム要素の値が変わったときに発火するイベントです。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function InputEvents() {
  const [text, setText] = useState('');
  const [color, setColor] = useState('red');
  const [agree, setAgree] = useState(false);

  // テキスト入力: e.target.value で入力値を取得
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // セレクト: 同じく e.target.value
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value);
  };

  // チェックボックス: e.target.checked で真偽値を取得
  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgree(e.target.checked);
  };

  return (
    <div className="p-6 space-y-4 max-w-md">
      {/* テキスト入力 */}
      <div>
        <label className="block text-sm font-medium mb-1">テキスト</label>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <p className="text-sm text-gray-500 mt-1">入力値: {text}</p>
      </div>

      {/* セレクトボックス */}
      <div>
        <label className="block text-sm font-medium mb-1">色を選択</label>
        <select
          value={color}
          onChange={handleColorChange}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="red">赤</option>
          <option value="blue">青</option>
          <option value="green">緑</option>
        </select>
        <div
          className="mt-2 w-8 h-8 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* チェックボックス */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={agree}
          onChange={handleAgreeChange}
          className="w-4 h-4"
        />
        <span>利用規約に同意する</span>
      </label>
      <p className="text-sm text-gray-500">
        同意: {agree ? 'はい' : 'いいえ'}
      </p>
    </div>
  );
}`}
              language="tsx"
              title="onChange でフォーム入力を処理する"
              showLineNumbers
            />
          </section>

          {/* onSubmit と preventDefault */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">onSubmit とデフォルト動作の防止</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              フォームを送信すると、ブラウザはページを再読み込みしようとします。React アプリではこの動作を防いで、JavaScript で処理を行います。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function SearchForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // ページ再読み込みを防止！

    if (!query.trim()) return;

    // 実際のアプリでは API を呼ぶ
    setResults((prev) => [...prev, \`「\${query}」の検索結果\`]);
    setQuery(''); // 入力をクリア
  };

  return (
    <div className="p-6 max-w-md">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="検索ワードを入力..."
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          検索
        </button>
      </form>

      <ul className="space-y-2">
        {results.map((result, i) => (
          <li key={i} className="p-2 bg-gray-50 rounded">
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
}`}
              language="tsx"
              title="onSubmit と preventDefault"
            />
            <InfoBox type="error" title="e.preventDefault() を忘れると...">
              <p>
                フォームの onSubmit で <code>e.preventDefault()</code> を忘れると、送信するたびにページが再読み込みされ、state がすべてリセットされてしまいます。React のフォーム送信では必ず呼びましょう。
              </p>
            </InfoBox>
          </section>

          {/* イベントハンドラに引数を渡す */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">イベントハンドラに引数を渡す</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              リストの各項目に対してイベントを設定するとき、どのアイテムがクリックされたかを知る必要があります。アロー関数で引数を渡しましょう。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

interface Notification {
  id: number;
  title: string;
  read: boolean;
}

function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: '新しいメッセージが届きました', read: false },
    { id: 2, title: 'プロジェクトが更新されました', read: false },
    { id: 3, title: 'レビューが完了しました', read: true },
  ]);

  // id を受け取って既読にする
  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // id を受け取って削除する
  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // すべて既読にする
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="p-6 max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">通知</h2>
        <button
          onClick={handleMarkAllAsRead}
          className="text-sm text-blue-600 hover:underline"
        >
          すべて既読にする
        </button>
      </div>

      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={\`p-3 rounded-lg border flex justify-between items-center
              \${notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}\`}
          >
            <div>
              <span className={\`text-sm \${notification.read ? 'text-gray-500' : 'font-medium'}\`}>
                {notification.title}
              </span>
            </div>
            <div className="flex gap-2">
              {!notification.read && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  既読
                </button>
              )}
              <button
                onClick={() => handleDelete(notification.id)}
                className="text-xs text-red-500 hover:underline"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
              language="tsx"
              title="各アイテムに引数付きイベントハンドラを設定"
              showLineNumbers
            />
          </section>

          {/* キーボードイベント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">キーボードイベント</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              キーボード入力を検知して、ショートカットや特定のキー操作に応答できます。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function KeyboardEvents() {
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addLog = (message: string) => {
    setLog((prev) => [message, ...prev.slice(0, 9)]); // 最新10件
  };

  // onKeyDown: キーが押されたとき
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter キーで確定
    if (e.key === 'Enter') {
      addLog(\`確定: "\${input}"\`);
      setInput('');
    }

    // Escape キーでクリア
    if (e.key === 'Escape') {
      setInput('');
      addLog('入力をクリアしました');
    }

    // Ctrl/Cmd + Enter で送信
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      addLog('Ctrl+Enter: 送信しました');
    }
  };

  return (
    <div className="p-6 max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          入力してEnterで確定、Escapeでクリア
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="テキストを入力..."
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm font-medium mb-2">ログ:</p>
        {log.length === 0 ? (
          <p className="text-sm text-gray-400">まだ操作がありません</p>
        ) : (
          <ul className="text-sm space-y-1">
            {log.map((entry, i) => (
              <li key={i} className="text-gray-600">
                {entry}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}`}
              language="tsx"
              title="キーボードイベントの処理"
            />
            <InfoBox type="info" title="よく使うキーボードイベント">
              <p>
                <code>onKeyDown</code>（キーを押したとき）が最も汎用的です。<code>e.key</code> で押されたキー名を取得し、<code>e.ctrlKey</code>、<code>e.shiftKey</code>、<code>e.metaKey</code>（Mac の Cmd）で修飾キーの状態を確認できます。
              </p>
            </InfoBox>
          </section>

          {/* 実践例: カラーピッカー */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: インタラクティブ・カラーピッカー</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでのイベント処理を組み合わせた、実用的なカラーピッカーを作ります。クリック、入力、キーボードイベントを組み合わせています。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

const PRESET_COLORS = [
  { name: 'レッド', hex: '#EF4444' },
  { name: 'オレンジ', hex: '#F97316' },
  { name: 'アンバー', hex: '#F59E0B' },
  { name: 'グリーン', hex: '#22C55E' },
  { name: 'ブルー', hex: '#3B82F6' },
  { name: 'インディゴ', hex: '#6366F1' },
  { name: 'パープル', hex: '#A855F7' },
  { name: 'ピンク', hex: '#EC4899' },
];

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [customHex, setCustomHex] = useState('#3B82F6');
  const [copiedMessage, setCopiedMessage] = useState('');
  const [savedColors, setSavedColors] = useState<string[]>([]);

  // プリセット色をクリック
  const handlePresetClick = (hex: string) => {
    setSelectedColor(hex);
    setCustomHex(hex);
  };

  // カスタムHEX入力
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomHex(value);
    // 有効なHEXコードなら反映
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setSelectedColor(value);
    }
  };

  // Enter で色を確定
  const handleHexKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && /^#[0-9A-Fa-f]{6}$/.test(customHex)) {
      handleSaveColor();
    }
  };

  // 色をコピー
  const handleCopyColor = () => {
    navigator.clipboard.writeText(selectedColor);
    setCopiedMessage('コピーしました！');
    setTimeout(() => setCopiedMessage(''), 2000);
  };

  // 色を保存
  const handleSaveColor = () => {
    if (!savedColors.includes(selectedColor)) {
      setSavedColors((prev) => [...prev, selectedColor]);
    }
  };

  // 保存した色を削除
  const handleRemoveSaved = (color: string) => {
    setSavedColors((prev) => prev.filter((c) => c !== color));
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <h2 className="text-xl font-bold">カラーピッカー</h2>

      {/* プレビュー */}
      <div
        className="w-full h-32 rounded-xl shadow-inner transition-colors duration-300"
        style={{ backgroundColor: selectedColor }}
      />

      {/* カラーコード表示 */}
      <div className="flex items-center gap-2">
        <code className="text-lg font-mono font-bold">{selectedColor}</code>
        <button
          onClick={handleCopyColor}
          className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          コピー
        </button>
        <button
          onClick={handleSaveColor}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          保存
        </button>
        {copiedMessage && (
          <span className="text-sm text-green-600">{copiedMessage}</span>
        )}
      </div>

      {/* プリセット色 */}
      <div>
        <p className="text-sm font-medium mb-2">プリセット</p>
        <div className="grid grid-cols-8 gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => handlePresetClick(color.hex)}
              title={color.name}
              className={\`w-8 h-8 rounded-full transition-transform hover:scale-110
                \${selectedColor === color.hex ? 'ring-2 ring-offset-2 ring-blue-500' : ''}\`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* カスタム入力 */}
      <div>
        <label className="block text-sm font-medium mb-1">
          カスタム HEX（Enter で保存）
        </label>
        <input
          type="text"
          value={customHex}
          onChange={handleHexChange}
          onKeyDown={handleHexKeyDown}
          placeholder="#FF5733"
          maxLength={7}
          className="w-full px-3 py-2 border rounded-lg font-mono"
        />
      </div>

      {/* 保存した色 */}
      {savedColors.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">
            保存した色（{savedColors.length}）
          </p>
          <div className="flex flex-wrap gap-2">
            {savedColors.map((color) => (
              <div key={color} className="flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs font-mono">{color}</span>
                <button
                  onClick={() => handleRemoveSaved(color)}
                  className="text-gray-400 hover:text-red-500 text-xs ml-1"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`}
              language="tsx"
              title="カラーピッカー - 複数のイベントを組み合わせた実践例"
              showLineNumbers
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">主要なイベント</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- <code>onClick</code> - クリック</li>
                  <li>- <code>onChange</code> - 値の変更（input, select）</li>
                  <li>- <code>onSubmit</code> - フォーム送信</li>
                  <li>- <code>onKeyDown</code> - キーボード押下</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">ベストプラクティス</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- 関数名は handleXxx（内部）/ onXxx（Props）</li>
                  <li>- フォーム送信は e.preventDefault() 必須</li>
                  <li>- 引数はアロー関数で渡す</li>
                  <li>- onClick={'{fn}'} であり onClick={'{fn()}'} ではない</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
