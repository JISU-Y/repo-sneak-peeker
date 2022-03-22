# wanted-codestates-project-1

원티드 프리온보딩 페이히어 과제

## 💻 Demo

[link] https://cheery-kelpie-33b94a.netlify.app

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Styled%20Components-DB7093?style=for-the-badge&logo=StyledComponents&logoColor=white"/></a>

## 🕹  설치 및 시작방법

1. github repo 이동

	https://github.com/JISU-Y/wanted-codestates-project-1

2. code 버튼 클릭 및 HTTPS url 복사 (클립보드 버튼 클릭)

	![2](https://user-images.githubusercontent.com/80020227/158720778-97259019-a572-4e40-905e-286f5925fc12.JPG)

3. 컴퓨터에서 커맨트창 띄우고 원하는 폴더 위치로 이동

	ex)
	```
	C:Users\username> mkdir wantedPayhere
	C:Users\username> cd wantedPayhere
	```

4. git clone

	```
	C:Users\username\wantedPayhere> git clone https://github.com/JISU-Y/wanted-codestates-project-1.git
	```

5. wanted-codestates-project-6-10 폴더 이동 및 에디터 열기

	```
	C:Users\username\wantedPayhere> cd wanted-codestates-project-1
	C:Users\username\wantedPayhere\wanted-codestates-project-1> code .
	```

6. 에디터 열렸으면 터미널 open 및 다음과 같이 실행

	- install dependencies
		```
		$ npm install
		```

	- serve with hot reload at localhost:3000
		```
		$ npm start
		```

<br>

## 📄 페이지
- 메인 페이지 (검색 페이지)
- 레포 보관 페이지
- 이슈 페이지

## 👨‍💻 구현 기능

### Repo 검색

검색어를 입력하여 public repository들을 fetching하고, 리스트로 나타냄.  
loading 중일 때는 Skeleton UI를 디스플레이.
무한 스크롤을 구현하여 10개씩 디스플레이.  

<img width='300' src='https://user-images.githubusercontent.com/80020227/159413493-ba2df205-ada3-4094-91cc-8df8d88f2d44.gif' />

### Repo 등록/삭제 및 사용자 피드백

"레포 추가"을 클릭하여 레포 보관함에 repo를 등록.  
"레포 삭제"를 클릭하여 레포 보관함에서 등록된 repo를 삭제.  
레포 추가, 레포 삭제, 등록 개수 초과, 중복 등록에 대해서 사용자 피드백(alert)

<img width='300' src='https://user-images.githubusercontent.com/80020227/159414008-b0705b4e-7e62-4e70-a8e2-a399dc6b1c43.gif' />

### Issue 보기 및 Pagination

등록된 repo 클릭 시 해당 Repo가 가지고 있는 Issue를 리스트로 나타냄.  
Pagination을 이용하여 6개씩 디스플레이  
양 옆 화살표 및 숫자 클릭하여 페이지로 이동

<img width='300' src='https://user-images.githubusercontent.com/80020227/159414473-7552e26f-bd80-47ef-bc91-3f434be60dab.gif' />

### 렌더링 최적화

input에 검색어 입력 시 불필요한 렌더링 개선하여 렌더링 최적화


| 최적화 전 | 최적화 후 |
| --- | --- |
| <img width='300' src='https://user-images.githubusercontent.com/80020227/159414556-b5cf8c1e-75ea-45f9-8ac8-261a10f68873.gif' /> | <img width='300' src='https://user-images.githubusercontent.com/80020227/159414575-31c8ef3a-5b72-4ad8-bb11-cbbdf1249758.gif' /> |

### UI 개선

data fetching(loading) 시 Skeleton UI 적용


| RepoCard | IssueCard |
| --- | --- |
| <img width='300' src='https://user-images.githubusercontent.com/80020227/159414989-2ef2c173-21a3-4d0c-b818-7994f3be3d93.gif' /> | <img width='300' src='https://user-images.githubusercontent.com/80020227/159414991-10e60ae0-f581-49d1-955d-5264953fc42a.gif' /> |

## 📂 폴더 구조
```
src
├── components
│   ├── Header
│   ├── IssueCard
│   ├── RepoCard
│   ├── PageNavigation
│   ├── SkeletonIssue
│   ├── SkeletonRepo
│   └── NoList
├── pages
│   ├── Main
│   ├── Repo
│   └── Issue
├── redux
│   ├── reducers
│   └── store
└── styles
    ├── commonComponents
    └── GlobalStyle
```
