export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className=" mx-auto bg-white min-h-screen flex flex-col border-l border-r">
      {children}
    </div>
  );
}
