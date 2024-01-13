# Installation

<br/>

```bash
npm create vite
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

[tailwindcss + vite 공식문서](https://tailwindcss.com/docs/guides/vite)

<br/>

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // tailwindcss가 사용할 html, js, ts, jsx, tsx 파일들
  theme: {
    extend: {
      fontFamily: {
        // 폰트 설정
        sans: ['Pretendard'], // tailwindcss가 기본 폰트로 sans를 인식함
        batang: ['Gowun Batang'], // font-batang 클래스로 사용 가능
      },
    },
    colors: {
      // 색상 설정
      bg: '#DDD8D3',
      bg_from: 'rgba(152, 96, 11, 0.22) 0%',
      bg_to: 'rgba(152, 96, 11, 0.00) 100%',
      black: '#000000',
      white: '#FFFFFF',
      gray: {
        10: '#FAFAFA',
        50: '#F5F5F5',
        200: '#E2E2E2',
        400: '#A0A0A0',
        700: '#444444',
        900: '#121314',
      },
      red: '#FF2C20',
      blue: '#386DE8',
      green: '#3BC344',
      yellow: '#FFEB00',
      brown: '#B6500B',
    },
  },
  plugins: [],
};
```

<br/>

# run

```bash
npm run dev
```

<br/>

# build

```bash
npm run build
```
