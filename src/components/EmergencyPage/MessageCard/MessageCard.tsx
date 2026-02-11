/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mail, Phone, Timer, Users } from "lucide-react";

type TEmergencyPostCardProps = {
  post: any;
};
const MessageCard: React.FC<TEmergencyPostCardProps> = ({ post }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {post?._id}
              </h3>
            </div>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {post.message}
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <Timer className="h-4 w-4 mr-1" />
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>

            <h1 className="text-purple-600 font-semibold mt-4">User Info</h1>
            <div className="mt-2 grid grid-cols-3 gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {post?.name || "Unknown User"}
              </span>
              <span className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                {post?.email || "No Email"}
              </span>
              <a
                href={`tel:${post?.phoneNumber}`}
                className="flex items-center hover:underline w-fit text-green-600"
              >
                <Phone className="h-4 w-4 mr-1" />
                {post?.phoneNumber || "No Phone"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageCard;
