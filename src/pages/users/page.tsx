import { useState } from 'react';

type User = {
  id: string;
  email: string;
};

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Users</h1>

      <section>
        <form></form>
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
