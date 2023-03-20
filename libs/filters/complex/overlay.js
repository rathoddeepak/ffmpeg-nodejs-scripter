const validation = require('./validation');
const Filter = require('../base');
const Output = require('../../output');


const possibleValues = {
	eval: {
		default: 'init',
		values: ['init', 'frame']
	}
}

class Overlay extends Filter {
	constructor(props){
		super(props)
		this.command = ['alpha=straight', 'format=yuv420', 'eof_action=repeat'];
		this.init();
	}

	init = () => {
		// this.setInputLength(2);
		// this.setOutputType(Output.VIDEO);
	}

	xpos = (x) => {
		this.command.push(`x=${x}`)
	}

	ypos = (y) => {
		this.command.push(`y=${y}`)
	}

	toString = () => {
		const _input = this.inputs;
		if(!(_input?.length > 0)){
			throw new Error(`${this.id}, Atleast One Input is required`);
		}
		const params = 'overlay=' + this.command.join(':');
		const inputs = [];
		const output = this.id;
		for(let input of _input)inputs.push(`[${input.getFilterId()}]`);
		return `${inputs.join('')}${params}[${output}]`;
	}
}

module.exports = Overlay;