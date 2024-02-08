import { useNavigate } from "react-router-dom";
import Layout from "../../../common/components/layout/Layout";
import "./Home.css";
import navigationConstants from "../../../../routes/navigationConstants";
import { useConfig } from "../../../../customHooks/useConfig";
import { useDispatch } from "react-redux";
import { RESET_AUTH_STATE } from "../../../auth/redux/authSlice";
import CustomButton from "../../../common/components/customButton/CustomButton";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { config } = useConfig();

  function createProject() {
    if (config?.modules?.showQuestionnaire) {
      navigate(`${navigationConstants.QUESTION}/1`);
    } else {
      navigate(navigationConstants.BRAND_TAGS);
    }
  }

  return (
    <Layout>
      <div className="home_container">
        <div className="header">
          <p className="sub_header">Welcome to</p>
          <h1 className="main_header">Coca-Cola - MUSIC COMPOSER</h1>
          <div className="create_block" onClick={createProject}>
            <p>Start Project</p>
          </div>
          <CustomButton
            variant="filled"
            onClick={() => {
              dispatch(RESET_AUTH_STATE());
            }}
          >
            Logout
          </CustomButton>
        </div>
      </div>
    </Layout>
  );
};
export default Home;
