"use client";

import PlaceCard from "@/components/commons/place-card";
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client";
import Footer from "@/commons/layout/footer";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import Link from "next/link";
import { ICONS } from "@/commons/constants/images";
import { FETCH_SOLPLACE_LOGS } from "@/commons/apis/graphql/queries/fetch-solplace-logs.query";

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
  const [hasMore, setHasMore] = useState(true);
  const { data, fetchMore } = useQuery(FETCH_SOLPLACE_LOGS);

  const onNext = () => {
    if (data === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoards.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log("fetchMoreResult.solplaceLogs", fetchMoreResult.solplaceLogs);
        if (fetchMoreResult.solplaceLogs.length === 0) {
          setHasMore(false);
        }
        return {
          solplaceLogs: [...prev.solplaceLogs, ...fetchMoreResult.solplaceLogs],
        };
      },
    });
  };

  return (
    <>
      <section style={{ paddingBottom: "4rem", position: "relative" }} className={data || styles.section}>
        <InfiniteScroll
          dataLength={data?.fetchSolplaceLogs.length ?? 0}
          next={onNext}
          hasMore={hasMore}
          loader={<div className={styles.loader}></div>}
        >
          {data ? (
            <div className={styles.cards}>
              {data.fetchSolplaceLogs?.map((el: TFetchSolplaceLogs) => (
                <PlaceCard
                  key={el.id}
                  id={el.id}
                  images={el.images[0]}
                  title={el.title}
                  contents={el.contents}
                  addressCity={el.addressCity}
                  addressTown={el.addressTown}
                />
              ))}
            </div>
          ) : (
            <div className={styles.no_place_wrapper}>
              <div className={styles.no_place}>등록된 플레이스가 없습니다.</div>
            </div>
          )}
        </InfiniteScroll>
        <Link href="/solplace-logs/new">
          <Image
            className={styles.floating_button}
            src={ICONS.solplaceLogsNewFloating.src}
            alt={ICONS.solplaceLogsNewFloating.alt}
            width={0}
            height={0}
          />
        </Link>
      </section>
      <Footer buttonText="" />
    </>
  );
}
