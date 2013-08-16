function appendIf(el, tag) {
	if(el.is(tag) || !tag) {
		return el;
	}
	var res = el.find(tag);
	if(res && res.length) {
		return res;
	}
	return el.append(can.$('<' + tag + '>')).find(tag);
};
