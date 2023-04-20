import Link from "next/link";
import { SlideWrapper } from "../slide-wrapper";
import { APP_CONSTANTS } from "../../../constants";

export default function ThankYouSlide() {
    return (
        <SlideWrapper imageUrl="/svgs/super-thank-you.svg">
            <h1 className="mt-3 fs-3 text-center">Bài trình bày đã kết thúc</h1>

            <p className="text-center fs-6">
                Cảm ơn bạn đã tham gia. Ngoài ra, bạn có thể bắt đầu tạo cho mình một bài trình bày chỉ với vài thao tác
                đơn giản!
            </p>

            <Link href={APP_CONSTANTS.PRESENTER_APP_URL} target="_blank" className="btn btn-primary">
                Tôi muốn tạo bài trình bày
            </Link>
        </SlideWrapper>
    );
}
