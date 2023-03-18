import React from 'react'

export type UserInfo = {
  username: string
  profilePicture: string
}

const ProfileAvatar = ({ username, profilePicture }: UserInfo) => {
  return (
    <div>
      {profilePicture ? (
        <div className="flex items-center space-x-4">
          <img
            className="w-10 h-10 rounded-full"
            src={profilePicture}
            alt={username}
          />
          <div className="font-medium dark:text-white">
            <p>{username}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <div className="font-medium text-black">
            <p>{username}</p>
          </div>
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileAvatar
