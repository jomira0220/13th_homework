"use client";

import PlaceCard from "@/components/commons/place-card";
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client";
import Footer from "@/commons/layout/footer";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import Link from "next/link";
import { ICONS } from "@/commons/constants/images";
import { FETCH_SOLPLACE_LOGS } from "@/commons/apis/graphql/queries/fetch-solplace-logs.query";
import { useSearchParams } from "next/navigation";
import Toast from "@/components/commons/toast";

type TfetchSolplaceLogs = {
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
  const { data, fetchMore, refetch } = useQuery(FETCH_SOLPLACE_LOGS);

  const fetchItems = () =>
    data?.fetchSolplaceLogs?.map((el: TfetchSolplaceLogs) => (
      <PlaceCard
        key={el.id}
        id={el.id}
        images={el.images && el.images.length > 0 ? el.images[0] : ""}
        title={el.title}
        contents={el.contents}
        addressCity={el.addressCity}
        addressTown={el.addressTown}
      />
    ));
  const [items, setItems] = useState(fetchItems());

  const searchParams = useSearchParams();
  const toastMessage = searchParams.get("toastMessage");
  const onRefresh = () => {
    refetch();
  };
  useEffect(() => {
    setItems(data?.fetchSolplaceLogs);
  }, [data]);
  const onNext = () => {
    if (data === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchSolplaceLogs.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(
          "fetchMoreResult.fetchSolplaceLogs",
          fetchMoreResult.fetchSolplaceLogs
        );
        if (fetchMoreResult.fetchSolplaceLogs.length === 0) {
          setHasMore(false);
        }
        return {
          fetchSolplaceLogs: [
            ...prev.fetchSolplaceLogs,
            ...fetchMoreResult.fetchSolplaceLogs,
          ],
        };
      },
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <section
        style={{ paddingBottom: "4rem", position: "relative" }}
        className={data || styles.section}
      >
        <InfiniteScroll
          style={{ height: "100%" }}
          dataLength={data?.fetchSolplaceLogs.length ?? 0}
          next={onNext}
          hasMore={hasMore}
          loader={<div className={styles.loader}></div>}
          pullDownToRefresh={true} // 1. 당겨서 리프레시 할래?
          pullDownToRefreshThreshold={150} // 2. 얼만큼 많이 당길래?
          pullDownToRefreshContent={
            <div style={{ textAlign: "center", color: "blue" }}>
              조금 더 당겨야 리프레시됩니다 {/* 3. 살짝 당겼니? */}
            </div>
          }
          releaseToRefreshContent={
            <div style={{ textAlign: "center", color: "red" }}>
              지금 손을 떼면 리프레시됩니다 {/* 4. 많이 당겼네! */}
            </div>
          }
          refreshFunction={onRefresh} // 5. 이제 손 떼면, 서버에서 새롭게 다시 받아 올게!
        >
          {items ? (
            <div className={styles.cards}>
              {items?.map((el: TfetchSolplaceLogs) => (
                <PlaceCard
                  key={el.id}
                  id={el.id}
                  images={el.images ? el.images[0] : ""}
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
        <Link href="/solplace-logs/new" style={{ cursor: "pointer" }}>
          <Image
            className={styles.floating_button}
            src={ICONS.solplaceLogsNewFloating.src}
            alt={ICONS.solplaceLogsNewFloating.alt}
            width={0}
            height={0}
          />
        </Link>
        <div className={styles.toast}>
          {toastMessage && <Toast toastMessage={toastMessage} />}
        </div>
      </section>
      <Footer buttonText="" />
    </>
  );
}
