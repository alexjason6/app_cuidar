export default function formatEmail(email: string) {
  const verifica = /\S+@\S+\.\S+/;
  return verifica.test(email);
}
