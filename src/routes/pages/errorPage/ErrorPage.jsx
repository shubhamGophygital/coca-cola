import { useNavigate, useRouteError } from "react-router-dom";
import "./ErrorPage.css";
import navigationConstants from "../../navigationConstants";
import MessageLayout from "../../../modules/common/components/messageLayout/MessageLayout";
import CustomButton from "../../../modules/common/components/customButton/CustomButton";
import { useConfig } from "../../../customHooks/useConfig";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const { config } = useConfig();
  console.error(error);

  return (
    <MessageLayout
      image={config?.assets?.fallback?.logo}
      messageTitle="Oops!"
      messageSubtitle="Sorry, an unexpected error has occurred."
      className="error_page_container"
    >
      <i>{error?.statusText || error?.message}</i>
      <CustomButton
        btnText="Back to Home"
        onClick={() => navigate(navigationConstants.HOME)}
      />
    </MessageLayout>
  );
}
