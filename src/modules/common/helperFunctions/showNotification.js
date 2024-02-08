import { SET_NOTIFICATION } from "../redux/notificationSlice";
import { store } from "../../../reduxStore";

const showNotification = (type = "SUCCESS", msg = "", duration = 3000) => {
  const dispatch = store.dispatch;
  dispatch(
    SET_NOTIFICATION({
      type,
      msg,
      duration,
    })
  );
};

export default showNotification;
