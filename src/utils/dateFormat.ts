export default function formatCpf(date: string) {
  return date
  .replace(/\D/g, '')
  .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
}
