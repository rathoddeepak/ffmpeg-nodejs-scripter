const spawn = require('child_process').spawn;
const runCommand = (cmd, args, onData, onFinish) => {
    var proc = spawn(cmd + args);
    proc.stdout.on('data', onData);
    proc.stderr.setEncoding("utf8")
    proc.stderr.on('data', err => console.log(err) );
    proc.on('close', onFinish);
}

class Ouput {

	instance = "Ouput";

	static VIDEO = 0;
	static IMAGE = 1;
	static GIF = 2;
	static AUDIO = 3;

	id = '';
	path = '';
	OuputType = Ouput.VIDEO;
	commands = [];


	setPath = (p) => {
		this.path = p;
		this.commands.push(p);
	}

	framerate = (val) => {
		this.commands.push(`-r ${val}`);
	}

	setType = (t) => {
		OuputType = t;
	}

	setType = (_id) => {
		this.id = _id;
	}


	toString = () => {
		return `${this.path}`
	}

	generate = async (ffmpegInstance, onProgress, onComplete) => {

		let _inputCommands = [];
		let filterCommands = [];
		let innerInstance = ffmpegInstance;

		const addCommand = (ins) => {
			if(ins.instance === "Input"){
				_inputCommands.push({
					command: ins.toString(), 
					index: ins.index
				});
			}else if(ins.instance === "Filter"){
				filterCommands.push(ins.toString());
			}
		}

		const iterate = (ips, inputs) => {
			addCommand(ips);
			for(let i of inputs){
				iterate(i, i.inputs);
			}
		}
		
		iterate(ffmpegInstance, ffmpegInstance.inputs);

		_inputCommands.sort((a, b) => a.index - b.index);
		const inputCommands = _inputCommands.map(obj => obj.command);
		const inputCommand = inputCommands.join(' ');
		const filterCommand = filterCommands.reverse().join(';');
		const outputCommand = this.commands.join(' ');

		const finalCommand = `${inputCommand} -filter_complex "${filterCommand}" -map "[${ffmpegInstance.id}]" ${outputCommand}`;
		console.log('./ffmpeg ', finalCommand)
		// runCommand('./ffmpeg ', finalCommand, onProgress, () => {
		// 	onComplete('./ffmpeg ' + finalCommand)
		// });
		return finalCommand;
	}
}

const createOutput = () => { 
	return new Ouput();
}

module.exports = {
	createOutput
}