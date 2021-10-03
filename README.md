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
const App = function() {
        return <div > Hi < /div>
    }

    <
    App / >
```

#### javascipt에서 다음과 같다

```javascript
"use strict";

const App = function() {
    return /*#__PURE__*/ React.createElement("div", null, "Hi");
};

/*#__PURE__*/
React.createElement(App, null);
```

#### 마지막에 렌더는 React가 아니라 ReactDOM을 이용한다.

```jsx
import ReactDOM from "react-dom";

ReactDOM.render( < App /> )
```

### Day - 2

#### 타겟 렌더링

```jsx
import ReactDOM from "react-dom";

ReactDOM.render( < App /> , /* 타겟 */ document.querySelector('.container'));
```

#### 구글 API 콘솔

> https://console.cloud.google.com/home/dashboard?project=friendlychat-9446c

#### export 가능한거는 이름있는 값이나 default ( #### 하기와 같은 문장은 안된다. *)

```javascript
// error
export {
    key: 'value'
}
```

#### jsx가 간략화 하더라도 React를 임포트는 시켜야한다.

```jsx
import React from 'react'

<input /> // React.createElement('input', null);
```

### Day - 3

#### 클래스 컴포넌트는 내부적인 정보를 저장하려고 할 때 사용한다.

#### import시 default 와 destructure 동시에 하기

```jsx
import React, {
    Component
} from 'react'
```

#### jsx에서 html 내장 이벤트 핸들링 하기

> on + {EventName}

```jsx
<input onChange={ console.log } onClick={ console.log } />
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
  return <ul className="col-md-4 list-group">
      {props.videos.length}
    </ul>;
};
```

#### react for문

* key값을 누락하면 난리치니 조심하자

```jsx
const videoItems = props.videos.map((video) => {
    return <VideoListItem key={video.etag} video={video} />;
  });
  
  return <ul className="col-md-4 list-group">{videoItems}</ul>;
```

### Day - 5

#### jsx 에선 class대신 반드시 className이라고 사용

#### decontructor로 props분해

```jsx
const VideoDetail = ({video}) => {
    
}
```

#### iframe의 src같은 native 속성들도 사용가능

```jsx
<iframe
  src={url}
  frameborder="0"
  className="embed-responsive-item"
></iframe>
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
        <iframe
          src={url}
          className="embed-responsive-item"
        ></iframe>
      </div>
```

그외

```scss
$embed-responsive-aspect-ratios: (
  (21 9),
  (16 9),
  (4 3),
  (1 1)
) !default;
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

####  Redux가 다른 flux 프레임워크와 다른점

* backbone은 collections를 가지고, flux는 다른 store들을 가지고있는데 반해 Redux는 state를 참조하는 한 오브젝트로 집중시킨다.

#### Reducer 란 어플리케이션 스테이트를 반환하는 함수

#### Reducer의 두 스텝

1. 리듀서 만들기
2. 앱과 연결하기

### Day - 8

#### react-redux | 리액트와 리덕스에 대한 라이브러리


#### prettierrc 설정

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```