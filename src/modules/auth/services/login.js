import axiosCSPublicInstance from "../../../axios/axiosCSPublicInstance";

const login = ({ userMeta, onSuccess, onError }) => {
  axiosCSPublicInstance
    .post(`/authenticate`, userMeta)
    .then(async (response) => {
      onSuccess?.(response);
    })
    .catch(() => {
      onError?.();
    });
};

export default login;
