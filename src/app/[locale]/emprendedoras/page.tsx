import EmprendedorasI18n from "./EmprendedorasI18n";
import EmprendedorasSanity from "./EmprendedorasSanity";

export default function Page() {
  const useSanity = process.env.NEXT_PUBLIC_USE_SANITY_EMPRENDEDORAS === "true";

  return useSanity ? <EmprendedorasSanity /> : <EmprendedorasI18n />;
}
