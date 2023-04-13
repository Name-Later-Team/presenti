import Link from "next/link";
import { SlideWrapper } from "../slide-wrapper";

export default function NotFoundSlide() {
    return (
        <SlideWrapper imageUrl="/svgs/undraw_page_not_found.svg">
            <h1 className="mt-3 fs-3 text-center">Xin lỗi, bài trình bày này hiện không tồn tại</h1>

            <p className="text-center fs-6">
                Bạn có thể bắt đầu tạo cho mình một bài trình bày chỉ với vài thao tác đơn giản!
            </p>

            <Link href="#" className="btn btn-primary">
                Tôi muốn tạo bài trình bày
            </Link>
        </SlideWrapper>
    );
}
