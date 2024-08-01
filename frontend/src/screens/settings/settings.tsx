import "../../styles/index.css";
import "./settings.css";
import TabSwitcher from "../../components/tabSwitcher/TabSwitcher";
import { VscAccount } from "react-icons/vsc";
import AccountInfo from "./accountInfo/AccountInfo";
import { CgPassword } from "react-icons/cg";
import AboutView from "./about/about";

const Settings = function ({ display }: { display: boolean }) {
  if (!display) return;

  return (
    <div className="screen-container">
      <TabSwitcher
        title="Settings"
        panes={[
          {
            tab: (
              <div>
                <VscAccount style={{ fontSize: "1rem" }} />
                <span>Account info</span>
              </div>
            ),
            body: <AccountInfo />,
          },
          {
            tab: (
              <div>
                <CgPassword style={{ fontSize: "1rem" }} />
                <span>About</span>
              </div>
            ),
            body: <AboutView />,
          },
        ]}
      />
    </div>
  );
};

export default Settings;
