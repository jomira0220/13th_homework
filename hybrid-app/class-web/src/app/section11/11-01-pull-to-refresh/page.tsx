"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const fetchItems = () =>
  new Array(10).fill(1).map(() => ({
    id: Math.random(),
    title: `게시글제목`,
  }));

export default function PullToRefreshPage() {
  const [items, setItems] = useState(fetchItems());

  const onNext = () => {
    setItems((prev) => [...prev, ...fetchItems()]);
  };

  const onRefresh = () => {
    setItems(fetchItems()); // 새로고침 시, 새로운 아이템으로 교체 / 눈에 보이는 부분만 새롭게 다시 보이도록
  };

  return (
    <div>
      <h1>아래는 게시글 목록입니다.</h1>
      <div>================================</div>
      <InfiniteScroll
        hasMore={true}
        dataLength={items.length}
        loader={<h4>Loading...</h4>}
        next={() => onNext()}
        // pull-to-refresh 설정하기
        pullDownToRefresh={true} // 1. 당겨서 리프레시 할래?
        pullDownToRefreshThreshold={150} // 2. 얼만큼 당겨야 리프레시 할래?
        pullDownToRefreshContent={
          // 3. 당겨서 리프레시 할 때 보여줄 컨텐츠 - 로딩이미지나 아이콘으로 노출하면 좋을듯
          <h3 style={{ textAlign: "center", color: "red" }}>
            조금 더 당겨야 리프레시됩니다.
          </h3>
        }
        releaseToRefreshContent={
          // 4. 당겨서 리프레시 할 때 보여줄 컨텐츠 - 로딩이미지나 아이콘으로 노출하
          <h3 style={{ textAlign: "center", color: "blue" }}>
            지금 손을 때면 리프레시합니다.
          </h3>
        }
        refreshFunction={onRefresh} // 5. 리프레시 될 때(드래그해서 손땔때) 실행할 함수 : 서버에서 세롭게 1페이지만 받아옴 스크롤 내리면 그때 2페이지 다시 받기
      >
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              height: "100px",
              backgroundColor: "yellow",
              margin: "10px",
            }}
          >
            {item.title}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
