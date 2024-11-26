import dbConnect from '@/lib/dbConnect';

export default async function Home() {
  await dbConnect();

  return (
    <div>
      <div>Home</div>
      <div>{}</div>
    </div>
  );
}
