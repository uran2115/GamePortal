interface ToastProps {
    message: string;
}

function Toast({
    message,
}: ToastProps) {
    if (!message) return null;

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-12 py-8 rounded-lg font-bold z-50">
            {message}
        </div>
    );
}

export default Toast;