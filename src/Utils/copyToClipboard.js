import { toast } from "react-toastify";

export const copyToClipboard = (text) => {
    const shortLink = `https://minilinkbackend.onrender.com/api/v1/links/r/${text}`;
    navigator.clipboard.writeText(shortLink)
    .then(() => {
        toast.success("Link copied to clipboard!", {
            position: "bottom-left", 
            autoClose: 2000, 
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
