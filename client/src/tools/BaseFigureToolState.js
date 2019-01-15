import BaseToolState from './BaseToolState';

class BaseFigureToolState extends BaseToolState {
  constructor() {
    super();

    this.addBorder = true;
    this.borderWidth = 1;
    this.borderColor = '#000000';
    this.addFill = true;
    this.fillColor = '#ff0000';
  }
}

export default BaseFigureToolState;
