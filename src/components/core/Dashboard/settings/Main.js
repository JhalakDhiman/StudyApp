import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"

export default function Settings() {
  return (
    <div className="flex flex-col gap-5 w-9/12 mx-auto">
      <h1 className="text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Delete Account */}
      <DeleteAccount />
    </div>
  )
}
