import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';

export default function Forms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            STEP 11
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
          フォーム入門
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          ログインフォーム、問い合わせフォーム、設定画面 ── Web アプリに欠かせないフォームの実装パターンを学びます。React では「制御コンポーネント」というアプローチで、フォームの状態を完全にコントロールします。
        </p>

        <WhyNowBox tags={['フォーム', '制御コンポーネント', 'バリデーション', '実践']}>
          <p>
            useState、イベントハンドリング、条件分岐 ── ここまで学んだ知識が、フォーム実装ですべてつながります。フォームは Web アプリの中で最もインタラクティブな部分であり、これらの知識を総動員する実践的なテーマです。
          </p>
          <p>
            デザイナーとして「フォームの入力状態」「バリデーションエラー」「送信中の表示」をデザインしてきた方も多いでしょう。React でそれらを実装する方法を理解することで、デザインと実装の橋渡しができるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* 制御コンポーネント */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">制御コンポーネント（Controlled Components）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              React のフォームでは、入力要素の値を state で管理します。これを「制御コンポーネント」と呼びます。<code className="text-sm bg-muted px-1.5 py-0.5 rounded">value</code> と <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onChange</code> のセットが基本パターンです。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function ControlledInput() {
  const [name, setName] = useState('');

  return (
    <div className="p-6 max-w-md">
      {/*
        制御コンポーネントの仕組み:
        1. value={name} で state の値を input に反映
        2. onChange で入力値を受け取り state を更新
        3. state が更新されると再レンダリング → value が更新される

        この循環で、React が入力値を完全に制御する
      */}
      <input
        type="text"
        value={name}          // state の値を表示
        onChange={(e) => setName(e.target.value)}  // 入力があるたびに state を更新
        className="w-full px-3 py-2 border rounded-lg"
      />
      <p className="mt-2 text-sm text-gray-500">
        現在の値: 「{name}」({name.length}文字)
      </p>
    </div>
  );
}`}
              language="tsx"
              title="制御コンポーネントの基本"
            />
            <InfoBox type="info" title="なぜ制御コンポーネントを使うのか？">
              <p>
                value と onChange を使うことで、React が入力値の「唯一の真実の情報源（Single Source of Truth）」になります。バリデーション、値のフォーマット、条件付きの入力制限など、あらゆる制御が可能になります。
              </p>
            </InfoBox>
          </section>

          {/* テキスト入力とテキストエリア */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">テキスト入力とテキストエリア</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              テキスト系の入力要素は、いずれも同じパターン（value + onChange）で制御します。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function TextInputs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  return (
    <div className="p-6 max-w-md space-y-4">
      {/* 通常のテキスト入力 */}
      <div>
        <label className="block text-sm font-medium mb-1">名前</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="山田太郎"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
        />
      </div>

      {/* メール入力（ブラウザのバリデーションが効く） */}
      <div>
        <label className="block text-sm font-medium mb-1">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
        />
      </div>

      {/* パスワード入力 */}
      <div>
        <label className="block text-sm font-medium mb-1">パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="8文字以上"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
        />
        {password.length > 0 && password.length < 8 && (
          <p className="text-sm text-red-500 mt-1">8文字以上で入力してください</p>
        )}
      </div>

      {/* テキストエリア */}
      <div>
        <label className="block text-sm font-medium mb-1">
          自己紹介
          <span className="text-gray-400 ml-2">{bio.length}/200</span>
        </label>
        <textarea
          value={bio}
          onChange={(e) => {
            if (e.target.value.length <= 200) {
              setBio(e.target.value);
            }
          }}
          placeholder="自己紹介を書いてください..."
          rows={4}
          className="w-full px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-300 outline-none"
        />
      </div>
    </div>
  );
}`}
              language="tsx"
              title="テキスト入力のバリエーション"
              showLineNumbers
            />
          </section>

          {/* セレクトボックス */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">セレクトボックス</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              HTML の select 要素も、value と onChange で制御します。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function SelectExample() {
  const [prefecture, setPrefecture] = useState('');
  const [fontSize, setFontSize] = useState('16');

  const prefectures = [
    { value: '', label: '選択してください' },
    { value: 'tokyo', label: '東京都' },
    { value: 'osaka', label: '大阪府' },
    { value: 'kyoto', label: '京都府' },
    { value: 'hokkaido', label: '北海道' },
    { value: 'fukuoka', label: '福岡県' },
  ];

  return (
    <div className="p-6 max-w-md space-y-4">
      {/* 基本的な select */}
      <div>
        <label className="block text-sm font-medium mb-1">都道府県</label>
        <select
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg bg-white"
        >
          {prefectures.map((pref) => (
            <option key={pref.value} value={pref.value}>
              {pref.label}
            </option>
          ))}
        </select>
        {prefecture && (
          <p className="text-sm text-green-600 mt-1">
            選択中: {prefectures.find((p) => p.value === prefecture)?.label}
          </p>
        )}
      </div>

      {/* 選択結果をリアルタイムに反映 */}
      <div>
        <label className="block text-sm font-medium mb-1">フォントサイズ</label>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg bg-white"
        >
          <option value="12">12px - 小さい</option>
          <option value="16">16px - 標準</option>
          <option value="20">20px - 大きめ</option>
          <option value="24">24px - 大きい</option>
        </select>
        <p
          className="mt-3 p-3 bg-gray-50 rounded-lg"
          style={{ fontSize: \`\${fontSize}px\` }}
        >
          このテキストのサイズが変わります
        </p>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="セレクトボックスの制御"
            />
          </section>

          {/* チェックボックスとラジオボタン */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">チェックボックスとラジオボタン</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              チェックボックスは <code className="text-sm bg-muted px-1.5 py-0.5 rounded">checked</code> + <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onChange</code>、ラジオボタンは <code className="text-sm bg-muted px-1.5 py-0.5 rounded">checked</code> + <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onChange</code> + 共通の state で制御します。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function CheckboxRadio() {
  // チェックボックス: 複数選択可
  const [interests, setInterests] = useState<string[]>([]);

  // ラジオボタン: 1つだけ選択
  const [plan, setPlan] = useState('free');

  // チェックボックスの切り替え
  const handleInterestChange = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)  // 含まれていたら削除
        : [...prev, interest]                  // 含まれていなければ追加
    );
  };

  const interestOptions = ['デザイン', 'プログラミング', '写真', 'イラスト', '動画編集'];

  const plans = [
    { value: 'free', label: 'フリープラン', price: '¥0/月' },
    { value: 'pro', label: 'プロプラン', price: '¥980/月' },
    { value: 'team', label: 'チームプラン', price: '¥2,980/月' },
  ];

  return (
    <div className="p-6 max-w-md space-y-8">
      {/* チェックボックス: 複数選択 */}
      <div>
        <p className="text-sm font-medium mb-3">興味のある分野（複数選択可）</p>
        <div className="space-y-2">
          {interestOptions.map((interest) => (
            <label key={interest} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">{interest}</span>
            </label>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          選択中: {interests.length > 0 ? interests.join(', ') : 'なし'}
        </p>
      </div>

      {/* ラジオボタン: 単一選択 */}
      <div>
        <p className="text-sm font-medium mb-3">プランを選択</p>
        <div className="space-y-2">
          {plans.map((p) => (
            <label
              key={p.value}
              className={\`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors
                \${plan === p.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
                }\`}
            >
              <input
                type="radio"
                name="plan"
                value={p.value}
                checked={plan === p.value}
                onChange={(e) => setPlan(e.target.value)}
                className="w-4 h-4"
              />
              <div className="flex-1">
                <span className="font-medium text-sm">{p.label}</span>
              </div>
              <span className="text-sm text-gray-500">{p.price}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}`}
              language="tsx"
              title="チェックボックスとラジオボタン"
              showLineNumbers
            />
          </section>

          {/* フォーム送信 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フォーム送信（onSubmit）</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              複数の入力をまとめてフォームとして送信する方法です。<code className="text-sm bg-muted px-1.5 py-0.5 rounded">{'<form>'}</code> タグの <code className="text-sm bg-muted px-1.5 py-0.5 rounded">onSubmit</code> でまとめて処理します。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // ページ再読み込みを防止

    // バリデーション
    if (formData.password !== formData.confirmPassword) {
      alert('パスワードが一致しません');
      return;
    }

    setIsSubmitting(true);

    // 実際の API 呼び出しのシミュレーション
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('送信データ:', formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <div className="text-4xl mb-4">&#x2705;</div>
        <h2 className="text-xl font-bold">登録完了！</h2>
        <p className="text-gray-500 mt-2">ようこそ、{formData.username}さん</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md space-y-4">
      <h2 className="text-xl font-bold">アカウント作成</h2>

      <div>
        <label className="block text-sm font-medium mb-1">ユーザー名</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">メール</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">パスワード</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          minLength={8}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">パスワード（確認）</label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={\`w-full py-2 rounded-lg text-white font-medium
          \${isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
          }\`}
      >
        {isSubmitting ? '送信中...' : 'アカウントを作成'}
      </button>
    </form>
  );
}`}
              language="tsx"
              title="フォーム送信の実装"
              showLineNumbers
            />
          </section>

          {/* 単一ハンドラで複数入力を管理 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1つのハンドラで複数の入力を管理する</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              入力フィールドが増えるたびに個別の onChange を書くのは面倒です。<code className="text-sm bg-muted px-1.5 py-0.5 rounded">name</code> 属性を活用して、1つのハンドラで全フィールドを管理するテクニックがあります。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
}

function ProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
  });

  // 汎用的な変更ハンドラ
  // name 属性を使って、どのフィールドが変更されたかを判別
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,  // Computed Property で動的にキーを指定
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">姓</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">名</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">メール</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">電話番号</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">会社名</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">役職</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg bg-white"
        >
          <option value="">選択してください</option>
          <option value="designer">デザイナー</option>
          <option value="engineer">エンジニア</option>
          <option value="pm">プロダクトマネージャー</option>
          <option value="other">その他</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        保存
      </button>
    </form>
  );
}`}
              language="tsx"
              title="name 属性で汎用的な handleChange を実現"
              showLineNumbers
            />
            <InfoBox type="success" title="このパターンのメリット">
              <p>
                フィールドが10個あっても handleChange は1つで済みます。ポイントは input の <code>name</code> 属性を state のキー名と一致させることです。<code>[name]: value</code> という Computed Property Names の構文で、動的にオブジェクトのキーを指定しています。
              </p>
            </InfoBox>
          </section>

          {/* フォームバリデーション */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">フォームバリデーションの基本</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ユーザーが正しい形式でデータを入力しているかをチェックするのがバリデーションです。リアルタイムバリデーションと送信時バリデーションの2つの方法があります。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // バリデーション関数
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'お名前は必須です';
    } else if (name.length < 2) {
      newErrors.name = 'お名前は2文字以上で入力してください';
    }

    if (!email.trim()) {
      newErrors.email = 'メールアドレスは必須です';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '正しいメールアドレスの形式で入力してください';
    }

    if (!message.trim()) {
      newErrors.message = 'メッセージは必須です';
    } else if (message.length < 10) {
      newErrors.message = 'メッセージは10文字以上で入力してください';
    }

    return newErrors;
  };

  // フォーカスが外れたとき（blur）にバリデーション
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  // 送信時にバリデーション
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 全フィールドを touched にする
    setTouched({ name: true, email: true, message: true });

    const validationErrors = validate();
    setErrors(validationErrors);

    // エラーがなければ送信
    if (Object.keys(validationErrors).length === 0) {
      console.log('送信:', { name, email, message });
      alert('送信しました！');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md space-y-4">
      <h2 className="text-xl font-bold">お問い合わせ</h2>

      {/* 名前フィールド */}
      <div>
        <label className="block text-sm font-medium mb-1">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur('name')}
          className={\`w-full px-3 py-2 border rounded-lg outline-none transition-colors
            \${touched.name && errors.name
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-200'
            }\`}
        />
        {touched.name && errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* メールフィールド */}
      <div>
        <label className="block text-sm font-medium mb-1">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
          className={\`w-full px-3 py-2 border rounded-lg outline-none transition-colors
            \${touched.email && errors.email
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-200'
            }\`}
        />
        {touched.email && errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      {/* メッセージフィールド */}
      <div>
        <label className="block text-sm font-medium mb-1">
          メッセージ <span className="text-red-500">*</span>
          <span className="text-gray-400 ml-2">{message.length}/500</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= 500) setMessage(e.target.value);
          }}
          onBlur={() => handleBlur('message')}
          rows={4}
          className={\`w-full px-3 py-2 border rounded-lg resize-none outline-none transition-colors
            \${touched.message && errors.message
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-200'
            }\`}
        />
        {touched.message && errors.message && (
          <p className="text-sm text-red-500 mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
      >
        送信する
      </button>
    </form>
  );
}`}
              language="tsx"
              title="バリデーション付きお問い合わせフォーム"
              showLineNumbers
            />
            <InfoBox type="info" title="touched の役割">
              <p>
                touched はフィールドが一度でもフォーカスされたかを記録します。これにより、まだ触れていないフィールドにエラーメッセージが表示されるのを防ぎます。ユーザーがフィールドに入力してフォーカスを外したとき（blur）に初めてバリデーションエラーを表示する、というのが一般的な UX パターンです。
              </p>
            </InfoBox>
          </section>

          {/* 実践例: お問い合わせフォーム */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">実践例: 完全なお問い合わせフォーム</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでの知識を総合して、テキスト入力、セレクト、チェックボックス、バリデーション、送信処理を含む本格的なフォームを作ります。
            </p>
            <CodeBlock
              code={`import { useState } from 'react';

type InquiryType = 'general' | 'support' | 'partnership' | 'other';

interface ContactFormData {
  name: string;
  email: string;
  inquiryType: InquiryType;
  subject: string;
  message: string;
  newsletter: boolean;
  privacyPolicy: boolean;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    inquiryType: 'general',
    subject: '',
    message: '',
    newsletter: false,
    privacyPolicy: false,
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    const value =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // 入力中にエラーをクリア
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) newErrors.name = '必須項目です';
    if (!formData.email.trim()) {
      newErrors.email = '必須項目です';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しい形式で入力してください';
    }
    if (!formData.subject.trim()) newErrors.subject = '必須項目です';
    if (!formData.message.trim()) {
      newErrors.message = '必須項目です';
    } else if (formData.message.length < 10) {
      newErrors.message = '10文字以上で入力してください';
    }
    if (!formData.privacyPolicy) {
      newErrors.privacyPolicy = '同意が必要です';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  // 送信完了画面
  if (status === 'success') {
    return (
      <div className="p-8 max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">&#x2705;</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">送信完了</h2>
        <p className="text-gray-500">
          お問い合わせありがとうございます。
          <br />
          2営業日以内にご返信いたします。
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setFormData({
              name: '', email: '', inquiryType: 'general',
              subject: '', message: '', newsletter: false, privacyPolicy: false,
            });
          }}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          新しいお問い合わせ
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-5">
      <h2 className="text-2xl font-bold">お問い合わせ</h2>
      <p className="text-sm text-gray-500">
        <span className="text-red-500">*</span> は必須項目です
      </p>

      {status === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          送信に失敗しました。時間をおいて再度お試しください。
        </div>
      )}

      {/* 名前 */}
      <div>
        <label className="block text-sm font-medium mb-1">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text" name="name" value={formData.name}
          onChange={handleChange}
          className={\`w-full px-3 py-2 border rounded-lg \${errors.name ? 'border-red-500' : ''}\`}
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
      </div>

      {/* メール */}
      <div>
        <label className="block text-sm font-medium mb-1">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email" name="email" value={formData.email}
          onChange={handleChange}
          className={\`w-full px-3 py-2 border rounded-lg \${errors.email ? 'border-red-500' : ''}\`}
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>

      {/* お問い合わせ種別 */}
      <div>
        <label className="block text-sm font-medium mb-1">お問い合わせ種別</label>
        <select
          name="inquiryType" value={formData.inquiryType}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg bg-white"
        >
          <option value="general">一般的なお問い合わせ</option>
          <option value="support">技術サポート</option>
          <option value="partnership">パートナーシップ</option>
          <option value="other">その他</option>
        </select>
      </div>

      {/* 件名 */}
      <div>
        <label className="block text-sm font-medium mb-1">
          件名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text" name="subject" value={formData.subject}
          onChange={handleChange}
          className={\`w-full px-3 py-2 border rounded-lg \${errors.subject ? 'border-red-500' : ''}\`}
        />
        {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject}</p>}
      </div>

      {/* メッセージ */}
      <div>
        <label className="block text-sm font-medium mb-1">
          メッセージ <span className="text-red-500">*</span>
          <span className="text-gray-400 ml-2">{formData.message.length}/1000</span>
        </label>
        <textarea
          name="message" value={formData.message}
          onChange={(e) => {
            if (e.target.value.length <= 1000) handleChange(e);
          }}
          rows={5}
          className={\`w-full px-3 py-2 border rounded-lg resize-none \${errors.message ? 'border-red-500' : ''}\`}
        />
        {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
      </div>

      {/* チェックボックス */}
      <div className="space-y-3">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox" name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className="w-4 h-4 mt-0.5"
          />
          <span className="text-sm">ニュースレターを受け取る（任意）</span>
        </label>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox" name="privacyPolicy"
            checked={formData.privacyPolicy}
            onChange={handleChange}
            className="w-4 h-4 mt-0.5"
          />
          <span className={\`text-sm \${errors.privacyPolicy ? 'text-red-500' : ''}\`}>
            プライバシーポリシーに同意する <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.privacyPolicy && (
          <p className="text-sm text-red-500">{errors.privacyPolicy}</p>
        )}
      </div>

      {/* 送信ボタン */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={\`w-full py-3 rounded-lg text-white font-medium transition-colors
          \${status === 'submitting'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
          }\`}
      >
        {status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            送信中...
          </span>
        ) : (
          '送信する'
        )}
      </button>
    </form>
  );
}`}
              language="tsx"
              title="完全なお問い合わせフォーム"
              showLineNumbers
            />
          </section>

          {/* まとめ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">まとめ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">フォームの基本</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- value + onChange = 制御コンポーネント</li>
                  <li>- onSubmit + preventDefault でフォーム送信</li>
                  <li>- name 属性で汎用ハンドラを実現</li>
                  <li>- チェックボックスは checked + onChange</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <h3 className="font-bold text-foreground mb-2">UX のポイント</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>- blur 時にバリデーションを実行する</li>
                  <li>- 送信中は loading 表示 + ボタン無効化</li>
                  <li>- エラー/成功状態を明確に伝える</li>
                  <li>- 必須項目は * で示す</li>
                </ul>
              </div>
            </div>
            <InfoBox type="info" title="次のステップ">
              <p>
                ここで作ったフォームは useState で十分管理できますが、フォームが複雑になると React Hook Form や Zod などのライブラリが活躍します。まずは基本の制御コンポーネントパターンをしっかり理解しておきましょう。
              </p>
            </InfoBox>
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
