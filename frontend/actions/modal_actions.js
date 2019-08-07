export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const OPEN_UPLOAD_MODAL = "OPEN_UPLOAD_MODAL";
export const CLOSE_UPLOAD_MODAL = "CLOSE_UPLOAD_MODAL";

export const openModal = modal => ({
    type: OPEN_MODAL,
    modal
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});

export const openUploadModal = uploadModal => ({
    type: OPEN_UPLOAD_MODAL,
    uploadModal
});

export const closeUploadModal = () => ({
    type: CLOSE_UPLOAD_MODAL,
})