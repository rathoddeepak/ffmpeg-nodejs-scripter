class Filter {
	instance = "Filter";

	id = '';
	limitInput = null;
	limitOutput = null;
	inputs = [];
	outputs = [];

	setId = (_id) => {
		this.id = _id;
	}

	addInput = (input) => {
		if(this.limitInput && this.inputs.length >= this.limitInput){
			console.log(this.id, 'Input Limit Reached');
			return
		}
		this.inputs.push(input);
	}

	addOuput = (output) => {
		if(this.limitInput && this.outputs.length >= this.limitOutput){
			console.log(this.id, 'Output Limit Reached');
			return
		}
		this.outputs.push(output);
	}

	setInputLength = (il) => {
		if(typeof il == "number"){
			this.limitInput = il;
		}else{
			Filter.invalidValue("OutputLength", il);
		}
	}

	setOutputLength = (ol) => {
		if(typeof ol == "number"){
			this.limitOutput = ol;
		}else{
			Filter.invalidValue("OutputLength", ol);
		}
	}

	getFilterId = () => {
		return this.id;
	}

	static invalidValue = (key, val) => {
		console.log(this.id, `WARN: Invalid Value for ${key}: ${val}`)
	}
}

module.exports = Filter;