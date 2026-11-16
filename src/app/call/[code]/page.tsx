import { notFound } from "next/navigation";
import { InvitePage, inviteMetadata } from "@/components/InvitePage";
import { isInviteCode } from "@/lib/invites";

export async function generateMetadata(props: PageProps<"/call/[code]">) {
  const { code } = await props.params;
  return inviteMetadata(code);
}

export default async function CallInvite(props: PageProps<"/call/[code]">) {
  const { code } = await props.params;
  if (!isInviteCode(code)) notFound();
  return <InvitePage code={code} />;
}
