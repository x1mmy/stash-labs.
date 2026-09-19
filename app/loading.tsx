import { Loader } from '@/components/Loader';

export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg">
      <Loader />
    </div>
  );
}
