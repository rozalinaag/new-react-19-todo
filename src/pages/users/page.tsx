type User = {
  id: string;
  email: string;
};

export function UsersPage() {
  // const [users, setUsers] = useState<User[]>([]);
  // const [email, setEmail] = useState('');

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setUsers([...users, { id: crypto.randomUUID(), email }]);
  //   setEmail('');
  // };

  // const handleDelete = (id: string) => {
  //   setUsers((lastUsers) => lastUsers.filter((user) => user.id !== id));
  // };

  return (
    <main className="container mx-auto p-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline mb-10">Users</h1>

      <CreateUserForm />

      <UsersList
        users={[
          { id: '1', email: 'Xy@example.com' },
          { id: '2', email: 'x9Gy@dsd' },
        ]}
      />
    </main>
  );
}

export function CreateUserForm() {
  return (
    <form className="flex gap-2">
      <input
        type="email"
        className="border p-2 rounded"
        // value={email}
        // onChange={(event) => setEmail(event.target.value)}
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export function UsersList({ users }: { users: User[] }) {
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export function UserCard({ user }: { user: User }) {
  return (
    <div className="border p-2 m-2 rounded bg-gray-100 flex gap-2 ">
      {user.email}

      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-auto"
        type="button"
        // onClick={() => handleDelete(user.id)}
      >
        Delete
      </button>
    </div>
  );
}
