import { ToastContainer, ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const reactToastifyConfigs: ToastContainerProps = {
    position: "top-center",
    closeOnClick: true,
    limit: 5,
    hideProgressBar: true,
    theme: "colored",
};

export default function NotificationContainer() {
    return <ToastContainer {...reactToastifyConfigs} />;
}
