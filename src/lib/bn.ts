const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** ইংরেজি সংখ্যাকে বাংলা অঙ্কে রূপান্তর (ভারতীয় কমা পদ্ধতি সহ) */
export function bn(n: number | string, group = true): string {
  const s = typeof n === "number" && group ? n.toLocaleString("en-IN") : String(n);
  return s.replace(/[0-9]/g, (d) => digits[Number(d)]);
}
