import { notFound } from "next/navigation";
import { InvitePage, inviteMetadata } from "@/components/InvitePage";
import { isInviteCode } from "@/lib/invites";

export async function generateMetadata(props: PageProps<"/[code]">) {
  const { code } = await props.params;
  return inviteMetadata(code);
}

export default async function ServerInvite(props: PageProps<"/[code]">) {
  const { code } = await props.params;
  if (!isInviteCode(code)) notFound();
  return <InvitePage code={code} />;
}
