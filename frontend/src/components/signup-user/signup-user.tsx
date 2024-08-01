import { useState, useContext, useEffect } from "react";
import "../../styles/index.css";
import "./signup-user.css";
import AppContext from "../../context/app-context";
import { popup } from "../../vanilla-functions/model";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from "mdb-react-ui-kit";

type Prop = {
  display: boolean;
  setSignUpUserModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddAUserModal = function ({ display, setSignUpUserModal }: Prop) {
  const { backendServer, setIsLoading, validateEmail, validateMobile } = useContext(AppContext);
  const [disableBtn, setDisableBtn] = useState(false);

  const [whatsWrong, setWhatsWrong] = useState("");

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    runValidation();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !validateEmail(email) ||
      !validateMobile(mobile) ||
      !mobile ||
      !address ||
      !password
    )
      setDisableBtn(true);
    else setDisableBtn(false);
  });

  function runValidation() {
    if (!firstName) return setWhatsWrong("First name is requried");
    if (!lastName) return setWhatsWrong("Last name is requried");
    if (!email || !validateEmail(email)) return setWhatsWrong("Email is missing or invalid");
    if (!mobile || !validateMobile(mobile))
      return setWhatsWrong("Mobile Number is missing or invalid");

    if (!address) return setWhatsWrong("Address is missing or invalid");

    if (!role) return setWhatsWrong("Set a user role");
    if (!password) return setWhatsWrong("Please set a password");

    setWhatsWrong("");
  }

  async function addUser() {
    try {
      setIsLoading(true);
      const returned = await (
        await fetch(`${backendServer}/auth/signup`, {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
            pass: "pass-66966c874edc2a5271f1737f",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            mobile: mobile,
            password: password,
            address: {
              addressString: address,
            },
            role: role,
          }),
        })
      ).json();

      if (returned.status === "Internal server error") throw new Error(returned.message);

      setIsLoading(false);
      popup("Signup Successful!");
      setfirstName("");
      setlastName("");
      setmobile("");
      setPassword("");
      setemail("");
      setRole("");
      setAddress("");

      setSignUpUserModal(false);
    } catch (err) {
      setIsLoading(false);
      popup("Error creating user, try again later");
    }
  }

  return (
    <div className="modal-container" style={{ display: `${display ? "flex" : "none"}` }}>
      <div className="modal-body edit-a-user-modal-body">
        <div className="close-container-modal">
          <AiOutlineCloseCircle
            onClick={() => {
              setSignUpUserModal(false);
            }}
            className="cursor"
            size={20}
            color="#34204C"
          />
        </div>

        <div className="a-user-modal-cont flex-column align-column-left">
          <div className="flex-row align-row-left">
            <p className="big">Signup!</p>
          </div>

          <div className="flex-row">
            <input
              className="in a-a-u-inputs"
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
            <input
              className="in a-a-u-inputs"
              placeholder="Last Name"
              type="text"
              maxLength={100}
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>

          <div className="flex-row">
            <input
              className="in a-a-u-inputs"
              placeholder="Email"
              type="email"
              maxLength={100}
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              className="in a-a-u-inputs"
              placeholder="Mobile"
              type="text"
              value={mobile}
              onChange={(e) => {
                setmobile(e.target.value);
              }}
            />
          </div>

          <div className="flex-row">
            <MDBDropdown id="mdb-dropdown-custom-dropdown">
              <MDBDropdownToggle id="mdb-dropdown-custom-in-dropdown" color="light">
                {role || "user Role"}
              </MDBDropdownToggle>

              <MDBDropdownMenu id="user-user-add">
                <MDBDropdownItem
                  link
                  href="#auth"
                  onClick={() => {
                    setRole("student");
                  }}
                >
                  Student
                </MDBDropdownItem>
                <MDBDropdownItem
                  link
                  href="#auth"
                  onClick={() => {
                    setRole("admin");
                  }}
                >
                  Admin
                </MDBDropdownItem>
                <MDBDropdownItem
                  link
                  href="#auth"
                  onClick={() => {
                    setRole("teacher");
                  }}
                >
                  Teacher
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
            <input
              className="in a-a-u-inputs"
              placeholder="Password"
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="flex-row">
            <input
              className="in a-a-u-inputs"
              placeholder="Address"
              type="address"
              maxLength={100}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex-column" style={{ paddingBottom: 20, gap: 5 }}>
          <button disabled={disableBtn} onClick={addUser} className="themeBtn a-a-u-btn">
            Create user
          </button>
          <p className="redText small">{whatsWrong}</p>
        </div>
      </div>
    </div>
  );
};

export default AddAUserModal;
