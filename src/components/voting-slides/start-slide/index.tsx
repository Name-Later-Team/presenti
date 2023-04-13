import { SlideWrapper } from "../slide-wrapper";

export default function StartSlide() {
    return (
        <SlideWrapper imageUrl="/svgs/wait-to-start.svg">
            <h1 className="mt-3 fs-3 text-center">Bài trình bày chưa bắt đầu</h1>
        </SlideWrapper>
    );
}
