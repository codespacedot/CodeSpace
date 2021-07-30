import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Toast(props) {
  const [open, setOpen] = useState(props.open);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(!open);
  };

  return (
    <div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={props.type}
            style={{ backgroundColor: props.backgroundColor }}
          >
            {props.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Toast;
