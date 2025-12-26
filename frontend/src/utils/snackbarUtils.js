import { useSnackbar } from "notistack"; 

let useSnackbarRef;
export const SnackbarUtilsConfigurator = () =>
{
    // eslint-disable-next-line react-hooks/globals
    useSnackbarRef=useSnackbar();
    return null;
};

export default{
    success(message){
        useSnackbarRef.enqueueSnackbar(message,{variant:'success'});
    },
    error(message){
        useSnackbarRef.enqueueSnackbar(message,{variant:'error'});
    },
    info(message){
        useSnackbarRef.enqueueSnackbar(message,{variant:'info'});
    },
    warning(message){
        useSnackbarRef.enqueueSnackbar(message,{variant:'warning'});
    },
};