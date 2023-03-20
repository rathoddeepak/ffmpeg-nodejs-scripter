class Input {
	instance = "Input";

	static VIDEO = 0;
	static IMAGE = 1;
	static GIF = 2;
	static AUDIO = 3;

	id = '';
	index = null;
	path = '';
	inputType = Input.VIDEO;
	inputs = [];
	command = [];


	setPath = (p) => {
		this.path = p;
		this.command.push(`-i ${p}`);
	}

	setType = (t) => {
		this.inputType = t;
	}

	setId = (_id, _index) => {
		this.id = _id;
		this.index = _index;
	}

	loop = (val) => {
		this.command.push(`-loop ${val}`);
	}

	/**
	 * @Desc: Show for how many seconds image will be shown
	 * @Value: is seconds
	*/
	time = (val) => {
		this.command.push(`-t ${val}`);
	}

	getId = () => {
		return this.id;
	}

	getIndex = () => {
		return this.index;
	}

	getTypeString = () => {
		if (this.type === Input.VIDEO || this.type === Input.Image) {
			return 'v';
		}else if(this.type === Input.AUDIO){
			return 'a';
		}
	}

	getFilterId = () => {
		if(this.index === null){
			throw new Error(`ERROR: ${this.id} | Index NULL`);
		}
		return `${this.index}:${this.getTypeString()}`
	}

	toString = () => {
		if(this.path?.length == 0){
			throw new Error("Input Path Not Set");
		}
		return this.command.join(' ');
	}
}

const createInput = () => { 
	return new Input();
}

module.exports = {
	createInput
}