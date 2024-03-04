import type { MetaFunction } from '@remix-run/node';
import { Form, redirect } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Remix</h1>
      <Form method="post">
        <button type="submit">Write client data and go to Defer Example</button>
      </Form>
    </div>
  );
}

export async function clientAction() {
  localStorage.setItem('data', 'This is client-only data');
  return redirect('/defer');
}
