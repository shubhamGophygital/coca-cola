class BrandingService {
  get() {
    const config = import(`./${process.env.REACT_APP_BRANDING}/config.js`);
    const messages = import(
      `./${process.env.REACT_APP_BRANDING}/messages/messages.js`
    );
    return Promise.all([
      config.then((result) => result.default),
      messages.then((messages) => messages.default),
    ]);
  }
}

export default new BrandingService();
