import React, { Component } from "react";
import BrandingService from "../BrandingService";
import { BrandingContext } from "./BrandingContext";
import StylingProvider from "./StylingProvider";
import FallBackPage from "../../routes/pages/fallBackPage/FallBackPage";

class BrandingProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: { isDefault: true },
      messages: { isDefault: true },
      isLoading: true,
    };
  }

  componentDidMount() {
    BrandingService.get().then((result) => {
      this.setState(
        {
          config: result[0],
          messages: result[1],
          isLoading: false,
        },
        () => {
          this.setBodyFonts();
          this.changeFavicon(this.state?.config?.assets?.favIcon);
          document.title = this.state?.messages?.app?.document?.title;
        }
      );
    });
  }

  setBodyFonts() {
    var fonts = document.createElement("style");
    fonts.appendChild(document.createTextNode(this.state.config.fonts));
    document.head.appendChild(fonts);
  }

  changeFavicon(src) {
    var link = document.createElement("link");
    link.id = "dynamic-favicon";
    link.rel = "shortcut icon";
    link.href = src;
    document.head.appendChild(link);
  }

  renderLoading() {
    return <FallBackPage />;
  }

  render() {
    const { children } = this.props;
    const { isLoading, config, messages } = this.state;
    if (isLoading) {
      return this.renderLoading();
    }
    return (
      <BrandingContext.Provider value={this.state}>
        <StylingProvider stylingVariables={config.theme}>
          {children}
        </StylingProvider>
      </BrandingContext.Provider>
    );
  }
}

export default BrandingProvider;
