import { useImageUploadStore } from "@/commons/stores/image-upload";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { useRef } from "react";
import Image from "next/image";
import { IoIosClose, IoIosAdd } from "react-icons/io";

interface IImageUpload<T> {
  className: string;
  name: Path<T>;
}

export default function ImageUpload<T extends FieldValues>({
  className,
  name,
  ...rest
}: IImageUpload<T>) {
  // 이미지 업로드 글로벌 상태
  const { uploadImages, setUploadImages } = useImageUploadStore();

  const imgInput = useRef<HTMLInputElement>(null); // 이미지 업로드 인풋
  const { setValue, register, trigger } = useFormContext<T>();

  // 이미지 파일 업로드할 인풋 클릭 처리
  const imgUploadClick = () => {
    if (imgInput.current) {
      imgInput.current?.click();
    }
  };

  // 업로드한 이미지 URL 생성 및 이미지 글로벌 상태에 저장
  const imgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // 파일 크기 제한 (5MB 이하만 담기도록)
    const validFiles = Array.from(files).filter(
      (file) => file.size <= 5 * 1024 * 1024
    );
    if (validFiles.length !== files.length) {
      alert("파일 크기는 5MB를 초과할 수 없습니다.");
    }

    const newImages: string[] = [];

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          newImages.push(event.target.result);

          if (newImages.length === validFiles.length) {
            setUploadImages([...uploadImages, ...newImages]);
            setValue(name, [...uploadImages, ...newImages] as PathValue<
              T,
              Path<T>
            >);
            trigger(name);
          }
        }
      };
    });
  };

  return (
    <div className="grid grid-cols-[1fr_3fr] p-[1.25rem_1.25rem_0]">
      <input
        type="file"
        accept="image/*"
        {...register(name)}
        className="hidden"
        ref={imgInput}
        onChange={(e) => imgUpload(e)}
        hidden
        multiple
      />
      <button
        type="button"
        className={className}
        onClick={() => imgUploadClick()}
        {...rest}
      >
        <IoIosAdd size={24} />
        사진 등록
      </button>
      <div className="overflow-x-auto whitespace-nowrap pr-[3.125rem]">
        {uploadImages.map((url, index) => (
          <div
            key={url + index}
            className="relative inline-block align-top ml-3 border border-gray-200 rounded-lg"
          >
            <button
              type="button"
              className="absolute right-2 top-2 w-5 h-5 rounded-full bg-[rgba(0,0,0,0.4)]"
              onClick={() => {
                setUploadImages(uploadImages.filter((_, i) => i !== index));
              }}
            >
              <IoIosClose size={20} color="white" />
              <span className="blind">사진 삭제</span>
            </button>
            <Image
              className="w-[6.25rem] h-[6.25rem] object-cover rounded-lg"
              key={index}
              src={url}
              alt="이미지"
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
