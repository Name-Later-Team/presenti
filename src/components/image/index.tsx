import Image from "next/image";
import styles from "../../styles/modules/Image.module.scss";

export interface IImageProps {
    url: string;
    alt?: string;
    width?: string;
    height?: string;
}

export default function CustomImage(props: IImageProps) {
    const { url, width, height, alt } = props;

    return (
        <div className={`${styles["custom-image"]} ${styles["image-wrapper"]} mx-auto mb-3`} style={{ width, height }}>
            <Image src={url} alt={alt || "img"} />
        </div>
    );
}
