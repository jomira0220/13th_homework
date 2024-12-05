"use client";

import { useQuery } from "@apollo/client";
import { FETCH_SOLPLACE_LOGS } from "@/commons/apis/graphql/queries/fetch-solplace-logs.query";
import { useState } from "react";
import SolPlaceItem from "@/components/solplace-logs/solplace-list/solplace-item";
import InfiniteScroll from "react-infinite-scroll-component";

type TFetchSolplaceLogs = {
  id: string;
  images: string[];
  userId: string;
  title: string;
  contents: string;
  addressCity: string;
  addressTown: string;
};

export default function SolplaceLogsList() {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { data, fetchMore } = useQuery(FETCH_SOLPLACE_LOGS);
  console.log("data", data);

  const onNext = async () => {
    if (!data) return;

    await fetchMore({
      variables: {
        page: Math.ceil((data.fetchSolplaceLogs.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const fetchMoreResultData = fetchMoreResult?.fetchSolplaceLogs;
        if (!fetchMoreResultData?.length) {
          setHasMore(false);
          return prev;
        }
        return {
          fetchSolplaceLogs: [
            ...prev.fetchSolplaceLogs,
            ...fetchMoreResult?.fetchSolplaceLogs,
          ],
        };
      },
    });
  };

  return (
    <div>
      {data ? (
        <InfiniteScroll
          dataLength={data?.fetchSolplaceLogs.length ?? 0}
          next={onNext}
          hasMore={hasMore}
          className="grid p-[1.25rem_1.5rem] gap-4 grid-cols-2 w-full"
          loader={<div>loading</div>}
        >
          {data?.fetchSolplaceLogs?.map((el: TFetchSolplaceLogs) => (
            <SolPlaceItem key={el.id} {...el} />
          ))}
        </InfiniteScroll>
      ) : (
        <div className="flex items-center justify-center text-sm min-h-[80vh] text-center text-[#f5f5f5">
          등록된 플레이스가
          <br /> 없습니다.
        </div>
      )}
    </div>
  );
}
