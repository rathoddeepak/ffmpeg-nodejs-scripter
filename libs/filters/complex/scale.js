const validation = require('./validation');
const Filter = require('../base');
const Output = require('../../output');


const possibleValues = {
	eval: {
		default: 'init',
		values: ['init', 'frame']
	}
}

class Scale extends Filter {
	constructor(props){
		super(props)
		this.command = [];
		this.init();
	}

	init = () => {
		this.setInputLength(1);
		// this.setOutputType(Output.VIDEO);
	}

	width = (val) => {
		if(!validation.isNumber(val) || !validation.isString(val)){
			this.command.push(`width=${val}`);
		}else{
			Filter.invalidValue('width', val);
		}
	}

	height = (val) => {
		if(!validation.isNumber(val) || !validation.isString(val)){
			this.command.push(`height=${val}`);
		}else{
			Filter.invalidValue('height', val);
		}
	}

	eval = (val) => {
		if(validation.withinArray(possibleValues.eval.values, val)){
			this.command.push(`eval=${val}`);
		}else{
			Filter.invalidValue('eval', val);
		}
	}

	toString = () => {
		const _input = this.inputs?.[0];
		if(!_input){
			throw new Error(`${this.id}, One Input is required`);
		}
		const params = 'scale=' + this.command.join(':');
		const input = _input.getFilterId();
		const output = this.id;
		return `[${input}]${params}[${output}]`;
	}
}

module.exports = Scale;