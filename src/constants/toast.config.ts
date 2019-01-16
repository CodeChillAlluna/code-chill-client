import { toast } from "react-toastify";

// more infos : https://github.com/fkhadra/react-toastify#api

export const DEFAULT = {
    type: toast.TYPE.DEFAULT, 
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 6000,
    hideProgressBar: false,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    loseOnClick: true,
    className: "defaultToast",
    bodyClassName: "defaultToastBody",
    progressClassName: "defaultToastProgress",
    draggable: true,
    draggablePercent: 80,
};

export const SUCCESS = {
    type: toast.TYPE.SUCCESS, 
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 6000,
    hideProgressBar: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    closeOnClick: true,
    className: "successToast",
    bodyClassName: "successToastBody",
    progressClassName: "successToastProgress",
    draggable: true,
    draggablePercent: 80,
};

export const WARNING = {
    type: toast.TYPE.WARNING, 
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 6000,
    hideProgressBar: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    closeOnClick: true,
    className: "warningToast",
    bodyClassName: "warningToastBody",
    progressClassName: "warningToastProgress",
    draggable: true,
    draggablePercent: 80,
};

export const ERROR = {
    type: toast.TYPE.ERROR, 
    position: "bottom-right",
    autoClose: 6000,
    hideProgressBar: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    closeOnClick: true,
    className: "errorToast",
    bodyClassName: "errorToastBody",
    progressClassName: "errorToastProgress",
    draggable: true,
    draggablePercent: 80,
};

export const INFO = {
    type: toast.TYPE.INFO, 
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    closeOnClick: true,
    className: "errorToast",
    bodyClassName: "errorToastBody", 
    progressClassName: "errorToastProgress",
    draggable: true, 
    draggablePercent: 80,
};

export const LOADING_EXPORT = {
    type: toast.TYPE.INFO, 
    position: toast.POSITION.BOTTOM_RIGHT,
    hideProgressBar: true,
    className: "loadingExportToast",
    bodyClassName: "loadingExportToastBody",
    closeButton: false,
    autoClose: false as false,
    draggable: false,
    closeOnClick: false,
};

export const EXPORT_DONE = {
    type: toast.TYPE.SUCCESS, 
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2500,
    hideProgressBar: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    closeOnClick: true,
    className: "doneToast",
    bodyClassName: "doneToastBody",
    progressClassName: "doneToastProgress",
    draggable: true,
    draggablePercent: 80,
};