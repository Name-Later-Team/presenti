import { IBaseComponent } from "shared/interfaces";
import styles from "../../styles/modules/AppLogo.module.scss";
import Image from "next/image";

interface IAppLogoProps extends IBaseComponent {
    className?: string;
}

export default function AppLogo(props: IAppLogoProps) {
    const { className } = props;
    return (
        <div className={className ? `${className} ${styles["app-logo-container"]}` : styles["app-logo-container"]}>
            <Image
                className={styles["app-logo-container__app-logo"]}
                src="/images/logo-presenti-transparent.png"
                alt="app-logo"
                priority
                fill
            />
        </div>
    );
}
