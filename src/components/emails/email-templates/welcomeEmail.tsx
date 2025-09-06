// emails/WelcomeEmail.tsx
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";

export default function WelcomeEmail({ name }: Readonly<{ name?: string }>) {
  return (
    <Html>
      <Tailwind>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900">
            Hi {name || "there"},
          </h2>
          <p className="mt-2 text-gray-700">
            Thanks for signing up! 🎉 We’re excited to have you onboard.
          </p>
          <p className="mt-4 ">— The FynLance Team 🚀</p>
        </div>
      </Tailwind>
    </Html>
  );
}
