// main캠프 => commons/settings/apollo-setting.tsx

// 1. 위 파일에서 useEffect 부분 삭제 => 새로고침을 위한 로직은 삭제 (웹을 위한 내용이므로!)

// 2. getAccessToken().then((newAccessToken) => {
//  위 파일에서 66번째 줄에 setAccessToken(newAccessToken ?? "") => 웹을 위한 부분
//  추가로 앱을 위해서 fetchApp을 사용하여 앱에 저장하는 로직을 추가해야 함
//  await fetchApp({
//     query: "updateDeviceAuthForAccessTokenSet",
//     variables: { accessToken: newAccessToken },
//  })
// })

// 3.
