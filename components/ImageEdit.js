import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import Image from "next/image";
import detectFont from "../helpers/fonts";

function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.download = "cropPreview.png";
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    "image/png",
    1
  );
}

export default function ImageEdit({ onUpdate }) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const { user } = useContext(UserContext);
  const { query } = useRouter();
  const locale = query.lang;

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    const canvas = previewCanvasRef.current;

    canvas.toBlob(
      (blob) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
          if (imgRef.current) {
            onUpdate(fileReader.result);
          }
        };
        fileReader.readAsDataURL(blob);
      },
      "image/jpeg",
      1
    );
  }, [completedCrop]);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <div className="App mb-2 flex justify-center items-center flex-row w-full">
      <div className="flex justify-center w-full mt-5">
        <ReactCrop
          style={upImg ? { width: "300px" } : {}}
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
        <div>
          {!upImg && (
            <Image
              src={user.image}
              alt="profile-pic"
              layout="fixed"
              width={100}
              height={100}
            />
          )}
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
        </div>
      </div>
      <div className="flex-shrink-0">
        <label
          htmlFor="file-upload"
          className={`
          ${detectFont(locale, true, false)}
           text-[#8789BF] border-[1px] border-solid border-[#8789BF] 
          cursor-pointer py-[10px] px-[15px] text-[10px] flex items-center leading-[12px]bg-white`}
        >
          <i className="fa fa-cloud-upload"></i> Upload
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onSelectFile}
        />
      </div>
    </div>
  );
}
