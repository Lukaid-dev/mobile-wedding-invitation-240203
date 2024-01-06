## firebase settings

Firebase Hosting + Cloud Firestore + Cloud Storage

### start

```bash
npm install -g firebase-tools
firebase login
firebase init
# 명령어 입력시 선택항목 표시
# -> firestore & hosting & storage
```

### hosting

```bash
npm run build
firebase deploy --only hosting
```
