import { useRouter, useSearchParams } from "next/navigation";

export function useParamsControl() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams.toString()); //  URLSearchParams 객체로, URL 쿼리 파라미터를 다루기 위한 다양한 메서드 사용 용도
  const queryParams = Object.fromEntries(searchParams.entries()); // 파라미터 객체 키-값 저장 용도 - { key: value }

  // addOrUpdateQueryParams({ key: "value", key2: "value2" });
  // 추가 또는 업데이트하려는 파라미터 입력
  const addOrUpdateQueryParams = (queryParams: { [key: string]: string }) => {
    Object.keys(queryParams).forEach((key) => {
      currentParams.set(key, queryParams[key]); // 파라미터 추가 또는 업데이트
    });
    router.push(`?${currentParams.toString()}`, { scroll: false });
  };

  // removeQueryParams("key"); 삭제하려는 키 입력
  const removeQueryParams = (key: string) => {
    Object.keys(currentParams).forEach((key) => {
      currentParams.delete(key); // 특정 파라미터 삭제
    });
    router.push(`?${currentParams.toString()}`, { scroll: false });
  };

  // getQueryParamValue("key"); 가져오려는 value의 키 입력
  const getQueryParamValue = (key: string) => {
    return currentParams.get(key) ?? null;
  };

  return {
    addOrUpdateQueryParams,
    removeQueryParams,
    getQueryParamValue,
    queryParams,
    currentParams,
    searchParams,
  };
}
