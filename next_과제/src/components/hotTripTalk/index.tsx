import Image from "next/image";
import Icon from "@/components/icon-factory";
import { useHotTripTalk } from "@/components/hotTripTalk/hook";
import { dateViewSet } from "@/utils/dateViewSet";
import Link from "next/link";

export default function HotTripTalk() {
  const { data, error, loading } = useHotTripTalk();
  console.log("핫한트립토크", data, error, loading);

  return (
    <div className="max-md:mx-5 max-w-7xl m-auto py-10 max-sm:pl-6 max-sm:pt-6">
      <div className="flex flex-col gap-6">
        <h3 className="font-bold text-xl">오늘 핫한 트립토크</h3>
        <div className="grid grid-cols-4 gap-8 max-sm:flex max-sm:gap-4 max-sm:overflow-x-auto overflow-hidden max-sm:mr-[-100px]">
          {loading && <div>로딩중...</div>}
          {data?.map((cardData, idx) => {
            const { images, title, user, writer, createdAt, likeCount } =
              cardData;
            const imageURl = images?.[0]
              ? `${process.env.NEXT_PUBLIC_IMAGE_HOST_NAME}${images[0]}`
              : "/images/img-0.png";

            return (
              <Link
                href={`/boards/${cardData._id}`}
                key={idx}
                className="flex gap-2 justify-between"
              >
                <Image
                  className="rounded-md"
                  src={imageURl}
                  alt=""
                  width={112}
                  height={152}
                />

                <div className="flex flex-col justify-between text-gray-800 dark:text-gray-200 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <h4 className="font-extrabold">{title ?? "제목"}</h4>
                    <div className="flex justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-1 text-gray-700">
                        <span className="bg-gray-300 rounded-full w-6 h-6 overflow-hidden">
                          {/* <Image
                            src={
                              user?.picture ||
                              "/images/img-0.png"
                            }
                            alt=""
                            width={24}
                            height={24}
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          /> */}
                        </span>
                        {writer || "작성자"}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="text-red-500 flex gap-1">
                      <Icon icon="good" className="fill-red-500 w-6 h-6" />
                      <span>{likeCount || 0}</span>
                    </div>
                    <div className="font-light">
                      {dateViewSet(createdAt) || "0000.00.00"}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 더미 데이터 나중에 삭제
const cardData = [
  {
    img: "/images/img-0.png",
    title: "제목입니다.",
    writer: "작성자이름",
    writerimg: "/images/img-0.png",
    goodcount: 0,
    writedate: "2024.02.20",
  },
  {
    img: "/images/img-0.png",
    title: "제목입니다.",
    writer: "작성자이름",
    writerimg: "/images/img-0.png",
    goodcount: 0,
    writedate: "2024.02.20",
  },
  {
    img: "/images/img-0.png",
    title: "제목입니다.",
    writer: "작성자이름",
    writerimg: "/images/img-0.png",
    goodcount: 0,
    writedate: "2024.02.20",
  },
  {
    img: "/images/img-0.png",
    title: "제목입니다.",
    writer: "작성자이름",
    writerimg: "/images/img-0.png",
    goodcount: 0,
    writedate: "2024.02.20",
  },
];
