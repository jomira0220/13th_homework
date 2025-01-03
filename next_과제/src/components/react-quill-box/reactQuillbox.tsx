"use client";
import ReactQuill, { Quill } from "react-quill-new";
import QuillResizeImage from "quill-resize-image";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import { useReactQuillBox } from "./hook";
import { useEffect, useMemo, useRef } from "react";
import styles from "./index.module.scss";
import "react-quill-new/dist/quill.snow.css";
import { ReactQuillBoxProps } from "./types";

Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
Quill.register("modules/resize", QuillResizeImage);

const ReactQuillBox = (props: ReactQuillBoxProps) => {
  const quillRef = useRef<ReactQuill>(null);
  const { id, title, onChange, readonly, ...rest } = props;

  const { imageHandler, register, formState } = useReactQuillBox();

  useEffect(() => {
    register(id, { required: "필수 입력 사항입니다." });
  }, [register, id]);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ size: [] }, { align: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
                "custom-color",
              ],
            },
            { background: [] },
          ],
          ["link", "image", "video"],
        ],
        handlers: {
          // video: function () {
          //   console.log("video");
          // },
          image: () => imageHandler(quillRef.current as ReactQuill),
        },
      },
      resize: {
        locale: {},
      },
      // imageDropAndPaste: {
      //   handler: imageDragAndDrop,
      // },
    };
  }, []);

  const handleChange = (
    value: string // html string
    // d: any, // delta
    // s: any, // source
    // editor: ReactQuill.UnprivilegedEditor // editor - quill instance
  ) => {
    // console.log(value,s,d,editor.getText());
    onChange(value);
  };

  return (
    <div>
      {title}
      <ReactQuill
        id={id}
        className={styles.reactQuillBox}
        ref={quillRef}
        theme="snow"
        modules={modules}
        onChange={handleChange}
        readOnly={readonly}
        placeholder={props.placeholder}
        {...rest}
      />
      {formState.errors[id]?.message && (
        <p className="toolTip">{formState.errors[id].message.toString()}</p>
      )}
    </div>
  );
};

ReactQuillBox.displayName = "ReactQuillBox";

export default ReactQuillBox;
