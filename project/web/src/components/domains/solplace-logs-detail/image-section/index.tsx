"use client";

import styles from "./styles.module.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SolplaceLogsDetailImages from "./detail-images";
import { useBoardDetail } from "@/commons/hooks/use-board-detail";
import ImageIndicator from "@/components/commons/image-indicator";
import { useState } from "react";

export default function SolplaceLogsDetailImageSection() {
  const { data } = useBoardDetail();
  const [currentImageCount, setCurrentImageCount] = useState<number>(1);

  const images = data?.fetchSolplaceLog?.images;
  return (
    <section className={styles.section}>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        allowSlideNext
        allowSlidePrev
        onSlideChange={(swiper) => setCurrentImageCount(swiper.activeIndex + 1)}
      >
        {images?.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <SolplaceLogsDetailImages image={image} imageIndex={index + 1} totalImage={images.length} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.indicator}>
        <ImageIndicator currentImage={currentImageCount} totalImages={images?.length} />
      </div>
    </section>
  );
}
