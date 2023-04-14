import CustomImage from "components/image";
import { Stack } from "react-bootstrap";
import { IBaseComponent } from "shared/interfaces";

export interface ISlideWrapperProps extends IBaseComponent {
    imageUrl?: string;
}

export function SlideWrapper(props: ISlideWrapperProps) {
    const { imageUrl, children } = props;
    return (
        <Stack className="">
            {imageUrl && <CustomImage url={imageUrl} height="250px" />}
            {children}
        </Stack>
    );
}
