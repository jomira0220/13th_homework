import { useRouter, useSearchParams } from "next/navigation";

export function useParamsControl() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const params = Object.fromEntries(searchParams.entries());

  // addOrUpdateQueryParams({ key: "value", key2: "value2" });
  // 추가 또는 업데이트하려는 파라미터 입력
  const addOrUpdateQueryParams = (params: { [key: string]: string }) => {
    Object.keys(params).forEach((key) => {
      currentParams.set(key, params[key]); // 파라미터 추가 또는 업데이트
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
    params,
    searchParams,
  };
}
