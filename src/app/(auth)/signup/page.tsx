import { SignupForm } from "@/features/auth/components/signup-form";
import { requireNoAuth } from "@/lib/auth-utils";

const Page = async () => {
  await requireNoAuth();

  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default Page;
