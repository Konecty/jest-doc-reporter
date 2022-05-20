export default function sortEntries(sort: string, entries: string[]) {
	if (!Array.isArray(entries)) {
		return entries;
	}
	if (sort === 'asc') {
		return entries.sort();
	}
	if (sort === 'desc') {
		return entries.sort().reverse();
	}
	return entries;
}
