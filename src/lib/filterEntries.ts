export default function filterEntries(filterRegex: string | RegExp | undefined, entries: string[] = []): string[] {
	if (filterRegex == null) {
		return entries;
	}
	if (filterRegex instanceof RegExp) {
		return entries.filter(entry => !entry.match(filterRegex));
	}
	return entries.filter(entry => !entry.match(new RegExp(filterRegex)));
}
