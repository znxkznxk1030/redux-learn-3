# ReduxSimpleStarter

Interested in learning [Redux](https://www.udemy.com/react-redux/)?

### Day - 1

#### 일반 js 파일도 webpack 설정에 의해 jsx처럼 사용할 수 있다

#### jsx에서의 <div></div>

```html
<div>Hi</div>
```

```javascript
React.createElement('div', null, 'Hi')
```

#### jsx에서 App 인스턴스화 시키기

#### jsx 에서 아래와 같이만 선언하면

```javascript
const App = function () {
  return <div> Hi </div>
}

;<App />
```

#### javascipt에서 다음과 같다

```javascript
'use strict'

const App = function () {
  return /*#__PURE__*/ React.createElement('div', null, 'Hi')
}

/*#__PURE__*/
React.createElement(App, null)
```

#### 마지막에 렌더는 React가 아니라 ReactDOM을 이용한다.

```jsx
import ReactDOM from 'react-dom'

ReactDOM.render(<App />)
```

### Day - 2

#### 타겟 렌더링

```jsx
import ReactDOM from 'react-dom'

ReactDOM.render(<App />, /* 타겟 */ document.querySelector('.container'))
```

#### 구글 API 콘솔

> https://console.cloud.google.com/home/dashboard?project=friendlychat-9446c

#### export 가능한거는 이름있는 값이나 default ( #### 하기와 같은 문장은 안된다. \*)

```javascript
// error
export {
    key: 'value'
}
```

#### jsx가 간략화 하더라도 React를 임포트는 시켜야한다.

```jsx
import React from 'react'
;<input /> // React.createElement('input', null);
```

### Day - 3

#### 클래스 컴포넌트는 내부적인 정보를 저장하려고 할 때 사용한다.

#### import시 default 와 destructure 동시에 하기

```jsx
import React, { Component } from 'react'
```

#### jsx에서 html 내장 이벤트 핸들링 하기

> on + {EventName}

```jsx
<input onChange={console.log} onClick={console.log} />
```

#### 모든 컴포넌트는 상태가 있고, 상태가 변하면 자신과 자식들의 render를 강제한다.

```jsx
render() {
        return (
            <div>
                <input onChange={event => this.setState({ term: event.target.value })} />
                <br />
                Value of the input: {this.state.term}
            </div>
        )
    }
```

#### 상태 선언시 반드시 constructor안에서 해야한다

```jsx
constructor(props) {
        super(props)
        this.state = { term: '' }
    }
```

#### 상태 변경시 반드시 this.setState를 이용해야 한다.

```jsx
 render() {
        return <input onChange={event => this.setState({ term: event.target.value })} />
    }
```

### Day - 4

#### 대부분의 경우 정보와 연관되어 있는 부모 컴포넌트가 이를 가져올 권리를 가지고 있다.

#### Prettier 적용

.pritterrc 추가

```json
{}
```

package.json 에 스크립트 추가

```json
"format": "prettier \"src/**/*.{js,html,jsx}\" --write"
```

#### props 넘기기

```jsx
<VideoList videos={this.state.videos}></VideoList>
```

#### props 받기 ( 함수형 )

```jsx
const VideoList = (props) => {
  return <ul className="col-md-4 list-group">{props.videos.length}</ul>
}
```

#### react for문

- key값을 누락하면 난리치니 조심하자

```jsx
const videoItems = props.videos.map((video) => {
  return <VideoListItem key={video.etag} video={video} />
})

return <ul className="col-md-4 list-group">{videoItems}</ul>
```

### Day - 5

#### jsx 에선 class대신 반드시 className이라고 사용

#### decontructor로 props분해

```jsx
const VideoDetail = ({ video }) => {}
```

#### iframe의 src같은 native 속성들도 사용가능

```jsx
<iframe src={url} frameborder="0" className="embed-responsive-item"></iframe>
```

#### props의 null/undefined 값 처리

```jsx
if (!video) {
  return <div>Loading...</div>
}
```

#### embed된 요소의 좋은 ratio 16:9 ( bootstrap 피셜 )

```jsx
<div className="embed-responsive embed-responsive-16by9">
  <iframe src={url} className="embed-responsive-item"></iframe>
</div>
```

그외

```scss
$embed-responsive-aspect-ratios: ((21 9), (16 9), (4 3), (1 1)) !default;
```

### Day - 6

#### 자식 이벤트 받기 - props로 콜백 함수 넘겨준다

```jsx
// parent
<VideoList
onVideoSelect={video => this.setState({ selectedVideo: video })} />

// child - 1

<VideoListItem onVideoSelect={props.onVideoSelect} />;

// child - 2 ( emit )
<li onClick={() => onVideoSelect(video)} className="list-group-item">
```

```jsx
// parent
videoSearch(term) {
    YTSearch({ key: API_KEY, term }, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

 <SearchBar onSearchTermChange={term => this.videoSearch(term)} />

// child ( emit )
  onInputChange(term) {
    this.setState({ term })
    this.props.onSearchTermChange(term)

  }

<input
  value={this.state.term}
  onChange={(event) => this.onInputChange(event.target.value)}
/>

```

#### debounce 적용하기

```javascript
const videoSearch = _.debounce((term) => {
  this.videoSearch(term)
}, 300)
```

### Day - 7

#### Redux가 다른 flux 프레임워크와 다른점

- backbone은 collections를 가지고, flux는 다른 store들을 가지고있는데 반해 Redux는 state를 참조하는 한 오브젝트로 집중시킨다.

#### Reducer 란 어플리케이션 스테이트를 반환하는 함수

#### Reducer의 두 스텝

1. 리듀서 만들기
2. 앱과 연결하기

### Day - 8

#### react-redux

리액트와 리덕스에 대한 라이브러리

#### Container

리액트 컴포넌트로서, 리덕스에 의해 관리되는 스테이트에 직접적인 연결이 가능

#### prettierrc 설정

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

#### Component를 Container로 만들기

1. mapStateToProps 생성

```jsx
function mapStateToProps(state) {
  return {
    books: state.books,
  }
}
```

2. connect로 변환하기 ( currying 구조이다.)

```jsx
// connect는 currying을 사용한다
export default connect(mapStateToProps)(BookList)
```

### Day - 9

#### 리덕스 액션 연결하기

1. ActionCreator 만들기

```javascript
// actions/index.js

export function selectBook(book) {
  // selectBook is an ActionCreator, it needs to return an action,
  // an object with a type property.
  return {
    type: 'BOOK_SELECTED',
    payload: book,
  }
}
```

2. ActionCreator을 Props로 바인딩 하기

```jsx
// containers/book-list.js
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectBook } from '../actions'

function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result should be passed
  // to all of our reducers

  return bindActionCreators({ selectBook }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)
```

3. Reducer 만들기

- 리듀서 안에선 절대 state를 직접 변환시키면 안된다.

```javascript
// State argument is not application state, only the state
export default function (state = null, action) {
  switch (action.type) {
    case 'BOOK_SELECTED':
      return action.payload
  }

  return state
}
```

4. 상태를 props로 가져오기

```jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'

class BookDetail extends Component {
  render() {
    if (!this.props.book) {
      return <div>Select a book to get started.</div>
    }
    return (
      <div>
        <h3>Details for:</h3>
        <div>{this.props.book.title}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    book: state.activeBook,
  }
}

export default connect(mapStateToProps)(BookDetail)
```

### Day - 10

#### bootstrap 을 사용한 search bar 템플릿

```html
<form className="input-group">
  <input
    placeholder="Get a five-day forecast in your favorite cities"
    className="form-control"
    value="{this.state.term}"
    onChange="{this.onInputChange.bind(this)}"
  />
  <span className="input-group-btn">
    <button type="submit" className="btn btn-secondary">Submit</button>
  </span>
</form>
```

#### jsx문 안에서는 this가 현재 component가 아니므로, bind( this ) 해주어야 한다.

```jsx
this.onInputChange = this.onInputChange.bind(this)
```

#### form tag는 기본적으로 엔터키를 누르거나 내부의 type이 submit인 버튼이 있다면, 페이지를 리로드 한다. ( http://{url}/? )

#### form 의 submit 이벤트 핸들링 하기

```jsx
  onFormSubmit(event) {
    event.preventDefault()
  }

<form onSubmit={this.onFormSubmit} className="input-group">
```

#### open weather api e

https://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=json&appid={api_key}

### Day - 11

#### redux-promise 미들웨어 사용

- Action 에서 payload로 Promise객체를 반환

```javascript
// action/index.jss
export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},us`
  const request = axios.get(url)

  console.log('Request: ', request)

  return {
    type: FETCH_WEATHER,
    payload: request,
  }
}
```

- Action에서 Reducer로 넘어가는 사이 redux-promise 미들웨어가 가로챔

```javascript
// index.js
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.querySelector('.container')
)
```

- 가로챈 Promise객체는 resolve시킨 결과를 Reducer로 넘겨줌

```javascript
// reducer/reducer_weathher.js
export default function (state = null, action) {
  console.log('Action: ', action)

  return state
}
```

- Promise 반환 중 에러가 난다면, reducer의 action이 다음과 같다

```json
{
  "type": "FETCH_WEATER",
  "payload": {
    "message": "Network Error",
    "name": "Error",
    "stack": "Error: Network Error\n    at createError (http://localhost:8080/bundle.js:24216:16)\n    at XMLHttpRequest.handleError (http://localhost:8080/bundle.js:24068:15)",
    "config": {
      "transitional": {
        "silentJSONParsing": true,
        "forcedJSONParsing": true,
        "clarifyTimeoutError": false
      },
      "transformRequest": [null],
      "transformResponse": [null],
      "timeout": 0,
      "xsrfCookieName": "XSRF-TOKEN",
      "xsrfHeaderName": "X-XSRF-TOKEN",
      "maxContentLength": -1,
      "maxBodyLength": -1,
      "headers": {
        "Accept": "application/json, text/plain, */*"
      },
      "method": "get",
      "url": "https://api.openweathermp.org/data/2.5/forecast?appid=d677723bda88ec90e787664f56ed62cf&q=London,us"
    },
    "status": null
  },
  "error": true
}
```

#### 리덕스에서 Array 반환시 Mutation을 피하는 법

- state.push보단 state.concat 또는 [ ...state , payload ]을 쓰자
- push는 기존 배열에다 새원소 추가
- concat은 새로운 배열에가 기존꺼 + 새 원소 추가

```javascript
import { FETCH_WEATHER } from '../actions'

export default function (state = null, action) {
  console.log('Action: ', action)
  switch (action.type) {
    case FETCH_WEATHER:
      return state.concat([action.payload.data])
  }

  return state
}
```

### Day - 12

#### table 만들기 ( feat. bootstrap )

- looks pretty good

```jsx
<table className="table table-hover">
  <thead>
    <tr>
      <th>City</th>
      <th>Temperature</th>
      <th>Pressure</th>
      <th>Humidity</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
```

#### react-sparklines 적용하기

- 1.6.0버전에서는 오류가 있으므로 1.7.x버전을 사용하자

```jsx
<Sparklines data={temperatures} height={120} width={180}>
  <SparklinesLine color="red" />
</Sparklines>
```

### Day - 13

#### vertical-align

1. inline이나 inline-block 에서만 적용
2. 요소 자체만 정렬, 내용에 영향 X ( table cell에 적용할 때는 제외)
3. 다른 요소에 상대적으로 정렬함

### Day - 14

#### CRUD 테스트 하기 좋은 서비스

- https://reduxblog.herokuapp.com
- GET | https://reduxblog.herokuapp.com/api/posts?key={random string}
- POST | https://reduxblog.herokuapp.com/api/posts?key={random string}
- POST | https://reduxblog.herokuapp.com/api/posts/5?key={random string}
- DELETE | https://reduxblog.herokuapp.com/api/posts/5?key={random string}

### Day - 15

#### What React Router Does

- Web Pages => History => React-Router => React => Web Pages

#### router 적용하기

- import BrowserRouter, Route

```jsx
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route path="/hello" component={Hello} />
        <Route path="/goodbye" component={Goodbye} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.container')
```

#### lodash | mapKeys

```javascript
const posts = [
  { id: 4, title: 'hi' },
  { id: 7, title: 'bye' },
]

_.mapKeys{posts, 'id'}

{
  4: { id: 4, title: 'hi' },
  7: { id: 7, title: 'bye' },
}
```

#### Object 렌더하기

```jsx
renderPosts() {
    return _.map(this.props.posts, (post) => {
      return (
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
      )
    })
  }
```

#### Switch | React Router 의 loose Match

아래와 같은 설정시, PostIndex와 PostNew 컴포넌트 둘 다 중복해서 화면에 출력된다.

```jsx
<BrowserRouter>
  <div>
    <Route path="/" component={PostsIndex} />
    <Route path="/posts/new" component={postNew} />
  </div>
</BrowserRouter>
```

이를 해결하기 위해 Switch 컴포넌트를 아래와 같이 사용한다.

```jsx
<BrowserRouter>
  <div>
    <Switch>
      <Route path="/posts/new" component={postNew} />
      <Route path="/" component={PostsIndex} />
    </Switch>
  </div>
</BrowserRouter>
```

- 먼저 매칭되는 path를 상단에 두어야 한다

#### Link tag

```jsx
<div className="text-tx-right">
  <Link className="btn btn-primary" to="/posts/new">
    Add a Post
  </Link>
</div>
```

### Day - 17

#### Redux Form

- https://redux-form.com/8.3.0/

#### Field 파라미터에 속성추가

- 아무이름의 변수를 Field의 Props로 넘김

```jsx
<form>
  <Field label="Title" name="title" component={this.renderField}></Field>
  <Field label="Title" name="tags" component={this.renderField}></Field>
</form>
```

- component 내부에서 field의 속성으로 이용

```jsx
<div className="form-group">
  <label htmlFor="">{field.label}</label>
  <input className="form-control" type="text" {...field.input} />
</div>
```

#### validate

- value의 값 ( 이벤트 emit할 때마다, 갱신된다. )

```json
{
  "title": "here",
  "categories": "is",
  "content": "validate"
}
```

#### Submit

```jsx
render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
```

```jsx
  onSubmit(values) {
    console.log(values)
  }
```

### Day - 20

#### lodash 를 이용한 객체삭제

- omit

```jsx
_.omit(state, action.payload)
```

- reject

```jsx
_.reject(state, (post) => post === action.payload)
```

### Day - 21

#### 왜 redux-thunk가 존재하는지?

- Dispatch를 컨트롤 하기위해

##### Dispatch

- action이 각 reducer에게 보내지도록 하는 것

```javascript
export function fetchUsers() {
  const request = axios.get(URL)

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: 'FETCH_PROFILES', payload: data })
    })
  }
}
```
