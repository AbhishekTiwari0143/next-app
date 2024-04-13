export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-xl">Profile</h1>
      <hr />
      <h2>{params.id}</h2>
    </div>
  );
}
