
// !다이어리 리스트 노출 함수 -> 페이징 처리한 함수로 변경
const diaryListSet = (arr) => {
  const viewListCount = document.querySelector(".diaryList").dataset.viewlistcount;
  pageListElement(viewListCount, 1, ".diaryList")

  // const diaryElement = document.querySelector(".diaryList");

  // if (arr.length === 0) {
  //   // console.log("작성된 일기가 없습니다.");
  //   return diaryElement.innerHTML = "<p class='empty'>등록된 일기가 없습니다.</p>";
  // } else {
  //   diaryElement.innerHTML = "";
  // }

  // let diaryUl = diaryElement.querySelector('ul');
  // if (!diaryUl) {
  //   // 다이어리 리스트가 없을 경우 ul 생성
  //   diaryUl = document.createElement("ul");
  //   diaryElement.appendChild(diaryUl);
  // }

  // // console.log(arr);
  // diaryUl.innerHTML = arr.map((diary, index) => {
  //   const moodType = diary.moodType;
  //   const moodTypeInfo = moodTypeSet[moodType];
  //   const diaryId = diary.id;
  //   const moodColorNum = moodTypeInfo.colorNum;
  //   // console.log(diaryId);
  //   return `<li>
  //   <a href="./detail.html?diaryId=${diaryId}&#commentListWrap">
  //   <button class="closeBtn" onclick="diaryDeletePop(event,${diaryId})">
  //   <img src="./img/close_outline_light_m.svg" alt="일기 삭제 버튼">
  //   </button>
  //     <figure>
  //       <div class="imgBox imgBox_${moodColorNum}"><img src="${moodTypeInfo.imgSrc}" alt="오늘의 기분 ${moodType}" /></div>
  //       <figcaption>
  //         <div class="infoTop">
  //           <span class="moodText moodTextType${moodColorNum}">${moodType}</span>
  //           <span class="diaryDate">${diary.writeDate}</span>
  //         </div>
  //         <h3>${diary.title}</h3>
  //       </figcaption>
  //     </figure>
  //     </a>
  //   </li>
  //   `;
  // }).join("");
}
// diaryListSet(diaryArr);

const diaryLiRender = (diary) => {
  const moodType = diary.moodType;
  const moodTypeInfo = moodTypeSet[moodType];
  const diaryId = diary.id;
  const moodColorNum = moodTypeInfo.colorNum;
  // console.log(diaryId);
  return `<li>
    <a href="./detail.html?diaryId=${diaryId}&#commentListWrap">
    <ul class="emojiBox">
        <li><img src="./img/웃는얼굴.svg" alt="웃는얼굴"></li>
        <li><img src="./img/우는얼굴.svg" alt="우는얼굴"></li>
        <li><img src="./img/화난얼굴.svg" alt="화난얼굴"></li>
        <li><img src="./img/좋아요.svg" alt="좋아요"></li>
        <li><img src="./img/최고에요.svg" alt="최고에요"></li>
    </ul>
    <button class="closeBtn" onclick="diaryDeletePop(event,${diaryId})">
    <img src="./img/close_outline_light_m.svg" alt="일기 삭제 버튼">
    </button>
      <figure>
        <div class="imgBox imgBox_${moodColorNum}"><img src="${moodTypeInfo.imgSrc}" alt="오늘의 기분 ${moodType}" /></div>
        <figcaption>
          <div class="infoTop">
            <span class="moodText moodTextType${moodColorNum}">${moodType}</span>
            <span class="diaryDate">${diary.writeDate}</span>
          </div>
          <h3>${diary.title}</h3>
        </figcaption>
      </figure>
      </a>
    </li>
    `;
}


// !일기 등록 취소 팝업창 렌더링 함수
const writeCancelPop = () => popupRender("writeCancelPop",
  `<h3>일기 등록 취소</h3>
  <p>일기 등록을 취소하시겠습니까?</p>
  <div class="buttonWrap">
  <button class="whiteBtn" onclick="popupClose('.writeCancelPop');">계속 작성</button>
  <button class="blackBtn" onclick="popupClose('.diaryWritePop'); popupClose('.writeCancelPop')">등록 취소</button>
  </div>`
  , "alert"
);


// !일기 등록하기 클릭시 일기 쓰기 팝업창 렌더링 함수
const diaryWritePop = () => {

  const darkModeCheck = localStorage.getItem("lightStatus")
  let darkModeStatus = false;
  if (darkModeCheck) {
    darkModeStatus = darkModeCheck === "off" ? true : false;
  }

  const weatherData = JSON.parse(localStorage.getItem("weatherData"))[0];
  //    <h3>📍<span class="userName"></span>의 일기 쓰기</h3>
  // 팝업 창 렌더링 처리
  popupRender("diaryWritePop",
    `<div class="diaryWrite">
          <div class="diaryWriteHeader">
           <div>
            <span>오늘의 날씨</span>
            <div><img src="${weatherData.weatherIcon}" alt=""/></div>
            <span>${weatherData.weatherDesc}</span>
          </div>
            <label class="toggleWrap">
            다크모드<input class="toggleSwitch" type="checkbox" onclick="darkModeToggle(event)" checked="${darkModeStatus}" />
            </label>
          </div>
          <div class="diaryWriteInner">
          ${diaryMoodTypeRender()}
          <div class="diaryContent">
            <label>
              <span>제목</span>
              <input
                class="diaryTitle"
                type="text"
                placeholder="제목을 입력해 주세요."
                oninput='diaryWriteInputCheck()'
              />
            </label>
            <label>
              <span>내용</span>
              <textarea id="editArea"></textarea>
            </label>
          </div>
          </div>
          <div class="buttonWrap">
            <button class="popupClose" onclick="writeCancelPop()">닫기</button>
            <button class="diaryWriteBtn" onclick="diarySave()" disabled>
              등록하기
            </button>
          </div>
      </div>`) // 팝업창 렌더링 함수 호출

  editor = editorSet(); // 팝업 오픈 후 에디터 함수 호출
  editor.onChange = (event, core) => {
    console.log(core.getContents());
    location.href.includes("index.html") && diaryWriteInputCheck()
  }

  // 팝업창 렌더링 후 ESC를 누르면 모달이 닫히도록 처리
  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      popupClose('.diaryWritePop');
    }
  })

}



// !일기 저장 함수
const diarySave = () => {
  const moodTypeValue = document.querySelector("input[name='moodType']:checked").value;
  const diaryTitle = document.querySelector(".diaryTitle").value;
  const diaryDesc = editor.getContents();
  const setId = diaryArr.length + 1; // id값은 배열 길이 + 1

  const diary = {
    moodType: moodTypeValue,
    writeDate: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
    title: diaryTitle,
    content: diaryDesc,
    id: setId
  };

  diaryArr.push(diary);
  localStorage.setItem("diaryArray", JSON.stringify(diaryArr));

  diaryListSet(diaryArr);

  // 입력창 초기화
  document.querySelector(".diaryTitle").value = "";
  editor.setContents("");
  document.querySelector("input[name='moodType']:checked").checked = false;
  document.querySelector(".diaryWriteBtn").classList.remove("active");

  // 등록 완료 팝업 노출 
  popupRender("saveCompletePop",
    `<h3>일기 등록 완료</h3>
    <p>등록이 완료 되었습니다.</p>
    <button class="oneBtn blackBtn" onclick="popupClose('.saveCompletePop'); popupClose('.diaryWritePop')">확인</button>`
    , "alert"
  );

}

// !일기 필터에 따른 노출 처리 함수
const moodFilter = (optionValue) => {

  const moodType = optionValue;

  const filterListSet = (moodType) => {
    // 필터에서 선택한 기분값에 따른 저장된 일기 필터링리스트
    const diaryFilterList = diaryArr.filter((diary) => {
      const diaryMoodType = diary.moodType; // 저장된 일기의 기분 값
      return moodType === diaryMoodType
    })

    document.querySelector(".diaryList ul").innerHTML = diaryFilterList.map((diary) => diaryLiRender(diary)).join("");
    document.querySelector(".diaryPagination").classList.add("hide");
    document.querySelector(".paginationHeader").classList.add("hide");
  }

  // 필터링된 일기 리스트 노출
  if (moodType === "전체") {
    document.querySelector(".diaryPagination").classList.remove("hide");
    document.querySelector(".paginationHeader").classList.remove("hide");
    diaryListSet()
  } else {
    filterListSet(moodType);
  }
}



// !검색어 필터에 따른 노출 처리 함수
const searchListSet = (event) => {

  const searchType = event.target.parentNode.querySelector(".searchFilter li.active").dataset.value; // 검색 옵션 값
  const searchValue = event.target.value; // 검색어 값

  console.log(searchType, searchValue);

  // 필터에서 선택한 기분값에 따른 저장된 일기 필터링리스트
  const diaryFilterList = diaryArr.filter((diary) => {
    const diaryTitle = diary.title;
    const diaryContent = diary.content.replace(/<[^>]*>?/g, ''); // html 태그 제거한 텍스트 내용만 가져오기
    // console.log(diaryTitle, diaryContent);

    if (searchType === "제목") {
      return diaryTitle.includes(searchValue);
    } else if (searchType === "내용") {
      return diaryContent.includes(searchValue);
    } else
      if (searchType === "제목+내용") {
        return diaryTitle.includes(searchValue) || diaryContent.includes(searchValue);
      }
  })

  // 필터링된 일기 리스트 노출
  if (searchValue === '') {
    diaryListSet()
  } else {
    document.querySelector(".diaryList ul").innerHTML = diaryFilterList.map((diary) => diaryLiRender(diary)).join("");
    document.querySelector(".diaryPagination").classList.add("hide");
    document.querySelector(".paginationHeader").classList.add("hide");
  }
}


// !검색 필터 옵션 선택에 따른 1.5초후 검색 처리 함수
let searchTimer;
const searchFilterTimer = (event) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchListSet(event);
  }, 1500)
}

// !검색 필터 옵션 선택에 따른 엔터키 검색 처리 함수
const searchFilterEnter = (event) => {
  if (event.key === "Enter") {
    searchListSet(event);
  }
}


// !스크롤시 필터 고정 관련 스타일 추가 함수
const stickyAddStyle = () => {
  const scrollY = window.scrollY;
  const stickyEl = document.querySelector('.navBottom')
  const elTop = stickyEl.offsetTop - 20;
  // console.log(scrollY, elTop);
  if (scrollY >= elTop) {
    stickyEl.classList.add('stickyAddStyle');
  } else {
    stickyEl.classList.remove('stickyAddStyle');
  }

}
window.addEventListener('scroll', stickyAddStyle);


// !모바일 검색버튼 클릭시 검색창 노출 처리용 함수
const searchShow = () => {
  const searchBox = document.querySelector('.searchBox');
  const searchMobilePopBtn = document.querySelector('.searchMobilePopBtn');

  searchBox.classList.toggle('active');
  searchMobilePopBtn.classList.toggle('active');
}