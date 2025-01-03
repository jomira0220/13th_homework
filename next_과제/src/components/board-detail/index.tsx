import Icon from "@/components/icon-factory";
import LikeCountBtn from "@/components/like-count-btn";
import { Button, Tooltip, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Image from "next/image";

import { dateViewSet } from "@/commons/utils/dateViewSet";
import { useBoardDetail } from "@/components/board-detail/hook";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import YoutubeBox from "@/components/youtube-box";
import DOMPurify from "dompurify";

export default function BoardDetail() {
  const router = useRouter();
  const { detailData, boardId, error, loading } = useBoardDetail();

  if (loading) return <div>로딩중...</div>; //! 로딩중일때 디자인 변경하여 처리필요
  if (detailData === null || error) return redirect("/boards");

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <h3 className="text-2xl">{detailData?.title}</h3>
        <div>
          <div className="flex justify-between text-sm text-gray-400">
            <div className="flex items-center gap-1 text-gray-700 dark:text-white">
              <Avatar size="small" icon={<UserOutlined />} />
              {detailData?.writer}
            </div>
            <div>{dateViewSet(detailData?.createdAt)}</div>
          </div>
          <hr className="my-4" />
          <div className="flex gap-3 justify-end items-center">
            <Icon
              icon="link"
              className="fill-gray-800 w-6 h-6 dark:fill-white"
            />

            <Tooltip
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              mouseLeaveDelay={0.8}
              key="#fff"
              color="#fff"
              trigger={["hover"]}
              overlayInnerStyle={{ color: "#000" }}
              title={
                (detailData?.boardAddress?.address || "") +
                " " +
                (detailData?.boardAddress?.addressDetail || "")
              }
            >
              <button className="w-6 h-6">
                <Icon
                  icon="location"
                  className="fill-gray-800 w-6 h-6 dark:fill-white"
                />
              </button>
            </Tooltip>
          </div>
        </div>
        {detailData?.images &&
          detailData?.images.length > 0 &&
          !detailData?.images.includes("") && (
            <div className="flex gap-4">
              {detailData?.images.map((url: string) => (
                <Image
                  key={url}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_HOST_NAME}${url}`}
                  alt="content"
                  width="100"
                  height="100"
                  style={{ width: "auto", height: "auto" }}
                />
              ))}
            </div>
          )}

        {typeof window !== "undefined" ? (
          <div
            className="min-h-[500px]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(detailData?.contents || ""),
            }}
          />
        ) : (
          <div></div>
        )}

        {detailData?.youtubeUrl && (
          <div className="bg-gray-200 py-6">
            <YoutubeBox videoUrl={detailData?.youtubeUrl} />
          </div>
        )}

        <div className="flex gap-6 justify-center">
          <LikeCountBtn type="dislike" />
          <LikeCountBtn type="like" />
        </div>

        <div className="flex gap-6 justify-center">
          <Button
            type="default"
            variant="outlined"
            size="large"
            icon={<Icon icon="menu" className="fill-current w-6 h-6" />}
            onClick={() => router.push(`/boards`)}
          >
            목록으로
          </Button>

          <Button
            type="default"
            shape="default"
            size="large"
            icon={<Icon icon="edit" className="fill-current w-6 h-6" />}
            onClick={() => router.push(`/boards/${boardId}/edit`)}
          >
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
