import { Preview } from "@react-email/preview";
import WelcomeEmail from "../email-templates/welcomeEmail";

export default function EmailPreviewPage() {
  return (
    <>
      {/* Preview text that shows in Gmail/Outlook snippet */}
      <Preview>Welcome to My App, John Doe!</Preview>

      {/* Actual email content */}
      <WelcomeEmail name="John Doe" />
    </>
  );
}
