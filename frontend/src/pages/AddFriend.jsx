export default function AddFriend({ user }) {
  if (!user) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg col-span-1">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
        Add Friend
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Search and add friends here, {user.email}.
      </p>
      {/* Add friend form or search */}
    </div>
  );
}
