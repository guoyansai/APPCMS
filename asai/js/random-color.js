export const RandomColor = function() {
	var str = "bcdef";
	var t = "#";
	for (var j = 0; j < 6; j++) {
		t = t + str.charAt(Math.random() * str.length);
	}
	return t;
}
export const SearchColor = function(val) {
	return "<span style=\"background-color:" + RandomColor() + "\">" + val + "</span>";
}
