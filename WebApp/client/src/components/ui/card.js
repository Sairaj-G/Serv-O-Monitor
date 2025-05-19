export function Card({ children, className }) {
  return <div className={`rounded-xl border bg-white dark:bg-gray-900 p-4 shadow ${className}`}>{children}</div>;
}
export function CardContent({ children, className }) {
  return (
    <div className={`p-2 ${className}`}>
      {children}
    </div>
  );
}