# firebase

<br>

이번 프로젝트에서 firebase를 적극적으로 활용하며 느낀점을 정리해보려고 한다. 아래의 모든 내용은 [공식문서](https://firebase.google.com/docs)를 참고하였다.

<br>

## firebase 도입 이유

<br>

처음에는 이전에 프로젝트에서 사용했던 것 처럼, 집에 있는 ubuntu pc를 서버로 두고 진행하려고 했다. 하지만,

> 1. 별도의 서버 로직이 필요하지 않고,
> 2. 정적 파일을 제공하는 것이 주 목적이며,
> 3. 별도의 서버비용이 발생하지 않는다면,

firebase를 사용하는 것이 더 효율적이라고 판단했다.

<br>

이전에 firebase를 사용해본 경험이 있어서 도입에 망설임은 없었다. 하지만 막상 사용해보니, 이미지 파일을 제공하는 것에 어려움을 느꼈다. 그래서 대안으로 cloudinary도 사용해 보았지만, 큰 차이는 없다고 느껴서 firebase의 서비스로 통일하기로 결정했다. 느꼈던 불편함은 후술하겠다.

<br>

## 시작하기

```bash
npm install -g firebase-tools
firebase login
firebase init
# 명령어 입력시 선택항목 표시
# -> firestore & hosting & storage
```

<br>

## 사용한 firebase 서비스

<br>

### firebase hosting

<br>

vite로 빌드한 웹 페이지를 제공하기 위해 firebase hosting을 사용했다. firebase hosting은 웹 앱, 정적 콘텐츠와 동적 콘텐츠, 마이크로서비스를 위한 빠르고 안전한 호스팅을 제공한다고 한다. firebase hosting은 CDN을 통해 전 세계에 배포되기 때문에, 빠르고 안전하게 웹 앱을 제공할 수 있다. 또한, firebase hosting은 SSL을 기본적으로 제공하기 때문에, 별도의 설정 없이도 https를 사용할 수 있으며, web.app 및 firebaseapp.com 도메인을 무료로 제공하기 때문에, 별도의 도메인 구매 없이도 웹 앱을 배포할 수 있다. (내가 기획한 모바일 청첩장 정도를 배포하기에는 더할나위없다!)

<br>

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

<br>

**hosting (deploy)**

```bash
npm run build
firebase deploy --only hosting
```

<br>

### cloud firestore

<br>

<img src="https://firebase.google.com/static/docs/firestore/images/structure-data.png?authuser=0&hl=ko" width=200 alt="firestore">

<br>

프로젝트에 큰 비즈니스 로직은 없지만, 방명록 기능을 구현하기 위해 firestore를 사용하기로 했다. cloud firestore는 클라우드에 호스팅되는 NoSQL 데이터베이스로서 Apple, Android, 웹 앱에서 기본 SDK를 통해 직접 액세스할 수 있다. 특징은 다음과 같다.

<br>

1. firestore는 document를 기준으로 데이터를 저장하며,
2. document는 collection에 속한다. (collection은 document의 집합이다.)
3. document는 json 형태로 데이터를 저장한다.
4. document는 collection 내에서 유일한 이름을 가진다.

<br>

<img src="https://firebasestorage.googleapis.com/v0/b/wedding-invitation-240203.appspot.com/o/firestore.png?alt=media&token=3f7b989d-cab3-4c4d-957e-e3bce201f943" alt="firestore demo">

<br>

위의 예시에서 볼 수 있듯, GuestBook이라는 Collection을 생성 한 뒤, 그 안에 각각 독립적인 document를 생성했다. (document는 동적으로 생성되며, 유일한 이름을 가진다. 따로 지정하지 않으면 자동으로 지정 됨.) document는 json 형태로 데이터를 저장하기 때문에, document 내에 필드를 추가하고, 필드에 데이터를 저장할 수 있으며, 필드의 이름은 문자열이어야 한다. 필드의 값은 다양한 타입을 가질 수 있다. (문자열, 숫자, 객체, 배열, boolean, null, timestamp 등) document내에서도 새로운 collection을 생성할 수 있다는데, 나는 사용하지 않았다. 다음은 firestore를 사용하려 저장된 데이터를 가져고, 새로운 데이터를 추가하는 예시이다.

<br>

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

<br>

### RDB vs NoSQL

<br>

cloud firestore를 사용하면서 정리해 본 RDB와 NoSQL의 차이점이다.
[RDB vs NoSQL](./RDB-vs-NoSQL.md)

<br>

### cloud storage (이미지 파일 서빙을 위주로...)

<br>

이번 프로젝트를 하면서 가장 애를 먹었던 부분이 이미지 파일을 제공하는 것이었다. 청첩장 특성 상 고품질의 이미지를 빠를시간 안에 제공하는 것이 중요했기 때문이다. 처음에는 firebase hosting을 사용하여 이미지 파일을 제공하려고 했다. 하지만 firebase에서 제공하는 무료 사용량이 1GB이기 때문에, 이미지 파일을 제공하는데는 한계가 있었다. 사실 firebase hosting에서 한꺼번에 처리하려고 한 더 큰 이유는, **최초 렌더링 시 서비스에 필요한 모든 이미지를 다운받겠지?** 하는 희망 때문이었다.

예상은 보기좋게 빗나갔고, 브라우저는 해당 이미지 컴포넌트를 실제로 렌더하고 나서야 이미지를 다운받았다. 그래서 이미지를 가져오는 속도를 높이기 위해, cloudinary를 추천받아 사용해 봤지만, 큰 차이는 없다고 느껴서 firebase의 서비스로 통일하기로 결정했다.

<br>

cloud storage는 firebase에서 제공하는 파일 저장소 서비스이다. cloud storage는 firebase hosting과 달리, 파일을 저장하고, 제공하는 것에 특화되어 있다. 이번 정리는 사실 cloud storage와 큰 연관은 없다. 원래는 firebase에서 제공하는 cloud storage API를 이용해서 서비스를 빌드했는데, 이게 내 생각대로 되지 않는 것도 있었고, 어차피 유저가 이미지를 올리는 경우는 없어서, 그냥 storage에 올려둔 이미지의 url을 가져와서 사용하기로 결정했다. (이미지를 올리는 경우는, firebase console에서 직접 올리기로 했다.)

<br>

문제는 또 있었는데, 이미지를 불러오는 속도가 제각각이었다... 그래서 **모든 이미지를 불러 온 후 렌더링**하는 로직을 한참동안 찾아보고 고민했는데, 결과적으로 react에서(근본적으로 js에서)는 이를 다룰 방법을 찾지 못했다. 그래서 내린 지금 내린 결론은, 이미지를 받아오고 그리는 과정은 오롯이 브라우저에서 담당하는 것으로 이해했다. (이게 맞는지는 모르겠다. 더 공부해봐야겠다.)

<br>

어쨌건 이대로 UX를 포기 할 수는 없는 일이니, 이미지 탭에서 썸네일 이미지들은 용량을 극한으로 낮춰 다운로드 속도를 높히고, 썸네일 이미지 클릭 후 나타나는 캐러셀의 원본 이미지들은 `imageLists`로 한번에 가져오도록 하고, `setIsLoaded`라는 상태를 도입하여, 이미지가 아직 다운되지 않았다면, 로딩중을 알리는 모달을 띄우고, 다운이 완료되면 다운 완료 모달을 띄우도록 했다. [소스코드](../src/pages/Gallery//ImageGrid.tsx)

<br>

```tsx
const [isLoaded, setIsLoaded] = useState<boolean>(false);

const openModal = () => {
  if (!isLoaded) {
    toast('이미지를 불러오는 중이에요!', {
      position: 'bottom-center',
      icon: '🤵❤️👰‍♀️',
    });
  }
  setModalOpen(true);
  // 모달이 열렸을 때, 스크롤을 막아준다.
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  setModalOpen(false);
  // 모달이 닫혔을 때, 스크롤을 허용한다.
  document.body.style.overflow = 'auto';
};

const modalOutsideClick = (arg: React.MouseEvent<HTMLDivElement>) => {
  if (arg.target === modalOverlayRef.current) {
    closeModal();
  }
};

// modal에서 사용될 이미지들 미리 로딩
useEffect(() => {
  let loadCount = 0;

  const imageLists: ReactNode[] = imageKeys.map((key, idx) => (
    <div key={idx} className={`flex w-[100vw] justify-center`}>
      <img
        src={images[key].main}
        className="w-[80vw]"
        alt={`Photo ${idx + 1}`}
        onLoad={() => {
          loadCount++;
          if (loadCount === imageKeys.length) {
            toast('이미지 로딩 완료!', {
              position: 'bottom-center',
              icon: '💍',
            });
            setIsLoaded(true);
          }
        }}
      />
    </div>
  ));
  setModalImage(imageLists);
}, []);
```

<br>

## 결론

<br>

firebase를 사용하면서 느낀 장점은 다음과 같다.

<br>

1. firebase의 서비스들은 서로 연동이 잘 되어있다. (firebase hosting, firestore, storage)
2. firebase의 서비스들은 무료 사용량이 있어서, 서버 비용을 절감할 수 있다. (간단한 서비스를 만들기에는 무료 사용량이 충분하다. 물론 내 인건비는 제외ㅎㅎ)
3. firebase의 서비스들은 쉽게 사용할 수 있다. (공식문서가 잘 되어있고, 예제도 많다.)

<br>

이 플젝을 진행하면서, **그냥 2만원 내고 만들어 달라할걸 ㅠ** 하며 후회 할 때도 있었지만, 역시 완성 후 고객(?)님들의 피드백을 받으니 희열이 느껴지며 하길 잘 했다는 생각이 들었다. 물론, 아직 욕심이 더 있고, 더 잘 할 수 있는 부분도 눈에 보이지만, 이번 프로젝트를 통해, 충분히 나 혼자서도 완성도 있는 하나의 서비스를 만들 수 있다는 자신감을 얻었다.

<br>

다음에는 요즘 핫한 [supabase](https://supabase.com/)와 [nextjs](https://nextjs.org/)를 공부해서 사용해봐야겠다!
