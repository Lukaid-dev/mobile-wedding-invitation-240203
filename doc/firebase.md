# firebase

이번 프로젝트에서 firebase를 적극적으로 활용하며 느낀점을 정리해보려고 한다. 아래의 모든 내용은 [공식문서](https://firebase.google.com/docs)를 참고하였다.

## firebase 도입 이유

처음에는 이전에 프로젝트에서 사용했던 것 처럼, 집에 있는 ubuntu pc를 서버로 두고 진행하려고 했다. 하지만,

> 1. 별도의 서버 로직이 필요하지 않고,
> 2. 정적 파일을 제공하는 것이 주 목적이며,
> 3. 별도의 서버비용이 발생하지 않는다면,

firebase를 사용하는 것이 더 효율적이라고 판단했다.

이전에 firebase를 사용해본 경험이 있어서 도입에 망설임은 없었다. 하지만 막상 사용해보니, 이미지 파일을 제공하는 것에 어려움을 느꼈다. 그래서 대안으로 cloudinary도 사용해 보았지만, 큰 차이는 없다고 느껴서 firebase의 서비스로 통일하기로 결정했다. 느꼈던 불편함은 후술하겠다.

## 시작하기

```bash
npm install -g firebase-tools
firebase login
firebase init
# 명령어 입력시 선택항목 표시
# -> firestore & hosting & storage
```

## 사용한 firebase 서비스

### firebase hosting

vite로 빌드한 웹 페이지를 제공하기 위해 firebase hosting을 사용했다. firebase hosting은 웹 앱, 정적 콘텐츠와 동적 콘텐츠, 마이크로서비스를 위한 빠르고 안전한 호스팅을 제공한다고 한다. firebase hosting은 CDN을 통해 전 세계에 배포되기 때문에, 빠르고 안전하게 웹 앱을 제공할 수 있다. 또한, firebase hosting은 SSL을 기본적으로 제공하기 때문에, 별도의 설정 없이도 https를 사용할 수 있으며, web.app 및 firebaseapp.com 도메인을 무료로 제공하기 때문에, 별도의 도메인 구매 없이도 웹 앱을 배포할 수 있다. (내가 기획한 모바일 청첩장 정도를 배포하기에는 더할나위없다!)

**setting**

```json
// .firebaserc
{
  "projects": {
    "default": "wedding-invitation-240203" // 프로젝트명
  }
}
```

```json
// firebase.json
{
  "hosting": {
    "public": "dist", // 빌드된 파일이 위치한 폴더
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      // SPA를 위한 설정
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**hosting (deploy)**

```bash
npm run build
firebase deploy --only hosting
```

### cloud firestore

<img src="https://firebase.google.com/static/docs/firestore/images/structure-data.png?authuser=0&hl=ko" width=200 alt="firestore">

프로젝트에 큰 비즈니스 로직은 없지만, 방명록 기능을 구현하기 위해 firestore를 사용하기로 했다. cloud firestore는 클라우드에 호스팅되는 NoSQL 데이터베이스로서 Apple, Android, 웹 앱에서 기본 SDK를 통해 직접 액세스할 수 있다. 특징은 다음과 같다.

1. firestore는 document를 기준으로 데이터를 저장하며,
2. document는 collection에 속한다. (collection은 document의 집합이다.)
3. document는 json 형태로 데이터를 저장한다.
4. document는 collection 내에서 유일한 이름을 가진다.

<img src="https://firebasestorage.googleapis.com/v0/b/wedding-invitation-240203.appspot.com/o/firestore.png?alt=media&token=3f7b989d-cab3-4c4d-957e-e3bce201f943" alt="firestore demo">

위의 예시에서 볼 수 있듯, GuestBook이라는 Collection을 생성 한 뒤, 그 안에 각각 독립적인 document를 생성했다. (document는 동적으로 생성되며, 유일한 이름을 가진다. 따로 지정하지 않으면 자동으로 지정 됨.) document는 json 형태로 데이터를 저장하기 때문에, document 내에 필드를 추가하고, 필드에 데이터를 저장할 수 있으며, 필드의 이름은 문자열이어야 한다. 필드의 값은 다양한 타입을 가질 수 있다. (문자열, 숫자, 객체, 배열, boolean, null, timestamp 등) document내에서도 새로운 collection을 생성할 수 있다는데, 나는 사용하지 않았다. 다음은 firestore를 사용하려 저장된 데이터를 가져고, 새로운 데이터를 추가하는 예시이다.

**example**

```ts
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

// GET
export const getGuestBookEntries = async (): Promise<GuestBookEntry[]> => {
  const guestbookCollection = collection(db, 'GuestBook'); // collection을 가져옴
  const querySnapshot = await getDocs(guestbookCollection); // collection의 모든 document를 가져옴
  // sort by createdAt
  const entries = querySnapshot.docs
    .filter((doc) => !doc.data().deletedAt)
    .map((doc) => doc.data() as GuestBookEntry)
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt.localeCompare(a.createdAt);
      } else {
        return 0;
      }
    });
  return entries;
};

// POST
export const postGuestBookEntry = async (
  entry: GuestBookEntry,
): Promise<GBReturnCode> => {
  const { hashedPassword, salt } = generatePassword(entry.pw);

  const entryWithHashedPassword: GuestBookEntry = {
    ...entry,
    pw: hashedPassword,
    salt,
    createdAt: new Date().toISOString(),
  };

  const guestbookCollection = collection(db, 'GuestBook'); // collection을 가져옴
  const res = await addDoc(guestbookCollection, entryWithHashedPassword); // collection에 document를 추가함
  if (res) {
    return GBReturnCode.Success;
  } else {
    return GBReturnCode.NetworkError;
  }
};
```

### RDBMS vs NoSQL

### cloud storage

이번 프로젝트를 하면서 가장 애를 먹었던 부분이 이미지 파일을 제공하는 것이었다.
