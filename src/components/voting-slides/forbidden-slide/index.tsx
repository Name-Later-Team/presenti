import { SlideWrapper } from "../slide-wrapper";

export default function ForbiddenSlide() {
    return (
        <SlideWrapper imageUrl="/svgs/secure-files.svg">
            <h1 className="mt-3 fs-3 text-center">Bài trình bày đang bị giới hạn</h1>

            <p className="text-center fs-6">
                Bài trình bày hiện tại đang bị giới hạn truy cập, vui lòng quay trở lại sau.
            </p>
        </SlideWrapper>
    );
}
