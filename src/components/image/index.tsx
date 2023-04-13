import styles from "../../styles/modules/Image.module.scss";

export interface IImageProps {
    url: string;
    alt?: string;
    width?: string;
    height?: string;
}

export default function Image(props: IImageProps) {
    const { url, width, height, alt } = props;

    return (
        <div className={`${styles["custom-image"]} ${styles["image-wrapper"]} mx-auto mb-3`} style={{ width, height }}>
            <img src={url} alt={alt} />
        </div>
    );
}
