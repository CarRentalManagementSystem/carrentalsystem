import { Snackbar } from "@mui/material";

const Toast = ({ message, open, setOpen }) => {

    const handleClose = (_, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };
    

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        message={message}
        autoHideDuration={3000}
      />
    );
}

export default Toast;