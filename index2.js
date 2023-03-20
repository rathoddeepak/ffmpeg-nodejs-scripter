const effect = require('./assets/python.json');
const spawn = require('child_process').spawn;
const moment = require("moment");

const runCommand = (cmd, args, onData, onFinish) => {
    var proc = spawn(cmd, args.split(' '));
    proc.stdout.on('data', onData);
    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', err => console.log(err) );
    proc.on('close', onFinish);
}

const replaceToOriginal = (str) => {
	return str.replace(/{pythoncomplex}/g, "filter_complex").replace(/{pythonmerge}/g, "alphamerge").replace(/{pythono}/g, "overlay").replace(/{pythonz}/g, "zoom").replace(/{pythonf}/g, "fade");
}

const applyFilter = () => {
	try {
		const finalCommand = [];
		const waterMarkPath = 'watermark.gif';
		for(const image of effect.images){
				for(let pre of image.prefix){
					finalCommand.push(pre)
					
				}
				finalCommand.push(`assets/${image.name}`);
				
			}

			for(const staticInput of effect.static_inputs){
				for(let pre of staticInput.prefix){
					finalCommand.push(pre)
					
				}
				finalCommand.push(`assets/${staticInput.name}`);
				
			}

			finalCommand.push("-ignore_loop");
			
	        finalCommand.push("0");
	        
	        finalCommand.push("-i");
	        
	        finalCommand.push(waterMarkPath);
	        

	        if (effect?.m?.length > 0) {
	        	for(let mpy of effect?.m){
	        		finalCommand.push(replaceToOriginal(mpy));
	        		
	        	}
	        }

	        if (effect?.r?.length > 0) {
	        	for(let mpy of effect.r){
	        		finalCommand.push(replaceToOriginal(mpy));	        		
	        	}
	        }

	        if (effect?.d?.length > 0) {
	        	for(let mpy of effect.d){	        		
	        		finalCommand.push(replaceToOriginal(mpy));	        		
	        	}
	        }

	        finalCommand.push("-preset");
	        
            finalCommand.push("ultrafast");
            const unix = moment().unix();
            finalCommand.push(`output/latest_${unix}.mp4`);
            

            return finalCommand.join(' ');
	} catch (e) {
		console.log(e);
	}
}

// const command = applyFilter();
// console.log(command);
// runCommand('./ffmpeg', command, (data) => {
// 	console.log(data)
// }, () => {
// 	console.log('finished')
// });


const startEffect = () => {
	try {
		const finalCommand = [];
		/**
		 * @FIRST
		 * Zoom: 1 | 2 | 3 | 4 (FULL)
		 */
		const asset1 = 'assets/img_1.jpg';
		const zoomEffect = `-vf zoompan=z='min(zoom+0.0015,1.5)':d=700:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'`
		finalCommand.push(`-loop 1 -i ${asset1} ${zoomEffect} -c:v libx264 -t 15`);


		/**
		 * @VideoSize
		 * Zoom: 1 | 2 | 3 | 4 (FULL)
		 */
		const width = 720;
		const height = 1280;
		finalCommand.push(`-pix_fmt yuv420p -s ${width}x${height}`);


		/**
		 * @Outpufile
		 * Zoom: 1 | 2 | 3 | 4 (FULL)
		 */
		const filename = 'out.mp4';
		finalCommand.push(fil./ename);
		
		return finalCommand.join(' ');
	} catch (err) {
		console.log(err);
	}
}

const command = startEffect();

runCommand('./ffmpeg', command, (data) => {
	console.log(data)
}, () => {
	console.log('finished')
});
