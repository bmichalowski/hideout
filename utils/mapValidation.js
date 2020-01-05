module.exports = (mapObj) => {
  const mapString = mapObj.map(row => row.join('')).join('').split('');
  let validationResult = [];
  
  // D char is a placeholder for door and shouldn't be present in final map object
  const countD = mapString.filter(el => el === 'D').length;
  if( countD > 0) {
    validationResult.push(
      `Map contains ${countD} D char${countD > 1 ? 's' : ''}, 'D' is a placeholder for door object and shouldn't be present in final map.`
    );
  }

  // Player char
  const countPlayer = mapString.filter(el => el === '@').length;
  if( countPlayer > 1) {
    validationResult.push(
      `Map contains ${countPlayer} @ char${countPlayer > 1 ? 's' : ''} but only one player char should be present.`
    );
  }

  if(validationResult.length > 0) {
    console.log('---(Validation)---');
  }
  validationResult.forEach(message => {console.log(message);});
};