import React, { useState } from "react";
import AccountInfoView from "./view/AccountInfoView";

type Props = {};

const AccountInfo = (props: Props) => {
  const [activeScreen, setActiveScreen] = useState(0);

  const screens = [<AccountInfoView onNavigate={setActiveScreen} />];

  return screens[activeScreen];
};

export default AccountInfo;
