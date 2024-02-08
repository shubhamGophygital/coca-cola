import MessageLayout from "../../../modules/common/components/messageLayout/MessageLayout";
import { useEffect, useState } from "react";

const FallBackPage = () => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const toRef = setTimeout(() => {
      setShowComponent(true);
    }, 1000);
    return () => {
      setShowComponent(false);
      clearTimeout(toRef);
    };
  }, []);

  if (!showComponent) {
    return <></>;
  } else {
    return <MessageLayout messageTitle="Loading!" />;
  }
};
export default FallBackPage;
