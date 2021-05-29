export default function Home() {
  return (
    <>
      index 페이지입니다.
      <div>{process.env.NEXT_PUBLIC_API_URL}</div>
    </>
  );
}
