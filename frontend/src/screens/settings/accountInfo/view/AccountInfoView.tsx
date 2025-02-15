import { useContext, useEffect, useState } from "react";
import "./AccountInfoView.css";
import { fileToBase64 } from "../../../../utils";
import AppContext from "../../../../context/app-context";

type Props = {
  onNavigate?: (arg: any) => void;
};

const AccountInfoView = ({ onNavigate }: Props) => {
  const [newLogo, setNewLogo] = useState<string | undefined>(undefined);
  const { usersData, getSignedAwsUrl, setIsLoading, updateUsersData, backendServer } =
    useContext(AppContext);
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    (async function () {
      setUserImage(await getSignedAwsUrl(usersData?.profile_picture, "profile-pictures"));
    })();
  }, [usersData]);

  const handleUploadProfilePicture = async (imageUri: File) => {
    const formData = new FormData();

    formData.append("photo", imageUri);

    try {
      setIsLoading(true);

      await (
        await fetch(`${backendServer}/users/profile/pic/${usersData?._id}`, {
          method: "PATCH",
          body: formData,
          headers: {
            enctype: "multipart/form-data",
            token: localStorage.getItem("abbeytoken") || "",
          },
        })
      ).json();

      await updateUsersData();
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="se-info-container">
      <div className="se-info-first-child">
        <div className="se-info-first-child-logo">
          <img
            src={newLogo || userImage || "/user_placeholder.png"}
            alt="abbey admin"
            className=""
          />
        </div>
        <div className="accountinfo-edit-info-change-logo">
          <span>Change profile picture</span>
          <input
            type="file"
            title=""
            onChange={async ({ target: { files } }) => {
              if (files !== null) {
                const file = files[0];
                try {
                  handleUploadProfilePicture(file);
                  const imgSrc = await fileToBase64(file);
                  setNewLogo(imgSrc);
                } catch (error) {}
              }
            }}
          />
        </div>
      </div>
      <div className="se-info-child">
        <div>
          <strong>First Name</strong>
          <span>{usersData?.first_name}</span>
        </div>
        <div>
          <strong>Last Name</strong>
          <span>{usersData?.last_name}</span>
        </div>
      </div>
      <div className="se-info-child">
        <div>
          <strong>Email</strong>
          <span>{usersData?.email}</span>
        </div>
        <div>
          <strong>Phone Number</strong>
          <span>{usersData?.mobile}</span>
        </div>
      </div>

      <div className="se-info-child">
        <div>
          <strong>Address</strong>
          <span>{usersData?.address?.addressString}</span>
        </div>
      </div>

      <div className="se-info-child">
        <div>
          <strong>Role</strong>
          <span>{usersData?.role}</span>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default AccountInfoView;
