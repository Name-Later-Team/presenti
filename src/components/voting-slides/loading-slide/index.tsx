import { Spinner, Stack } from "react-bootstrap";
import { SlideWrapper } from "../slide-wrapper";

export default function LoadingSlide() {
    return (
        <SlideWrapper>
            <Stack className="justify-content-center align-items-center my-3" gap={3}>
                <Spinner className="text-primary" animation="border" />
                <p className="m-0">Đang lấy dữ liệu</p>
            </Stack>
        </SlideWrapper>
    );
}
