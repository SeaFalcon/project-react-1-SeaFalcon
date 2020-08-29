# HeavyMetal Universe (가칭)

1. 이 앱을 언제 사용하나요?

- 제가 자주 들르는 헤비메탈 정보 사이트 [메탈킹덤](http://metalkingdom.net)에서 음악정보(Album of the Year)를 가져온 후
Spotify API를 연동하여 밴드와 앨범 정보를 보여주고 Spotify 링크를 통해 음악감상을 할때 사용합니다.

2. 제약 조건은 무엇인가요?

- Spotify 계정이 있어야합니다.

3. 구체적인 사례는 무엇인가요?

- 평가가 좋은 헤비메탈 앨범을 Album of the Year를 통해 찾고 각 트랙을 Spotify 웹플레이어로 들어볼 수 있습니다.
- Spotify 웹사이트를 통하지 않고도 가수와 앨범을 검색해서 웹플레이어로 연결할 수 있습니다.

4. 만들게 된 계기는 무엇인가요?
- 저는 주기적으로 메탈 신보를 찾아 듣습니다. 우선 메탈킹덤의 올해의 앨범을 보고 유튜브나 기타 스트리밍 사이트에서 검색해서 들어봅니다. 생각보다 귀찮은 이 일련의 과정들을 좀 더 손쉽게 할 수 있으면 좋을 것 같아서 만들게 되었습니다.

5. 예시화면
![ezgif com-optimize](https://user-images.githubusercontent.com/8149376/91641443-6ecddf80-ea5f-11ea-9872-e7b3e7f97537.gif)

# 서버

## 설치하기

```bash
cd nodeCrawler

npm install
```

## 크롤러 실행하기

```bash
npm run crawling
```

## 서버 실행하기

```bash
npm run server
```

# 클라이언트

## 설치하기

```bash
npm install
```

## 실행하기

```bash
npm start
```

## 린트 실행하기

```bash
npm run lint
```

### 유닛 테스트 실행하기

```bash
npm run test:unit

# 파일이 저장됐을 때 자동으로 테스트 실행하기
npm run test:unit -- --watch-all

# 커버리지 출력하기
npm run coverage
```
