import { Head } from "@inertiajs/react";

type Props = {
  name: string;
};

export default function Home({ name }: Props) {
  return (
    <>
      <Head title="Home" />
      <h1>Hello, {name}!</h1>
    </>
  );
}
