import { useState } from 'react';

type User = {
  id: string;
  email: string;
};

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsers([...users, { id: Date.now().toString(), email }]);
    setEmail('');
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold underline mb-10">Users</h1>

      <section>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="email"
            className="border p-2 rounded"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add
          </button>
        </form>
      </section>

      <section>
        <div className="flex flex-col">
          {users.map((user) => (
            <div className="border p-2 m-2 rounded bg-gray-100" key={user.id}>
              {user.email}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
