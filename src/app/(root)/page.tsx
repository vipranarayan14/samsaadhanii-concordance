import { getDhatupatha } from "@/utils/getDhatupatha";
import { DhatuList } from "./DhatuList";

const dhatupatha = await getDhatupatha();

export default function Home() {
  return <DhatuList dhatuList={dhatupatha} />;
}
