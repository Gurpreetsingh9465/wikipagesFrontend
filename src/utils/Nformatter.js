export const nFormatter = (num, digits) => {
    let si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export const timeDifference = (milliseconds) => {
  const seconds = milliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  if(Math.floor(days) !== 0) {
    return Math.floor(days)+' days ago';
  } else if(Math.floor(hours) !== 0) {
    return Math.floor(hours)+' hours ago';
  } else if(Math.floor(minutes) !== 0) {
    return Math.floor(minutes)+' minutes ago';
  } else {
    return Math.floor(seconds)+' seconds ago';
  }
}

export const extractContent = (s, space) => {
  var span= document.createElement('span');
  span.innerHTML= s;
  if(space) {
    var children= span.querySelectorAll('*');
    for(var i = 0 ; i < children.length ; i++) {
      if(children[i].textContent)
        children[i].textContent+= ' ';
      else
        children[i].innerText+= ' ';
    }
  }
  return [span.textContent || span.innerText].toString().replace(/ +/g,' ');
};

export const validateEmail = (email) => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export const validatePassword = (password) => {
  if(password.length >= 8) {
    return true;
  }
  return false;
}

export const validate = (input) => {
  if(!input.replace(/\s/g, '').length) {
    return false;
  }
  return true;
}