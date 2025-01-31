import { toast } from "react-toastify";

export const copyToClipboard = (text) => {
    const shortLink = `http://localhost:8000/api/v1/links/r/${text}`;
    navigator.clipboard.writeText(shortLink)
    .then(() => {
        toast.success("Link copied to clipboard!", {
            position: "bottom-left", // Set position to bottom-left
            autoClose: 2000, // Auto close after 2 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
        });
    })
    .catch(() => {
        toast.error("Failed to copy link!", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
        });
    });
};
