const center = (bgWidth, bgHeight, overlayWidth, overlayHeight) => {
	const x = `
		if(
			gte(${bgWidth}, ${overlayWidth}),
			${bgWidth}/2 - ${overlayWidth}/2,
			${overlayWidth}/2 - ${bgWidth}/2
		)
	`;

	const y = `
		if(
			gte(${bgHeight}, ${overlayHeight}),
			${bgHeight}/2 - ${overlayHeight}/2,
			${overlayHeight}/2 - ${bgHeight}/2
		)
	`;

	return {
		x: x.replace(/\n/g, ' '),
		y: y.replace(/\n/g, ' ')
	}
}

const centerScale = (frames, { width = 0, height = 0, srcWidth = 0, srcHeight = 0 } = {}) => {

	function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
	    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
	    return { width: srcWidth*ratio, height: srcHeight*ratio };
	}

	const ar = calculateAspectRatioFit(srcWidth,srcHeight,width,height);

	const createCondition = (str = "", frames, i, type) => {
		const currentFrame = frames?.[i];
		if (!currentFrame) return str;
		let { from, to, wp, hp } = currentFrame;
		i++;
		let data = '';
		if(type === "w"){
			data = `${ar.width}*${wp}`;
		}else if(type === "h"){
			data = `${ar.height}*${hp}`;
		}else if(type === "x"){
			data = (width / 2) - ((ar.width*wp) / 2);
		}else{
			data = (height / 2) - ((ar.height*hp) / 2);
		}
		return `if(between(n, ${from}, ${to}), ${data}, ${createCondition(
			str,
			frames,
			i,
			type
		)})`;
	};

	const w = createCondition(width, frames, 0, "w");
	const h = createCondition(height, frames, 0, "h");

	const x = createCondition(0, frames, 0, "x");
	const y = createCondition(0, frames, 0, "y");

	return {
		w: `'${w}'`,
		h: `'${h}'`,
		x: `'${x}'`,
		y: `'${y}'`,
	};
};

module.exports = {
	centerScale,
	center
}