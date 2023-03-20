const { Input, Output, Filters, Utility } = require('./libs');
const moment = require('moment');

const applyFilter = async () => {
	const backgroundImage = Input.createInput();	
	backgroundImage.setId('backgroundImage', 0);
	backgroundImage.loop(1);
	backgroundImage.setPath('new/background.jpg');
	backgroundImage.setType(backgroundImage.IMAGE);	

	const overlayImage = Input.createInput();	
	overlayImage.setId('overlayImage', 1);
	overlayImage.loop(1);
	overlayImage.setPath('new/img_1.jpeg');
	overlayImage.time(5);
	overlayImage.setType(overlayImage.IMAGE);

	const centerScaleCode = Utility.centerScale(
		[
			{
				from: 0,
				to: 25,
				wp: 0.60,
				hp: 0.60,
			},
			{
				from: 25,
				to: 50,
				wp: 0.70,
				hp: 0.70,
			},
			{
				from: 50,
				to: 75,
				wp: 0.80,
				hp: 0.80,
			},
			{
				from: 100,
				to: 125,
				wp: 0.99,
				hp: 0.99,
			},
		],
		{
			width: 540,
			height: 960,

			srcWidth: 720,
			srcHeight: 1280
		}
	);

	const scaleOverlayImage = new Filters.scale();
	scaleOverlayImage.setId('scaleOI');
	scaleOverlayImage.width(centerScaleCode.w);
	scaleOverlayImage.height(centerScaleCode.h);
	scaleOverlayImage.eval('frame');
	scaleOverlayImage.addInput(overlayImage);

	const overlayFilter = new Filters.overlay();
	overlayFilter.setId('finalOutput');
	overlayFilter.xpos(centerScaleCode.x);
	overlayFilter.ypos(centerScaleCode.y);
	overlayFilter.addInput(backgroundImage);
	overlayFilter.addInput(scaleOverlayImage);

	const output = Output.createOutput();
	output.framerate(20);
	output.setPath(`output/${moment().unix()}.mp4`)

	output.generate(overlayFilter, (progress) => {
		console.log(progress);
	}, (c) => {
		console.log(c);
	});
}

applyFilter();